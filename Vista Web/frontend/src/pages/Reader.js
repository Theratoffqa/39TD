import React, { useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';

// Apunta a la ruta local del worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `${process.env.PUBLIC_URL}/pdf.worker.mjs`;

const PDFReader = () => {
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [courseSchedules, setCourseSchedules] = useState([]);

  // Manejar la subida de los dos archivos
  const handleFileUpload = async (event, type) => {
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

        if (type === 'courses') {
          // Extraer los cursos del alumno
          const extractedCourses = extractCourses(extractedText);
          setSelectedCourses(extractedCourses);
        } else if (type === 'schedules') {
          // Extraer los horarios de todos los cursos
          const allSchedules = extractAllSchedules(extractedText);
          setCourseSchedules(allSchedules);
        }
      };
      fileReader.readAsArrayBuffer(file);
    }
  };

  // Extrae los nombres de los cursos a los que el alumno quiere matricularse
  const extractCourses = (text) => {
    const regex = /([A-ZÁÉÍÓÚÑ\s]+)\s+\d+\.\d+/g; // Extrae los nombres de los cursos
    const matches = text.match(regex);
    return matches ? Array.from(new Set(matches.map(match => match.replace(/\s+\d+\.\d+$/, '')))) : [];
  };

  // Extrae todos los horarios y cursos de la programación de asignaturas
  const extractAllSchedules = (text) => {
    const regex = /([A-ZÁÉÍÓÚÑ\s]+)\s+\d+\.\d+\s+.*?(LUNES|MARTES|MIERCOLES|JUEVES|VIERNES|SABADO|DOMINGO)\s+(\d{2}:\d{2})\s*-\s*(\d{2}:\d{2})/gi;
    let matches;
    const schedules = [];

    while ((matches = regex.exec(text)) !== null) {
      const course = matches[1].trim();
      const day = matches[2];
      const startTime = matches[3];
      const endTime = matches[4];

      const existingCourse = schedules.find(item => item.course === course);
      if (existingCourse) {
        existingCourse.schedules.push(`${day} ${startTime}-${endTime}`);
      } else {
        schedules.push({
          course,
          schedules: [`${day} ${startTime}-${endTime}`]
        });
      }
    }

    return schedules;
  };

  // Empareja los cursos del alumno con los horarios de la programación de asignaturas
  const getCourseWithSchedules = () => {
    return selectedCourses.map(course => {
      const courseSchedule = courseSchedules.find(schedule => schedule.course.includes(course.trim()));
      return {
        course,
        schedules: courseSchedule ? courseSchedule.schedules : ['Horario no encontrado']
      };
    });
  };

  const coursesWithSchedules = getCourseWithSchedules();

  return (
    <div className="reader">
      <h2>Subir PDF</h2>

      {/* Subida de PDF con los cursos del alumno */}
      <div>
        <h3>Sube el PDF con los cursos del alumno</h3>
        <input type="file" accept="application/pdf" onChange={(e) => handleFileUpload(e, 'courses')} />
      </div>

      {/* Subida de PDF con la programación de asignaturas */}
      <div>
        <h3>Sube el PDF con la programación de asignaturas</h3>
        <input type="file" accept="application/pdf" onChange={(e) => handleFileUpload(e, 'schedules')} />
      </div>

      {/* Mostrar los cursos con horarios */}
      <div>
        <h3>Cursos con horarios</h3>
        <ul>
          {coursesWithSchedules.map((subject, index) => (
            <li key={index}>
              <strong>{subject.course}</strong>
              <ul>
                {subject.schedules.map((schedule, i) => (
                  <li key={i}>{schedule}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PDFReader;
