import React from 'react';

function CardVisitas({ propiedad }) {
  return (
    <div className="bg-white shadow rounded-lg">
      <img
        className="object-cover h-72 w-full"
        src={`/uploads/${propiedad.imagen}`}
        alt={`Imagen casa ${propiedad.titulo}`}
      />
      <div className="p-5 space-y-5">
        <h3 className="text-2xl font-bold">{propiedad.titulo}</h3>
        <p className="text-sm text-gray-600">Habitaciones: 
          <span className="text-gray-800 font-bold">{propiedad.habitaciones}</span>
        </p>
        <p className="text-sm text-gray-600">WC: 
          <span className="text-gray-800 font-bold">{propiedad.wc}</span>
        </p>
        <p className="text-sm text-gray-600">Precio:  
          <span className="text-gray-800 font-bold">{propiedad.nombre}</span>
        </p>
        <a href={`/propiedad/${propiedad.id}`} className="bg-indigo-600 w-full text-center block font-bold text-white p-2 uppercase rounded">
          Ver Propiedad
        </a>
      </div>
    </div>
  );
}

export default CardVisitas;
