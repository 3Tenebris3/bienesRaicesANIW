import React, { useEffect, useState } from 'react';
import axios from 'axios';

function MiVistaReact() {
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/mi-recurso')
      .then(response => {
        setDatos(response.data);
      })
      .catch(error => console.error("Hubo un error", error));
  }, []);

  return (
    <div>
      {datos.map(dato => (
        <div key={dato.id}>{dato.nombre}</div>
      ))}
    </div>
  );
}

export default MiVistaReact;
