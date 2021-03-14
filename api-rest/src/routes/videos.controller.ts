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
  res.status(201).json(savedVideo)
}

export const getVideos: RequestHandler = async (req, res) => {
  try {
    const videos = await Video.find()
    return res.json(videos)
  } catch(error) {
    console.log(error)
  }
  
}

export const getVideo: RequestHandler = async (req, res) => {
  const { id } = req.params
  const videoFound = await Video.findById(id)

  if(!videoFound) return res.status(204).json()

  return res.json(videoFound)
}

export const updateVideos: RequestHandler = async (req, res) => {
  const { id } = req.params
  const { body } = req
  const videoUpdated = await Video.findByIdAndUpdate(id, body, { new: true })

  if(!videoUpdated) return res.status(204).json()

  res.json(videoUpdated)
}

export const deleteVideo: RequestHandler = async (req, res) => {
  const { id } = req.params
  const videoFound = await Video.findByIdAndDelete(id)

  if(!videoFound) return res.status(204).json()

  return res.json(videoFound)
}