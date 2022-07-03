const express = require('express');
const router = express.Router()
const {registerUser, loginUser, logoutUser, confirm, resend} = require('../../controllers/auth');
const {schemaRegister, schemaLogin} = require('../../models/auth');
const {validateRequest} = require('../../middlewares/validateRequest');
const { auth } = require('../../middlewares/auth');
const { upload } = require('../../middlewares/upload');
const {uploadImage} =require('../../services/image.service');
const {updateUser} =require('../../services/user.service');


router.use((req,res,next)=>{
    console.log('in users');
    next(); 
})

//router.use(auth);




router.use((req,res,next) => {
    console.log('in auth');
    next();
});

router.post('/signup', validateRequest(schemaRegister), registerUser);
router.post('/login', validateRequest(schemaLogin), loginUser);
router.post('/logout', auth, logoutUser);
router.patch('/avatars', auth, upload.single('avatar'), async (req,res, next) =>{
    console.log('req.file', req.file);

    const {_id: id} = req.user;
    const avatarURL = await uploadImage(id, req.file);
    const user = await updateUser(id, {avatarURL})

    res.json(user);
});
router.get('/verify/:verificationToken', confirm);
router.post('/verify/', resend);

module.exports = router;