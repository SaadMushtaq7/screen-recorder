import React, { FC, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { RecordRTCPromisesHandler } from "recordrtc";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import CircularProgress from "@mui/material/CircularProgress";
import { storage } from "../firebase";
import "video-react/dist/video-react.css";
import "../App.css";

const MainRecorder: FC = () => {
  const videoRef = useRef<any>(null);

  const navigate = useNavigate();
  const location = useLocation();
  const state: any = location.state;
  const {
    audioRecordType: audioRecordValue,
    //videoRecordType: videoRecordValue,
  } = state;

  const [recorder, setRecorder] = useState<any>();
  const [screenStream, setScreenStream] = useState<MediaStream | any>();
  const [videoBlob, setVideoBlob] = useState<Blob | null>();
  const [uploading, setUploading] = useState<boolean>(false);
  const [startScreenRecording, setStartScreenRecording] =
    useState<boolean>(false);

  const audioRecordType:
    | "no-audio"
    | "system&microphone"
    | "browser"
    | "microphone" = audioRecordValue;

  const uploadToFirebase = async (videoFile: any) => {
    setUploading(true);
    const videoRefFirebase = ref(storage, `videos/${videoFile.name}`);
    await uploadBytes(videoRefFirebase, videoFile)
      .then(() => {
        console.log("file uploaded successfully");
      })
      .catch(() => console.log("File failed to upload!"));

    await getDownloadURL(videoRefFirebase)
      .then((url) => {
        setUploading(false);

        navigate("/previewVideo", { state: { videoUrl: url } });
      })
      .catch(() => {
        console.log("failed to get url!");
        setUploading(false);
      });
  };

  const startRecording = async () => {
    setStartScreenRecording(true);
    const mediaDevices = navigator.mediaDevices;

    const stream: any = await mediaDevices
      .getDisplayMedia({
        video: true,
        audio: audioRecordType === "no-audio" ? false : true,
      })
      .catch(() => {
        setStartScreenRecording(false);
      });

    let video = videoRef.current;
    video.srcObject = stream;
    video.play();
    const recorder = new RecordRTCPromisesHandler(stream, {
      type: "video",
    });

    await recorder.startRecording();
    console.log(recorder);
    await setRecorder(recorder);
    setScreenStream(stream);
  };

  const stopRecording = async () => {
    console.log(recorder);
    console.log(screenStream);
    if (recorder) {
      setStartScreenRecording(false);
      await recorder.stopRecording();
      (screenStream as any).stop();
      const blob: Blob = await recorder.getBlob();
      setVideoBlob(blob);
      setScreenStream(null);
      setRecorder(null);

      const videoFile = new File([blob], `${v4()}.${"mp4"}`, {
        type: "video/mp4",
      });

      uploadToFirebase(videoFile);
    }
  };

  return (
    <div className="recorder-container">
      {uploading ? (
        <span className="loader">
          <CircularProgress />
        </span>
      ) : (
        <>
          <div className="recorder">
            <span className="only-screen">
              {videoBlob ? (
                <video
                  width={500}
                  height={500}
                  src={window.URL.createObjectURL(videoBlob)}
                  controls
                />
              ) : (
                <>
                  <div className="image-container">
                    {startScreenRecording ? (
                      <video className="img" ref={videoRef} />
                    ) : (
                      <img
                        className="img"
                        src="https://images.drivereasy.com/wp-content/uploads/2021/12/windows11.jpg"
                        alt="show-piece"
                      />
                    )}
                  </div>
                </>
              )}
            </span>
          </div>
          <div className="main-btns">
            <Stack spacing={2} direction="row">
              <Button variant="contained" onClick={startRecording}>
                <PlayCircleFilledWhiteIcon />
              </Button>
              <Button variant="contained" onClick={stopRecording}>
                <StopCircleIcon />
              </Button>
            </Stack>
          </div>
        </>
      )}
    </div>
  );
};

export default MainRecorder;
