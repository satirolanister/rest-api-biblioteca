const {Router} = require('express');

const libroControl = require('../controllers/libroContrl');



const router = Router();

router.get('/',libroControl.getAllbooks)

router.get('/:id',libroControl.getOneBook);

router.post('/',libroControl.insertBook);

router.put('/',libroControl.updateBook);

router.delete('/',libroControl.deleteBook)



module.exports = router;