const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const authorize = require('../middlewares/authorizeMiddleware');

router.use(authMiddleware.protect);

router.post('/', authorize('user:create'), userController.create);
router.get('/', authorize('user:read'), userController.getAll);
router.put('/:id', authorize('user:update'), userController.update);
router.delete('/:id', authorize('user:delete'), userController.delete);

module.exports = router;