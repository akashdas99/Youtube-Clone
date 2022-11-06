import { Box } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import { Video, ChannelCard } from "./";

const ChannelDetail = () => {
  const [channelDetail, setChannelDetail] = useState(null);
  const [videos, setVideos] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetchFromAPI(`channels?part=snippet&id=${id}`).then((data) =>
      setChannelDetail(data?.items[0])
    );
    fetchFromAPI(`search?channelId=${id}&part=snippet&order=data`).then(
      (data) => setVideos(data?.items[0])
    );
  }, [id]);

  return (
    <Box minHeight="95vh">
      <Box>
        <div style={{ background: "white", height: " 300px" }} />
        {channelDetail && (
          <ChannelCard channelDetail={channelDetail} marginTop="-110px" />
        )}
      </Box>
    </Box>
  );
};

export default ChannelDetail;
https://youtu.be/FHTbsZEJspU?t=6342