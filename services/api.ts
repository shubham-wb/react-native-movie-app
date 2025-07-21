export const TMDB_CONFIG = {
  BASE_URL: "http://www.omdbapi.com/",
  headers: {
    accept: "application/json",
  },
};

export const fetchMovies = async ({ query }: { query: string }) => {
  const baseURL = TMDB_CONFIG.BASE_URL;

  const endpoint = query
    ? `${baseURL}/search/movie?query =${encodeURIComponent(query)}&apikey=${
        process.env.EXPO_PUBLIC_MOVIE_API_KEY
      }`
    : `${baseURL}/discover/movie?sort_by=popularity.desc&apikey=${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`;
  const response = await fetch(endpoint, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });

  if (!response.ok) {
    //@ts-ignore
    throw new Error("Failed to fetch movies", response.statusText);
  }

  const data = await response.json();
  return data.results;
};
