const {Router} = require('express');

const userControl = require('../controllers/userContr');



const router = Router();

router.get('/',userControl.get);

router.put('/:id',userControl.put);

router.post('/',userControl.post);

router.delete('/',userControl.delete);

router.patch('/',userControl.patch);


module.exports = router;
