import React, { useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';

// Apunta a la ruta local del worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `${process.env.PUBLIC_URL}/pdf.worker.mjs`;




const PDFReader = () => {
    const [subjects, setSubjects] = useState([]);
  
    const handleFileUpload = async (event) => {
      const file = event.target.files[0];
      if (file) {
        const fileReader = new FileReader();
        fileReader.onload = async function () {
          const typedArray = new Uint8Array(this.result);
          const pdf = await pdfjsLib.getDocument(typedArray).promise;
          let extractedText = '';
  
          for (let i = 0; i < pdf.numPages; i++) {
            const page = await pdf.getPage(i + 1);
            const textContent = await page.getTextContent();
            textContent.items.forEach((item) => {
              extractedText += item.str + ' ';
            });
          }
  
          const subjectNames = extractSubjectNames(extractedText);
          setSubjects(subjectNames);
          console.log(subjectNames);
        };
        fileReader.readAsArrayBuffer(file);
      }
    };
  
    const extractSubjectNames = (text) => {
      // Usa una expresión regular para encontrar nombres de asignaturas
      const regex = /([A-ZÁÉÍÓÚÑ\s]+)\s+\d+\.\d+/g; // Busca líneas que tengan letras seguidas de un número decimal
      const matches = text.match(regex); // Captura las coincidencias
  
      // Si hay coincidencias, eliminar duplicados y retornar solo los nombres
      return matches ? Array.from(new Set(matches.map(match => match.replace(/\s+\d+\.\d+$/, '')))) : [];
    };
  
    return (
      <div>
        <h1>Upload PDF</h1>
        <input type="file" accept="application/pdf" onChange={handleFileUpload} />
        <ul>
          {subjects.map((subject, index) => (
            <li key={index}>{subject}</li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default PDFReader;
