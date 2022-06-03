export const getMovieListByTitle = name => {
  return `http://www.omdbapi.com/?s=${name.toLowerCase()}&page=1&apikey=8971d9f8`;
};
