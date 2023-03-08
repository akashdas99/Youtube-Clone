import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { SideBar, Videos } from "./";
import { fetchNextPage } from "../utils/fetchNextPage";

const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState("Latest");
  const [nextPageToken, setnextPageToken] = useState("");
  const [videos, setVideos] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      fetchNextPage(selectedCategory, nextPageToken).then((data) => {
        if (!videos) setVideos(data.items);
        else setVideos((videos) => [...videos, ...data.items]);
        setnextPageToken(data.nextPageToken);
        setLoading(false);
      });
    }
  }, [loading]);

  return (
    <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
      <Box
        sx={{
          height: { sx: "auto", md: "92vh" },
          borderRight: "1px solid #3d3d3d",
          px: { sx: 0, md: 2 },
        }}
      >
        <SideBar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          setLoading={setLoading}
          setVideos={setVideos}
        />
        <Typography
          className="copyright"
          variant="body2"
          sx={{ mt: 1.5, color: "#fff" }}
        >
          Copyright 2022
        </Typography>
      </Box>
      <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          mb={2}
          sx={{ color: "white" }}
        >
          {selectedCategory} <span style={{ color: "#f31503" }}>videos</span>
        </Typography>
        {videos && <Videos videos={videos} setLoading={setLoading} />}
        <Stack alignItems="center" spacing={5} padding={4}>
          {loading && <CircularProgress />}
        </Stack>
      </Box>
    </Stack>
  );
};

export default Feed;
