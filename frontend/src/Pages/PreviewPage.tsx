import React, { FC, useState } from "react";
import { saveAs } from "file-saver";
import { experimentalStyled as styled } from "@mui/material/styles";
import { useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import {
  LinkedinShareButton,
  LinkedinIcon,
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
} from "react-share";
import { BsSlack } from "react-icons/bs";
import DownloadIcon from "@mui/icons-material/Download";
import SlackShareDialog from "components/SlackShareDialog";
import "../App.css";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: "black",
}));

const PreviewPage: FC = () => {
  const location = useLocation();
  const state: any = location.state;
  const { videoUrl } = state;

  const [slackShareOpen, setSlackShareOpen] = useState<boolean>(false);

  const saveFile = () => {
    saveAs(videoUrl, "download.mp4");
  };

  return (
    <Box
      sx={{ flexGrow: 1, marginTop: "10%" }}
      className="previewpage-container"
    >
      <Grid container spacing={1}>
        <Grid item xs={3}>
          <Item sx={{ height: "200px", width: "300px", marginLeft: "20px" }}>
            <span onClick={saveFile}>
              <DownloadIcon
                color="primary"
                sx={{
                  margin: "5px",
                  height: "50px",
                  width: "50px",
                  borderRadius: "25px",
                }}
              />
            </span>
            <p>Download the recording?</p>
          </Item>
        </Grid>
        <Grid item xs={6} sx={{ textAlign: "center" }}>
          <video
            src={videoUrl}
            controls
            autoPlay
            style={{
              width: "540px",
              height: "400px",
              marginTop: "-35px",
              borderRadius: "10px",
            }}
          />
        </Grid>
        <Grid item xs={3}>
          <Item sx={{ height: "200px", width: "300px" }}>
            <h2>Have a moment?</h2>
            <p>Share with friends.</p>
            <span>
              <LinkedinShareButton url={videoUrl}>
                <LinkedinIcon size={50} round />
              </LinkedinShareButton>
              <FacebookShareButton url={videoUrl}>
                <FacebookIcon size={50} round />
              </FacebookShareButton>
              <TwitterShareButton url={videoUrl}>
                <TwitterIcon size={50} round />
              </TwitterShareButton>
              <BsSlack
                onClick={() => {
                  setSlackShareOpen(true);
                }}
                className="slack-btn"
              />
            </span>
          </Item>
        </Grid>
        <span
          style={{ width: "100vw", textAlign: "center", marginTop: "30px" }}
        >
          <Button variant="contained" color="primary">
            Record Again?
          </Button>
        </span>
      </Grid>
      {slackShareOpen && (
        <SlackShareDialog
          selectedFile={videoUrl}
          slackShareOpen={slackShareOpen}
          setSlackShareOpen={setSlackShareOpen}
        />
      )}
    </Box>
  );
};

export default PreviewPage;
