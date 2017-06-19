# Beetlejuice

Send email

## run server

Create file `./configs/auth.json`:

```json
{
  "key": "AAA",
  "secret": "XXX",
  "token": 42
}
```

And running server:

```
$ npm i
$ npm run dev
```

## send message

Example:

```json
{
  "from": {
    "name": "Name",
    "email": "no-reply@domain.ru"
  },
  "to": {
    "name": "Konstantin Kruglov",
    "email": "kruglovk@gmail.com"
  },
  "subject": "Hey!",
  "msg": "Hello, bro!"
}
```

Sending message (usage [HTTPie](https://httpie.org)):

```
$ http post http://localhost:3000/api/send 'Authorization: Token 42' < ./json/testMsg.json
```
