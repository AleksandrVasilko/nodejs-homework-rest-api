const express = require('express');
const router = express.Router();
//const {getAll, getById, create, updateById, deleteById, updateAvailabity} = require('../../controllers')

const { auth } = require('../../middlewares/auth');
const { upload } = require('../../middlewares/upload');
const {uploadImage} =require('../../services/image.service');
const {updateUser} =require('../../services/user.service');


router.use((req,res,next)=>{
    console.log('in users');
    next(); 
})

//router.use(auth);

router.patch('/avatars', auth, upload.single('avatar'), async (req,res, next) =>{
    console.log('req.file', req.file);

    const {_id: id} = req.user;
    const avatarURL = await uploadImage(id, req.file);
    const user = await updateUser(id, {avatarURL})

    res.json(user);
});

module.exports = router;