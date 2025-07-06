const { registerUser, loginUser, lopgoutUser, getUser } = require('../controllers/userCOntrollers');
const isAuth = require('../middleware/isAuth');

const userRouter = require('express').Router();


userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/logout', lopgoutUser);
userRouter.get('/', isAuth, getUser);




module.exports = userRouter;