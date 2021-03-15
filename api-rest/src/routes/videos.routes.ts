import { Router } from 'express'
const router = Router()

import * as videoCtrl from './videos.controller'

router.post('/videos', videoCtrl.createVideo)

router.get('/videos', videoCtrl.getVideos)

router.get('/videos/:id', videoCtrl.getVideo)

router.put('/videos/:id', videoCtrl.updateVideos)

router.delete('/videos/:id', videoCtrl.deleteVideo)

export default router