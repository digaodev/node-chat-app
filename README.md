# Realtime Chat App in Node

* Realtime chat app in Node using socket.io and express

## How to run

To get started:

* install all project dependencies with `npm install`

  Notable dependencies:
```js
    "dotenv": "^5.0.1",
    
    "express": "^4.16.2",
    
    "moment": "^2.20.1",
    
    "socket.io": "^2.0.4"
```

## How to use it

* Because Google Static Maps API requires a key, you need to generate an API key in the Google Console. After that, create a `.env` file in the root of the project and add the following line:
```
GOOGLE_MAPS_KEY = '<your google maps api key>'
```

* To run the tests simply execute the command below:
```
> npm test
```
![Screen Shot for test command](https://github.com/digaodev/node-chat-app/blob/docs/docs/Screen_tests.png?raw=true)

* To use the app simply run it from the command line. Open the browser on `localhost:3000` to use the app:
```
> npm start
```
![Screen Shot for login](https://github.com/digaodev/node-chat-app/blob/docs/docs/Screen_chat_login.png?raw=true)

![Screen Shot for chat 1](https://github.com/digaodev/node-chat-app/blob/docs/docs/Screen_chat_1.png?raw=true)

![Screen Shot for chat 2](https://github.com/digaodev/node-chat-app/blob/docs/docs/Screen_chat_2.png?raw=true)
