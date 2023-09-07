const API_KEY = '9d5caa52642062cdd774851bd4ef2235';
const API_READ_ACCES_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZDVjYWE1MjY0MjA2MmNkZDc3NDg1MWJkNGVmMjIzNSIsInN1YiI6IjY0Zjk1YjA3ZGMxY2I0MDBiMGJhMTNmMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xlBCJ6wHHDrftwH1e-gItFuIhqV97SXdf9oMdC2zgmo';
const BASE_URL = 'https://api.themoviedb.org/3/';
const API_URL = BASE_URL +'/movie/11?api_key='+ API_KEY

const apiKey = '9d5caa52642062cdd774851bd4ef2235';
const baseUrl = 'https://api.themoviedb.org/3/';

async function obtenerListaDePeliculas(palabraClave, numeroDePagina = 1) {
  const endpoint = 'search/movie';

  try {
    const respuesta = await fetch(`${baseUrl}${endpoint}?api_key=${apiKey}&query=${palabraClave}&page=${numeroDePagina}`);
    
    if (respuesta.ok) {
      const datos = await respuesta.json();
      return datos.results;
    } else {
      console.error('Error al obtener los datos:', respuesta.status);
      return null;
    }
  } catch (error) {
    console.error('Error al hacer la solicitud:', error);
    return null;
  }
}
async function descargarComoCSV(peliculas) {
  if (peliculas.length === 0) {
    console.error('No hay datos para exportar.');
    return;
  }

  // Obtén las propiedades de las películas de la primera película (asumiendo que todas tienen las mismas propiedades)
  const columnas = Object.keys(peliculas[0]);

  // Crea el encabezado del CSV
  const header = columnas.map(columna => columna.replace(/_/g, ' ')); // Reemplaza guiones bajos por espacios en el encabezado

  const csvData = [];
  csvData.push(header);

  // Agrega las filas de datos al arreglo csvData
  for (const pelicula of peliculas) {
    const fila = columnas.map(columna => {
      // Si la propiedad es un array, únela con "|" como separador
      if (Array.isArray(pelicula[columna])) {
        return pelicula[columna].join('|');
      }
      return pelicula[columna];
    });
    csvData.push(fila);
  }

  // Crea un Blob con los datos CSV
  const csvContent = csvData.map(row => row.join(',')).join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv' });

  // Crea una URL para el Blob
  const blobUrl = URL.createObjectURL(blob);

  // Crea un enlace de descarga y simula un clic para descargar el archivo
  const enlace = document.createElement('a');
  enlace.href = blobUrl;
  enlace.download = 'peliculas.csv'; // Nombre del archivo CSV
  enlace.click();

  // Libera el recurso de URL.createObjectURL
  URL.revokeObjectURL(blobUrl);
}



async function main() {
  const peliculas = await obtenerListaDePeliculas('acción', 1);

  if (peliculas) {
    descargarComoCSV(peliculas);
    console.log(peliculas)
  }
}

main();
// async function main() {
//   const peliculas = await obtenerListaDePeliculas('acción', 1);

//   if (peliculas) {
//     for (const pelicula of peliculas) {
//       console.log(pelicula);
//     }
//   }
// }

main();


