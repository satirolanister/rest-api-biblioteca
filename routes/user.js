const {Router} = require('express');

const userControl = require('../controllers/userContr');



const router = Router();

router.get('/',userControl.getAlluser);

router.get('/:id',userControl.getOneuser);

router.post('/',userControl.insertUser);

router.put('/', userControl.updateUser);

router.delete('/', userControl.deleteUser);




module.exports = router;
