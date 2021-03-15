import axios from 'axios'
import { Video } from './Video'

const API_URL = 'http://localhost:4000'

export const getVideos = async () => {
  return await axios.get<Video[]>(`${API_URL}/videos`)
}

export const createVideo = async (video: Video) => {
  return await axios.post(`${API_URL}/videos`, video)
}

export const getVideo = async (id: string) => {
  return await axios.get<Video>(`${API_URL}/videos/${id}`)
}

export const updateVideo = async (id: string, video: Video) => {
  return await axios.put<Video>(`${API_URL}/videos/${id}`, video)
}

export const deleteVideo = async(id: string) => {
  return await axios.delete(`${API_URL}/videos/${id}`)
}