import { RequestHandler } from 'express'
import Video from './Video'

export const createVideo: RequestHandler = async (req, res) => {
  const videoFound = await Video.findOne({ url: req.body.url })
  if (videoFound)
    return res.status(301).json({
      message: 'The url already exists'
    })
  
  const video = new Video(req.body)
  const savedVideo = await video.save()
  res.status(201).json({
    data: savedVideo,
    message: 'video saved',
  })
}

export const getVideos: RequestHandler = async (req, res) => {
  try {
    const videos = await Video.find()
    return res.json({
      data: videos,
      message: "videos retrieved"
    })
  } catch(error) {
    res.json({
      message: 'something went wrong',
      details: error,
    })
  }
  
}

export const getVideo: RequestHandler = async (req, res) => {
  const { id } = req.params
  const videoFound = await Video.findById(id)

  if(!videoFound) return res.status(204).json()

  return res.json({
    data: videoFound,
    message: "video retrieved"
  })
}

export const updateVideos: RequestHandler = async (req, res) => {
  const { id } = req.params
  const { body } = req
  const videoUpdated = await Video.findByIdAndUpdate(id, body, { new: true })

  if(!videoUpdated) return res.status(204).json()

  res.json({
    data: videoUpdated,
    message: 'video updated'
  })
}

export const deleteVideo: RequestHandler = async (req, res) => {
  const { id } = req.params
  const videoFound = await Video.findByIdAndDelete(id)

  if(!videoFound) return res.status(204).json()

  return res.json({
    data: videoFound,
    message: "video deleted"
  })
}