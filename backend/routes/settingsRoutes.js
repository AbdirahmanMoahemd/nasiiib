import express from 'express';
const router = express.Router()
import { getSettings, createSettings, getSettingsById, updateSettings } from '../controllers/settingsController.js'
import { protect, admin } from '../middlewares/authMiddleware.js'

router.route('/').get(getSettings).post(protect, admin, createSettings)
router.route('/:id').get(protect, admin, getSettingsById).
    put(protect, admin, updateSettings)
 

export default router   