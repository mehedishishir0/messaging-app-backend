const { sendMessage, getMessages } = require('../controllers/messageControllers');
const isAuth = require('../middleware/isAuth');

const messageRouter = require('express').Router();


messageRouter.post('/send/:id',isAuth,sendMessage)
messageRouter.post('/get/:id',isAuth,getMessages)


module.exports = messageRouter;