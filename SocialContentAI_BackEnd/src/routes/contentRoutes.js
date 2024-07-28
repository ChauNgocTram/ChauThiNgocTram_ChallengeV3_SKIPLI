const express = require('express');
const router = express.Router();
const contentController = require('../controllers/contentController');

router.post('/generate-post-captions', contentController.generatePostCaptions);
router.post('/get-post-ideas', contentController.getPostIdeas);
router.post('/create-captions-from-ideas', contentController.createCaptionsFromIdeas);
router.post('/save-generated-content', contentController.saveGeneratedContent);

module.exports = router;
