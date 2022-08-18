import React, { FC, useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DropDown from "components/DropDown";
import Button from "@mui/material/Button";
import "../App.css";

const videoType = [
  {
    value: "screen",
    option: "Screen Only",
  },
  {
    value: "video&screen",
    option: "Screen and Webcam",
  },
];

const audioType = [
  {
    value: "no-audio",
    option: "No Audio",
  },
  {
    value: "system&microphone",
    option: "System Audio + Microphone Audio",
  },
  {
    value: "browser",
    option: "Browser Audio",
  },
  {
    value: "microphone",
    option: "Microphone Audio",
  },
];

const HomePage: FC = () => {
  const videoRef = useRef() as any;

  const [videoRecordType, setVideoRecordType] = useState<string>("screen");
  const [audioRecordType, setAudioRecordType] = useState<string>("no-audio");
  const [showPIP, setShowPIP] = useState<boolean>(false);

  const handlePIP = async () => {
    try {
      if (!showPIP) {
        await videoRef.current.requestPictureInPicture();
        setShowPIP(true);
      } else {
        await document.exitPictureInPicture();
        setShowPIP(false);
      }
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  useEffect(() => {
    if (!videoRef) {
      return;
    } else if (videoRef && videoRecordType === "video&screen") {
      navigator.mediaDevices
        .getUserMedia({
          video: true,
          audio: audioRecordType === "system&microphone" ? true : false,
        })
        .then((stream) => {
          let video = videoRef.current;
          video.srcObject = stream;
          video.play();
        });
    }
  }, [videoRef, videoRecordType, audioRecordType]);

  return (
    <div className="homepage-container">
      <div className="image-container">
        {!showPIP && videoRecordType === "video&screen" ? (
          <video className="img" ref={videoRef} />
        ) : (
          <img
            className="img"
            src="https://images.drivereasy.com/wp-content/uploads/2021/12/windows11.jpg"
            alt="show-piece"
          />
        )}
      </div>
      <div className="dropdown-container">
        <span className="dropdown-video">
          <DropDown
            title={"Video Options"}
            defaultValue={0}
            recordTypes={videoType}
            setRecordType={setVideoRecordType}
          />
        </span>
        <span className="dropdown-audio">
          <DropDown
            title={"Audio Options"}
            defaultValue={0}
            recordTypes={audioType}
            setRecordType={setAudioRecordType}
          />
        </span>
      </div>
      <div className="btn-container">
        <Link to="/recording" state={{ videoRecordType, audioRecordType }}>
          {videoRecordType === "video&screen" ? (
            <Button variant="contained" onClick={handlePIP}>
              Start Recording
            </Button>
          ) : (
            <Button variant="contained">Start Recording</Button>
          )}
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
