import { Box } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import { Videos, ChannelCard } from "./";

const ChannelDetail = () => {
  const [channelDetail, setChannelDetail] = useState(null);
  const [videos, setVideos] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetchFromAPI(`channels?part=snippet&id=${id}`).then((data) =>
      setChannelDetail(data?.items[0])
    );
    fetchFromAPI(`search?channelId=${id}&part=snippet&order=date`).then(
      (data) => setVideos(data?.items)
    );
  }, [id]);

  return (
    <Box minHeight="95vh">
      <Box>
        <div
          style={{
            background:
              "linear-gradient(90deg, rgba(58,55,113,1) 0%, rgba(165,117,201,1) 39%, rgba(134,135,211,1) 72%, rgba(98,228,255,1) 100%)",
            height: " 300px",
          }}
        />
        {channelDetail && (
          <ChannelCard channelDetail={channelDetail} marginTop="-110px" />
        )}
      </Box>
      <Box display="flex" p="2">
        <Box sx={{ mr: { sm: "100px" } }} />
        {videos && <Videos videos={videos} />}
      </Box>
    </Box>
  );
};

export default ChannelDetail;
