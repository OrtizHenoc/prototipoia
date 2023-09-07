const API_KEY = '9d5caa52642062cdd774851bd4ef2235';
const API_READ_ACCES_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZDVjYWE1MjY0MjA2MmNkZDc3NDg1MWJkNGVmMjIzNSIsInN1YiI6IjY0Zjk1YjA3ZGMxY2I0MDBiMGJhMTNmMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xlBCJ6wHHDrftwH1e-gItFuIhqV97SXdf9oMdC2zgmo';
const BASE_URL = 'https://api.themoviedb.org/3/';
const API_URL = BASE_URL +'/movie/11?api_key='+ API_KEY


// const options = {
//     method: 'GET',
//     headers: {
//       accept: 'application/json',
//       Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZDVjYWE1MjY0MjA2MmNkZDc3NDg1MWJkNGVmMjIzNSIsInN1YiI6IjY0Zjk1YjA3ZGMxY2I0MDBiMGJhMTNmMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xlBCJ6wHHDrftwH1e-gItFuIhqV97SXdf9oMdC2zgmo'
//     }
//   };
//   var movies ;
//   fetch('https://api.themoviedb.org/3/movie/changes?page=1', options)
//     .then(response => response.json())
//     .then(response => console.log(response))
//     .catch(err => console.error(err));
// const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZDVjYWE1MjY0MjA2MmNkZDc3NDg1MWJkNGVmMjIzNSIsInN1YiI6IjY0Zjk1YjA3ZGM1YzYzZDAwZWE4MTc3MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xlBCJ6wHHDrftwH1e-gItFuIhqV97SXdf9oMdC2zgmo'
//   }
// };

// fetch('https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&page=1', options)
//   .then(response => response.json())
//   .then(data => {
//     const movieList = data.results; // Obtiene la lista de 100 películas
//     console.log(movieList);
//   })
//   .catch(err => console.error(err));
const api_key = "9d5caa52642062cdd774851bd4ef2235";
const url = `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}`;

fetch(url)
  .then(response => response.json())
  .then(data => {
    data.results.forEach(movie => {
      console.log(movie);
    });
  });
