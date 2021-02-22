const {Router} = require('express');

const loanControl = require('../controllers/loansContrl');



const router = Router();

router.post('/', loanControl.add);
router.put('/', loanControl.updateLoan);





module.exports = router;