const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/create-access-code', userController.createNewAccessCode);
router.post('/validate-access-code', userController.validateAccessCode);
router.get('/user-generated-contents', userController.getUserGeneratedContents);
router.post('/save-generated-content', userController.saveGeneratedContent);
router.post('/unsave-content', userController.unsaveContent);

module.exports = router;
