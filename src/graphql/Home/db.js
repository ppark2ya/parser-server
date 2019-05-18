import axios from "axios";
const BASE_URL = "http://104.198.86.245:8092/";
const AUTH_URL = `${BASE_URL}/auth`;
const HOME_URL = `${BASE_URL}/home`;
const GRAPH_URL = `${BASE_URL}/graph`;
const API_URL = `${BASE_URL}/api`;

// export const getMovies = async (limit, rating) => {
//   const {
//     data: {
//       data: { movies }
//     }
//   } = await axios(LIST_MOVIES_URL, {
//     params: {
//       limit,
//       minimum_rating: rating
//     }
//   });
//   return movies;
// };

// export const getMovie = async id => {
//   const {
//     data: {
//       data: { movie }
//     }
//   } = await axios(MOVIE_DETAILS_URL, {
//     params: {
//       movie_id: id
//     }
//   });
//   return movie;
// };

// export const getSuggestions = async id => {
//   const {
//     data: {
//       data: { movies }
//     }
//   } = await axios(MOVIE_SUGGESTIONS_URL, {
//     params: {
//       movie_id: id
//     }
//   });
//   return movies;
// };
