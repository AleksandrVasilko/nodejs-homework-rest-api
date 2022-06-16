const express = require('express');
const router = express.Router()
const {registerUser, loginUser} = require('../../controllers/auth');
const {schemaRegister, schemaLogin} = require('../../models/auth');
const {validateRequest} = require('../../middlewares/validateRequest');
const {auth}  = require('../../middlewares/auth');


router.use((req,res,next) => {
    console.log('in auth');
    next();
});

router.post('/signup', validateRequest(schemaRegister), registerUser);
router.post('/login', validateRequest(schemaLogin), loginUser);

module.exports = router;