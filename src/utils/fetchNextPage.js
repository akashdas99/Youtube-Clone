import { fetchFromAPI } from "../utils/fetchFromAPI";

export const fetchNextPage = async (search, nextPageToken) => {
  const data = await fetchFromAPI(
    `search?part=snippet&q=${search}&pageToken=${nextPageToken}`
  );
  console.log(data);

  return data;
};
