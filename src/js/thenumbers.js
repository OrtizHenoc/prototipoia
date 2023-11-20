// Importar las librerías necesarias 
import axios from 'axios'
import cheerio from 'cheerio'
import fs from 'fs'

// Definir la URL de la página web 
const url = "https://www.the-numbers.com/movie/budgets/all";

// Definir el nombre del archivo CSV 
const fileName = "movies.csv";

// Definir el separador de los campos del CSV 
const separator = ",";

// Definir una función para obtener el texto de un elemento HTML 
const getText = (element) => { return element.text().trim(); };

// Definir una función para obtener el número de una cadena de texto 
const getNumber = (string) => { return Number(string.replace(/[^0-9.-]+/g, '')); };

// Definir una función para obtener el enlace de una película 
const getLink = (element) => { return 'https://www.the-numbers.com' + element.attr(href);};

// Definir una función para obtener los datos de una fila de la tabla 
const getRowData = (row) => { 
    // Obtener las celdas de la fila 
    const cells = row.find('td');

// Obtener el rango de la película 
const rank = getNumber(getText(cells.eq(0)));

// Obtener la fecha de estreno de la película 
const date = getText(cells.eq(1));

// Obtener el título de la película 
const title = getText(cells.eq(2));

// Obtener el enlace de la película 
const link = getLink(cells.eq(2).find('a'));

// Obtener el presupuesto de la película 
const budget = getNumber(getText(cells.eq(3)));

// Obtener la recaudación doméstica de la película 
const domestic = getNumber(getText(cells.eq(4)));

// Obtener la recaudación mundial de la película 
const worldwide = getNumber(getText(cells.eq(5)));

// Devolver un objeto con los datos de la fila 
return { rank, date, title, link, budget, domestic, worldwide, }; };

// Definir una función para obtener los datos de la tabla 
const getTableData = async (url) => { 
    // Hacer una petición HTTP a la URL 
    const response = await axios.get(url);

    // Obtener el HTML de la respuesta 
    const html = response.data;

    // Cargar el HTML con cheerio 
    const $ = cheerio.load(html);

    // Obtener la tabla de la página 
    const table = $('table#page_filling_chart');

    // Obtener el cuerpo de la tabla 
    const tbody = table.find('tbody');

    // Obtener las filas del cuerpo de la tabla 
    const rows = tbody.find('tr');

    // Crear un arreglo para almacenar los datos de las filas 
    const data = [];

    // Recorrer las filas 
    rows.each((index, element) => { 
        // Obtener los datos de la fila 
        const rowData = getRowData($(element));
        // Agregar los datos al arreglo
        data.push(rowData);
    });
    // Devolver el arreglo con los datos 
    return data; };

// Definir una función para guardar los datos en un archivo CSV 
    const saveToCSV = (data, fileName, separator) => { 
        // Crear un arreglo para almacenar las líneas del CSV 
        const lines = [];

        // Obtener los nombres de las propiedades del primer objeto del arreglo de datos 
        const headers = Object.keys(data[0]);

        // Crear la línea de cabecera del CSV 
        const headerLine = headers.join(separator);

        // Agregar la línea de cabecera al arreglo de líneas 
        lines.push(headerLine);

        // Recorrer el arreglo de datos 
        data.forEach((item) => { 
            // Crear un arreglo para almacenar los valores del objeto 
            const values = [];
            
            // Recorrer los nombres de las propiedades
            headers.forEach((header) => {
                // Obtener el valor de la propiedad
                const value = item[header];
            
                // Agregar el valor al arreglo de valores
                values.push(value);
            });
            
            // Crear la línea del CSV
            const line = values.join(separator);
            
            // Agregar la línea al arreglo de líneas
            lines.push(line);
        });

        // Crear el contenido del CSV 
        const content = lines.join('\n');

        // Escribir el contenido en el archivo CSV 
        fs.writeFileSync(fileName, content); 
    };

    // Definir una función principal para ejecutar el programa 
    const main = async () => { try { 
        // Obtener los datos de la tabla 
        const data = await getTableData(url);
        // Guardar los datos en un archivo CSV
        saveToCSV(data, fileName, separator);

        // Mostrar un mensaje de éxito
        console.log('Datos guardados en el archivo ' + fileName);
    } catch (error) { 
        // Mostrar un mensaje de error 
        console.error('Ocurrió un error: ' + error.message); } };

        // Ejecutar la función principal 
    main();
