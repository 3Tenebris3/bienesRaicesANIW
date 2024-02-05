import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CardVisitas from './CardVisitas';

function PropiedadesMasVisitadas() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get('http://localhost:3001/visitas');
        setData(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="py-5">
      <h2 className="text-center text-4xl font-extrabold pt-10">Propiedades más visitadas</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-14">
        {data.map(propiedad => (
          <CardVisitas key={propiedad.id} propiedad={propiedad} />
        ))}
      </div>
    </section>
  );
}

export default PropiedadesMasVisitadas;
