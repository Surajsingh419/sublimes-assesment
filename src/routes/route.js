const express = require('express');

const router = express.Router();
const userController = require('../controllers/userController');



router.post('/register', userController.registerUser);


router.get('/users', userController.getUsers)
router.get('/users/:userId', userController.getusersById)
router.get('/usersByCity',userController.getUserByCity)



module.exports = router;