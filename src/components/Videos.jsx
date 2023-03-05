import { Box, Stack } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { VideoCard, ChannelCard } from "./";

const Videos = ({ videos, setLoading, direction }) => {
  const lastElement = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setLoading(true);
        observer.unobserve(lastElement.current);
      }
    });
    if (lastElement) observer.observe(lastElement.current);
  }, [videos]);

  return (
    <Stack
      direction={direction || "row"}
      flexWrap="wrap"
      justifyContent="start"
      gap={2}
    >
      {videos.map((item, idx) => {
        if (idx === videos.length - 1) {
          return (
            <Box key={idx} ref={lastElement}>
              {item.id.videoId && <VideoCard video={item} />}
              {item.id.channelId && <ChannelCard channelDetail={item} />}
            </Box>
          );
        } else {
          return (
            <Box key={idx}>
              {item.id.videoId && <VideoCard video={item} />}
              {item.id.channelId && <ChannelCard channelDetail={item} />}
            </Box>
          );
        }
      })}
    </Stack>
  );
};

export default Videos;
