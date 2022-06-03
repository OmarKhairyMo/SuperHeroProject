import {API_KEY, BASE_URL} from './constants';

export const getMovieListByTitle = name => {
  return `${BASE_URL}/?s=${name.toLowerCase()}&page=1&apikey=${API_KEY}`;
};
export const getMovieListBySearch = searchTerm => {
  return `${BASE_URL}/?t=${searchTerm.toLowerCase()}&apikey=${API_KEY}`;
};
