import axios from "axios";

export const fetchSuggestedVideos = async (params) => {
  const options = {
    method: "GET",
    url: "https://youtube-v3-alternative.p.rapidapi.com/trending",
    params: {
      geo: "US",
      lang: "en",
      ...params,
    },
    headers: {
      "x-rapidapi-key": `${process.env.RAPID_API_KEY}`,
      "x-rapidapi-host": "youtube-v3-alternative.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchSearchedVideos = async (query) => {
  const options = {
    method: "GET",
    url: "https://youtube-v3-alternative.p.rapidapi.com/search",
    params: {
      query: query,
      geo: "US",
      lang: "en",
      type: "video",
    },
    headers: {
      "x-rapidapi-key": `${process.env.RAPID_API_KEY}`,
      "x-rapidapi-host": "youtube-v3-alternative.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchComments = async (query) => {

  const options = {
    method: 'GET',
    url: 'https://youtube-v3-alternative.p.rapidapi.com/comments',
    params: {
      id: query,
      sort_by: 'top'
    },
    headers: {
      'x-rapidapi-key': `${process.env.RAPID_API_KEY}`,
      'x-rapidapi-host': 'youtube-v3-alternative.p.rapidapi.com'
    }
  };
  
  try {
    const response = await axios.request(options);
    // console.log(response.data)
    return response.data
  } catch (error) {
    console.error(error);
  }
};
