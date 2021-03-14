import React, { useEffect, useState } from 'react'
import { Video } from './Video'
import * as videoServie from './VideoService'
import VideoItem from './VideoItem'

const VideoList = () => {

  const [videos, setVideos] = useState<Video[]>([])

  const loadVideos = async () => {
    const res = await videoServie.getVideos()
    setVideos(res.data.data)
  }

  useEffect(() => {
    loadVideos()
  }, [])

  return (
    <div>
      {videos.map((video) => {
        return <VideoItem video={ video }/>
      })}
    </div>
  )
}

export default VideoList