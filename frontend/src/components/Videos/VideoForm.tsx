import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Video } from "./Video";
import * as VideoService from './VideoService';
import { toast } from 'react-toastify'
import { useHistory, useParams } from 'react-router-dom'

type InputChange = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>

interface Params {
  id: string
}

const VideoForm = () => {
  const history = useHistory()
  const params = useParams<Params>()
  const initialState = {
    title: "",
    description: "",
    url: "",
  }

  const [video, setVideo] = useState<Video>(initialState);

  const handleInputChange = (e: InputChange) => {
    setVideo({ ...video, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(!params.id) {
      await VideoService.createVideo(video);
      toast.success('New Video added')
    } else {
      await VideoService.updateVideo(params.id, video)
      toast.success('Video updated')
    }

    history.push('/')
  }

  const getVideo = async (id: string) => {
    const res = await VideoService.getVideo(id)
    const { title, url, description } = res.data
    setVideo({ title, url, description })
  }

  useEffect(() => {
    if(params.id) getVideo(params.id)
  }, [])

  return (
    <div className="row">
      <div className="col-md-4 offset-md-4">
        <div className="card">
          <div className="card-body">
            <h3>New Video</h3>

            <form onSubmit={ handleSubmit }>
              <div className="form-group">
                <input
                  type="text"
                  name="title"
                  placeholder="write a title for this video"
                  className="form-control"
                  onChange={ handleInputChange }
                  value={ video.title }
                  autoFocus
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="url"
                  placeholder="https://somesite.com"
                  className="form-control"
                  onChange={ handleInputChange }
                  value={ video.url }
                />
              </div>

              <div className="form-group">
                <textarea
                  name="description"
                  rows={3}
                  className="form-control"
                  placeholder="Write description"
                  onChange={ handleInputChange }
                  value={ video.description }
                ></textarea>
              </div>

              {
                params.id
                  ? <button className="btn btn-info">Update Video</button>
                  : <button className="btn btn-primary">Create Video</button>
              }
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoForm;
