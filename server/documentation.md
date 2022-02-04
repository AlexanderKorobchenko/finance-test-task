Домен: https://sleepy-forest-52108.herokuapp.com/

Маршруты:

ТИКЕРЫ

GET "/" - публичный, передает в web-socket всю коллекцию тикеров:

- Запрос: не требует параметров, тела, токена
- Ответ: status: 200, message: "Get all: success"

GET "/favorite" - приватный, передает в web-socket коллекцию тикеров текущего пользователя:

- Запрос: не требует параметров, тела. Требует токен:
- Ответ: status: 200, message: "Get favorite: success"

PATCH "/api/tickers/:tickerId" - приватный, добавляет/удаляет тикер в коллекцию "favorite" текущего пользователя:

- Запрос: не требует тела. В параметр запроса нужно передать Id тикера, требует токен
- Ответ: status 200, status: true(добавлен)/false(удален)
  status 404, message: "Not found"

ПОЛЬЗОВАТЕЛИ

POST "/api/users/register" - публичный, не требует параметров и токена, ожидает тело

Запрос: тело { name: "string", email: "string", password: "string" (min 6 symbol)}
Ответ: status 201, user: {name, email, avatarURL}
status 400, message: error
status 409, message: "Email in use"

POST "/api/users/login" - публичный, не требует параметров и токена, ожидает тело

Запрос: тело {email: "string", password: "string" (min 6 symbol)}
Ответ: status 201, user: {name, email, avatarURL}, token
status 400, message: error
status 401, message: "Email or password is wrong"
status 401, message: "User is not verify"

GET "api/users/logout" - приватный, ожидает только токен

Запрос: токен
Ответ: status 204
status 401, message: 'Not authorized'

GET "api/users/current" - приватный, ожидает только токен

Запрос: токен
Ответ: status 200, user: {name, email, avatarURL}
status 401, message: 'Not authorized'

GET "api/users/verify/:verificationToken" - публичный, верификация email

Запрос: публичный, ожидает в параметрах запроса токен для верификации email
Ответ: status 200, message: "Verification successful"
status 404, message: 'User not found'

GET "api/users/verify" - публичный, повторно отправляет письмо на почту для верификации email

Запрос: ожидает тело { email: "string }
Ответ: status 200, message: "Verification email sent"
status 400, error
status 400, message: "missing required field email"
status 401, message: "Email is wrong"
status 400, message: "Verification has already been passed"
