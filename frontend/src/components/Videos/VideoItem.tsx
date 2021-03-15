import React from "react";
import { Video } from "./Video";
import ReactPlayer from 'react-player/youtube'
import { useHistory } from 'react-router-dom'
import * as videoService from './VideoService'
import FontAwesome from 'react-fontawesome'

import './VideoItem.css'
// import swal from "sweetalert";

interface Props {
  video: Video;
  loadVideos: () => void;
}

const VideoItem = ({ video, loadVideos }: Props) => {

  const history = useHistory();

  const handleDelete = async (id: string) => {
    await videoService.deleteVideo(id)
    loadVideos();
  }

  // const handleConfirmation = () => {
  //   swal({
  //     title: "Are you sure to delete this video?",
  //     text: "Once deleted, There's no going back",
  //     icon: "warning",
  //     buttons: [true, true],
  //     dangerMode: true,
  //   })
  //     .then((willDelete) => {
  //       if (willDelete) {
  //         handleDelete()
  //         swal("The video was deleted successfully", {
  //           icon: "success",
  //         });
  //       }
  //     });
  // };

  return (
    <div className="col-lg-4 col-md-6">
      <div className="card card-body h-100 video-card">
        <div className="d-flex flex-column align-content-around">
          <div className="d-flex justify-content-between">
            <h3 className="title" onClick={() => history.push(`/update/${video._id}`)}>{video.title}</h3>
            <div>
              <FontAwesome
                className="super-crazy-colors"
                name="times-circle"
                size="lg"
                style={{ color: '#333' }}
                // onClick={() => handleConfirmation(video._id)}
                onClick={() => video._id && handleDelete(video._id)}
              />
            </div>
          </div>
          <p>{video.description}</p>
          <div className="embed-responsive embed-responsive-21y9">
            <ReactPlayer url={ video.url } controls={ true }/>
          </div>
        </div>  
      </div>
    </div>
  );
};

export default VideoItem;
