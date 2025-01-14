const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const uuid = require("uuid");

const { SECRET_KEY, DOMAIN } = process.env;

const {
  joiRegisterSchema,
  joiLoginSchema,
  joiEmailSchema,
} = require("../../model/user");
const { User } = require("../../model");
const { authentication } = require("../../middlewares");
const { sendEmail } = require("../../helpers");

const router = express.Router();

router.post("/register", async (req, res, next) => {
  try {
    const { error } = joiRegisterSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error.message,
      });
    }

    const { name, email, password } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({
        message: "Email in use",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const defaultAvatar = gravatar.url(email);

    const verificationToken = uuid.v4();
    const verificationLink = `${DOMAIN}api/users/verify/${verificationToken}`;
    const msg = {
      to: email,
      subject: "Verification letter",
      text: "To confirm your email, follow the link:",
      html: `<span>To confirm your email, follow the link: <a href="${verificationLink}" target="_blank">press here</a></span>`,
    };
    await sendEmail(msg);

    const newUser = await User.create({
      name,
      email,
      password: hashPassword,
      avatarURL: defaultAvatar,
      verificationToken,
    });
    res.status(201).json({
      user: {
        name: newUser.name,
        email: newUser.email,
        avatarURL: newUser.avatarURL,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { error } = joiLoginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error.message,
      });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "Email or password is wrong",
      });
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res.status(401).json({
        message: "Email or password is wrong",
      });
    }

    if (!user.verify) {
      return res.status(401).json({
        message: "User is not verify",
      });
    }

    const payload = { id: user._id };
    const token = jwt.sign(payload, SECRET_KEY);
    await User.findByIdAndUpdate(user._id, { token });
    res.json({
      token,
      user: {
        name: user.name,
        email: user.email,
        avatar: user.avatarURL,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get("/logout", authentication, async (req, res, next) => {
  try {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: null });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

router.get("/current", authentication, async (req, res) => {
  const { name, email, avatarURL } = req.user;
  console.log(req.user);
  res.json({
    user: {
      name,
      email,
      avatar: avatarURL,
    },
  });
});

router.get("/verify/:verificationToken", async (req, res, next) => {
  try {
    const { verificationToken } = req.params;

    const user = await User.findOne({ verificationToken });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    await User.findByIdAndUpdate(user._id, {
      verify: true,
      verificationToken: null,
    });

    res.json({ message: "Verification successful" });
  } catch (error) {
    next(error);
  }
});

router.post("/verify", async (req, res, next) => {
  try {
    const { error } = joiEmailSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error.message,
      });
    }

    const { email } = req.body;
    if (!email) {
      return res.status(400).json({
        message: "missing required field email",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "Email is wrong",
      });
    }

    if (user.verify) {
      return res.status(400).json({
        message: "Verification has already been passed",
      });
    }

    const verificationToken = user.verificationToken;
    const verificationLink = `${DOMAIN}api/users/verify/${verificationToken}`;
    const msg = {
      to: email,
      subject: "Verification letter",
      text: "To confirm your email, follow the link:",
      html: `<span>To confirm your email, follow the link: <a href="${verificationLink}" target="_blank">press here</a></span>`,
    };
    await sendEmail(msg);

    res.json({ message: "Verification email sent" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
