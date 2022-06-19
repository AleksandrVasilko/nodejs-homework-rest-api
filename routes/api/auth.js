const express = require('express');
const router = express.Router()
const {registerUser, loginUser, logoutUser} = require('../../controllers/auth');
const {schemaRegister, schemaLogin} = require('../../models/auth');
const {validateRequest} = require('../../middlewares/validateRequest');
const {auth}  = require('../../middlewares/auth');


router.use((req,res,next) => {
    console.log('in auth');
    next();
});

router.post('/signup', validateRequest(schemaRegister), registerUser);
router.post('/login', validateRequest(schemaLogin), loginUser);
router.post('/logout', auth, logoutUser);

module.exports = router;