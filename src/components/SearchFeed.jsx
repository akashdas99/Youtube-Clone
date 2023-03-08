import { Box, Typography, CircularProgress, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Videos } from "./";
import { fetchNextPage } from "../utils/fetchNextPage";

const SearchFeed = () => {
  const [videos, setVideos] = useState(null);
  const [loading, setLoading] = useState(true);
  const [nextPageToken, setnextPageToken] = useState("");
  const { searchTerm } = useParams();

  useEffect(() => {
    if (loading) {
      fetchNextPage(searchTerm, nextPageToken).then((data) => {
        if (!videos) setVideos(data.items);
        else setVideos((videos) => [...videos, ...data.items]);
        setnextPageToken(data.nextPageToken);
        setLoading(false);
      });
    }
  }, [loading]);

  useEffect(() => {
    setVideos(null);
    setnextPageToken("");
    setLoading(true);
  }, [searchTerm]);

  return (
    <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
      <Typography variant="h4" fontWeight="bold" mb={2} sx={{ color: "white" }}>
        Search Results for:{" "}
        {searchTerm && <span style={{ color: "#f31503" }}>{searchTerm}</span>}{" "}
        videos
      </Typography>
      {videos && <Videos videos={videos} setLoading={setLoading} />}
      <Stack alignItems="center" spacing={5} padding={4}>
        {loading && <CircularProgress />}
      </Stack>
    </Box>
  );
};

export default SearchFeed;
