'use client'
import React, { useState } from "react";
import Table from "@/components/table";
import Loading from "@/components/loading";
import Checkbox from "@/components/checkbox";

const fetchData = () => {


  //this function promises, remove after application of enpoints
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = [
        {
          Cuce: '24-0903-20-1435657-1-1',
          Entidad: 'Hospital Villa Tunasfdasdfasdfasdfsadfasdfasfdasdfasari',
          'Tipo Contratación': 'Bienes',
          Modalidad: 'ANPE',
          'Objeto de Contratación': 'Adquisicion De Medicamentos Para El Hospital Villa Tunari-Sus (Segunda Compra 2024)',
          Subasta: 'Si',
          'Fecha Publicación': '02/05/2024',
          'Fecha Presentación': '08/05/2024',
          Estado: 'Vigente',
          Archivos: 'Convocatoria\nDocumento Base de Contratacion\n',
          Formularios: 'FORM 100\n',
          Reportes: 'Ver Ficha'
        }, {
          Cuce: '24-0903-20-1435657-1-1',
          Entidad: 'Hospital Villa Tunasfdasdfasdfasdfsadfasdfasfdasdfasari',
          'Tipo Contratación': 'Bienes',
          Modalidad: 'ANPE',
          'Objeto de Contratación': 'Adquisicion De Medicamentos Para El Hospital Villa Tunari-Sus (Segunda Compra 2024)',
          Subasta: 'Si',
          'Fecha Publicación': '02/05/2024',
          'Fecha Presentación': '08/05/2024',
          Estado: 'Vigente',
          Archivos: 'Convocatoria\nDocumento Base de Contratacion\n',
          Formularios: 'FORM 100\n',
          Reportes: 'Ver Ficha'
        }, {
          Cuce: '24-0903-20-1435657-1-1',
          Entidad: 'Hospital Villa Tunasfdasdfasdfasdfsadfasdfasfdasdfasari',
          'Tipo Contratación': 'Bienes',
          Modalidad: 'ANPE',
          'Objeto de Contratación': 'Adquisicion De Medicamentos Para El Hospital Villa Tunari-Sus (Segunda Compra 2024)',
          Subasta: 'Si',
          'Fecha Publicación': '02/05/2024',
          'Fecha Presentación': '08/05/2024',
          Estado: 'Vigente',
          Archivos: 'Convocatoria\nDocumento Base de Contratacion\n',
          Formularios: 'FORM 100\n',
          Reportes: 'Ver Ficha'
        }, {
          Cuce: '24-0903-20-1435657-1-1',
          Entidad: 'Hospital Villa Tunasfdasdfasdfasdfsadfasdfasfdasdfasari',
          'Tipo Contratación': 'Bienes',
          Modalidad: 'ANPE',
          'Objeto de Contratación': 'Adquisicion De Medicamentos Para El Hospital Villa Tunari-Sus (Segunda Compra 2024)',
          Subasta: 'Si',
          'Fecha Publicación': '02/05/2024',
          'Fecha Presentación': '08/05/2024',
          Estado: 'Vigente',
          Archivos: 'Convocatoria\nDocumento Base de Contratacion\n',
          Formularios: 'FORM 100\n',
          Reportes: 'Ver Ficha'
        }, {
          Cuce: '24-0903-20-1435657-1-1',
          Entidad: 'Hospital Villa Tunasfdasdfasdfasdfsadfasdfasfdasdfasari',
          'Tipo Contratación': 'Bienes',
          Modalidad: 'ANPE',
          'Objeto de Contratación': 'Adquisicion De Medicamentos Para El Hospital Villa Tunari-Sus (Segunda Compra 2024)',
          Subasta: 'Si',
          'Fecha Publicación': '02/05/2024',
          'Fecha Presentación': '08/05/2024',
          Estado: 'Vigente',
          Archivos: 'Convocatoria\nDocumento Base de Contratacion\n',
          Formularios: 'FORM 100\n',
          Reportes: 'Ver Ficha'
        }, {
          Cuce: '24-0903-20-1435657-1-1',
          Entidad: 'Hospital Villa Tunasfdasdfasdfasdfsadfasdfasfdasdfasari',
          'Tipo Contratación': 'Bienes',
          Modalidad: 'ANPE',
          'Objeto de Contratación': 'Adquisicion De Medicamentos Para El Hospital Villa Tunari-Sus (Segunda Compra 2024)',
          Subasta: 'Si',
          'Fecha Publicación': '02/05/2024',
          'Fecha Presentación': '08/05/2024',
          Estado: 'Vigente',
          Archivos: 'Convocatoria\nDocumento Base de Contratacion\n',
          Formularios: 'FORM 100\n',
          Reportes: 'Ver Ficha'
        }, {
          Cuce: '24-0903-20-1435657-1-1',
          Entidad: 'Hospital Villa Tunasfdasdfasdfasdfsadfasdfasfdasdfasari',
          'Tipo Contratación': 'Bienes',
          Modalidad: 'ANPE',
          'Objeto de Contratación': 'Adquisicion De Medicamentos Para El Hospital Villa Tunari-Sus (Segunda Compra 2024)',
          Subasta: 'Si',
          'Fecha Publicación': '02/05/2024',
          'Fecha Presentación': '08/05/2024',
          Estado: 'Vigente',
          Archivos: 'Convocatoria\nDocumento Base de Contratacion\n',
          Formularios: 'FORM 100\n',
          Reportes: 'Ver Ficha'
        }, {
          Cuce: '24-0903-20-1435657-1-1',
          Entidad: 'Hospital Villa Tunasfdasdfasdfasdfsadfasdfasfdasdfasari',
          'Tipo Contratación': 'Bienes',
          Modalidad: 'ANPE',
          'Objeto de Contratación': 'Adquisicion De Medicamentos Para El Hospital Villa Tunari-Sus (Segunda Compra 2024)',
          Subasta: 'Si',
          'Fecha Publicación': '02/05/2024',
          'Fecha Presentación': '08/05/2024',
          Estado: 'Vigente',
          Archivos: 'Convocatoria\nDocumento Base de Contratacion\n',
          Formularios: 'FORM 100\n',
          Reportes: 'Ver Ficha'
        }, {
          Cuce: '24-0903-20-1435657-1-1',
          Entidad: 'Hospital Villa Tunasfdasdfasdfasdfsadfasdfasfdasdfasari',
          'Tipo Contratación': 'Bienes',
          Modalidad: 'ANPE',
          'Objeto de Contratación': 'Adquisicion De Medicamentos Para El Hospital Villa Tunari-Sus (Segunda Compra 2024)',
          Subasta: 'Si',
          'Fecha Publicación': '02/05/2024',
          'Fecha Presentación': '08/05/2024',
          Estado: 'Vigente',
          Archivos: 'Convocatoria\nDocumento Base de Contratacion\n',
          Formularios: 'FORM 100\n',
          Reportes: 'Ver Ficha'
        }, {
          Cuce: '24-0903-20-1435657-1-1',
          Entidad: 'Hospital Villa Tunasfdasdfasdfasdfsadfasdfasfdasdfasari',
          'Tipo Contratación': 'Bienes',
          Modalidad: 'ANPE',
          'Objeto de Contratación': 'Adquisicion De Medicamentos Para El Hospital Villa Tunari-Sus (Segunda Compra 2024)',
          Subasta: 'Si',
          'Fecha Publicación': '02/05/2024',
          'Fecha Presentación': '08/05/2024',
          Estado: 'Vigente',
          Archivos: 'Convocatoria\nDocumento Base de Contratacion\n',
          Formularios: 'FORM 100\n',
          Reportes: 'Ver Ficha'
        }, {
          Cuce: '24-0903-20-1435657-1-1',
          Entidad: 'Hospital Villa Tunasfdasdfasdfasdfsadfasdfasfdasdfasari',
          'Tipo Contratación': 'Bienes',
          Modalidad: 'ANPE',
          'Objeto de Contratación': 'Adquisicion De Medicamentos Para El Hospital Villa Tunari-Sus (Segunda Compra 2024)',
          Subasta: 'Si',
          'Fecha Publicación': '02/05/2024',
          'Fecha Presentación': '08/05/2024',
          Estado: 'Vigente',
          Archivos: 'Convocatoria\nDocumento Base de Contratacion\n',
          Formularios: 'FORM 100\n',
          Reportes: 'Ver Ficha'
        }, {
          Cuce: '24-0903-20-1435657-1-1',
          Entidad: 'Hospital Villa Tunasfdasdfasdfasdfsadfasdfasfdasdfasari',
          'Tipo Contratación': 'Bienes',
          Modalidad: 'ANPE',
          'Objeto de Contratación': 'Adquisicion De Medicamentos Para El Hospital Villa Tunari-Sus (Segunda Compra 2024)',
          Subasta: 'Si',
          'Fecha Publicación': '02/05/2024',
          'Fecha Presentación': '08/05/2024',
          Estado: 'Vigente',
          Archivos: 'Convocatoria\nDocumento Base de Contratacion\n',
          Formularios: 'FORM 100\n',
          Reportes: 'Ver Ficha'
        }, {
          Cuce: '24-0903-20-1435657-1-1',
          Entidad: 'Hospital Villa Tunasfdasdfasdfasdfsadfasdfasfdasdfasari',
          'Tipo Contratación': 'Bienes',
          Modalidad: 'ANPE',
          'Objeto de Contratación': 'Adquisicion De Medicamentos Para El Hospital Villa Tunari-Sus (Segunda Compra 2024)',
          Subasta: 'Si',
          'Fecha Publicación': '02/05/2024',
          'Fecha Presentación': '08/05/2024',
          Estado: 'Vigente',
          Archivos: 'Convocatoria\nDocumento Base de Contratacion\n',
          Formularios: 'FORM 100\n',
          Reportes: 'Ver Ficha'
        }, {
          Cuce: '24-0903-20-1435657-1-1',
          Entidad: 'Hospital Villa Tunasfdasdfasdfasdfsadfasdfasfdasdfasari',
          'Tipo Contratación': 'Bienes',
          Modalidad: 'ANPE',
          'Objeto de Contratación': 'Adquisicion De Medicamentos Para El Hospital Villa Tunari-Sus (Segunda Compra 2024)',
          Subasta: 'Si',
          'Fecha Publicación': '02/05/2024',
          'Fecha Presentación': '08/05/2024',
          Estado: 'Vigente',
          Archivos: 'Convocatoria\nDocumento Base de Contratacion\n',
          Formularios: 'FORM 100\n',
          Reportes: 'Ver Ficha'
        }, {
          Cuce: '24-0903-20-1435657-1-1',
          Entidad: 'Hospital Villa Tunasfdasdfasdfasdfsadfasdfasfdasdfasari',
          'Tipo Contratación': 'Bienes',
          Modalidad: 'ANPE',
          'Objeto de Contratación': 'Adquisicion De Medicamentos Para El Hospital Villa Tunari-Sus (Segunda Compra 2024)',
          Subasta: 'Si',
          'Fecha Publicación': '02/05/2024',
          'Fecha Presentación': '08/05/2024',
          Estado: 'Vigente',
          Archivos: 'Convocatoria\nDocumento Base de Contratacion\n',
          Formularios: 'FORM 100\n',
          Reportes: 'Ver Ficha'
        }, {
          Cuce: '24-0903-20-1435657-1-1',
          Entidad: 'Hospital Villa Tunasfdasdfasdfasdfsadfasdfasfdasdfasari',
          'Tipo Contratación': 'Bienes',
          Modalidad: 'ANPE',
          'Objeto de Contratación': 'Adquisicion De Medicamentos Para El Hospital Villa Tunari-Sus (Segunda Compra 2024)',
          Subasta: 'Si',
          'Fecha Publicación': '02/05/2024',
          'Fecha Presentación': '08/05/2024',
          Estado: 'Vigente',
          Archivos: 'Convocatoria\nDocumento Base de Contratacion\n',
          Formularios: 'FORM 100\n',
          Reportes: 'Ver Ficha'
        },
        {
          Cuce: '24-0903-20-1435657-1-1',
          Entidad: 'Hospital Villa Tunasfdasdfasdfasdfsadfasdfasfdasdfasari',
          'Tipo Contratación': 'Bienes',
          Modalidad: 'ANPE',
          'Objeto de Contratación': 'Adquisicion De Medicamentos Para El Hospital Villa Tunari-Sus (Segunda Compra 2024)',
          Subasta: 'Si',
          'Fecha Publicación': '02/05/2024',
          'Fecha Presentación': '08/05/2024',
          Estado: 'Vigente',
          Archivos: 'Convocatoria\nDocumento Base de Contratacion\n',
          Formularios: 'FORM 100\n',
          Reportes: 'Ver Ficha'
        },
        {
          Cuce: '24-0903-20-1435657-1-1',
          Entidad: 'Hospital Villa Tunasfdasdfasdfasdfsadfasdfasfdasdfasari',
          'Tipo Contratación': 'Bienes',
          Modalidad: 'ANPE',
          'Objeto de Contratación': 'Adquisicion De Medicamentos Para El Hospital Villa Tunari-Sus (Segunda Compra 2024)',
          Subasta: 'Si',
          'Fecha Publicación': '02/05/2024',
          'Fecha Presentación': '08/05/2024',
          Estado: 'Vigente',
          Archivos: 'Convocatoria\nDocumento Base de Contratacion\n',
          Formularios: 'FORM 100\n',
          Reportes: 'Ver Ficha'
        },
        {
          Cuce: '24-0903-20-1435657-1-1',
          Entidad: 'Hospital Villa Tunasfdasdfasdfasdfsadfasdfasfdasdfasari',
          'Tipo Contratación': 'Bienes',
          Modalidad: 'ANPE',
          'Objeto de Contratación': 'Adquisicion De Medicamentos Para El Hospital Villa Tunari-Sus (Segunda Compra 2024)',
          Subasta: 'Si',
          'Fecha Publicación': '02/05/2024',
          'Fecha Presentación': '08/05/2024',
          Estado: 'Vigente',
          Archivos: 'Convocatoria\nDocumento Base de Contratacion\n',
          Formularios: 'FORM 100\n',
          Reportes: 'Ver Ficha'
        },
        {
          Cuce: '24-0903-20-1435657-1-1',
          Entidad: 'Hospital Villa Tunasfdasdfasdfasdfsadfasdfasfdasdfasari',
          'Tipo Contratación': 'Bienes',
          Modalidad: 'ANPE',
          'Objeto de Contratación': 'Adquisicion De Medicamentos Para El Hospital Villa Tunari-Sus (Segunda Compra 2024)',
          Subasta: 'Si',
          'Fecha Publicación': '02/05/2024',
          'Fecha Presentación': '08/05/2024',
          Estado: 'Vigente',
          Archivos: 'Convocatoria\nDocumento Base de Contratacion\n',
          Formularios: 'FORM 100\n',
          Reportes: 'Ver Ficha'
        },
        {
          Cuce: '24-0903-20-1435657-1-1',
          Entidad: 'Hospital Villa Tunasfdasdfasdfasdfsadfasdfasfdasdfasari',
          'Tipo Contratación': 'Bienes',
          Modalidad: 'ANPE',
          'Objeto de Contratación': 'Adquisicion De Medicamentos Para El Hospital Villa Tunari-Sus (Segunda Compra 2024)',
          Subasta: 'Si',
          'Fecha Publicación': '02/05/2024',
          'Fecha Presentación': '08/05/2024',
          Estado: 'Vigente',
          Archivos: 'Convocatoria\nDocumento Base de Contratacion\n',
          Formularios: 'FORM 100\n',
          Reportes: 'Ver Ficha'
        },
        {
          Cuce: '24-0903-20-1435657-1-1',
          Entidad: 'Hospital Villa Tunasfdasdfasdfasdfsadfasdfasfdasdfasari',
          'Tipo Contratación': 'Bienes',
          Modalidad: 'ANPE',
          'Objeto de Contratación': 'Adquisicion De Medicamentos Para El Hospital Villa Tunari-Sus (Segunda Compra 2024)',
          Subasta: 'Si',
          'Fecha Publicación': '02/05/2024',
          'Fecha Presentación': '08/05/2024',
          Estado: 'Vigente',
          Archivos: 'Convocatoria\nDocumento Base de Contratacion\n',
          Formularios: 'FORM 100\n',
          Reportes: 'Ver Ficha'
        },
        {
          Cuce: '24-0903-20-1435657-1-1',
          Entidad: 'fsadfasdfasfdasdfasari',
          'Tipo Contratación': 'Bienes',
          Modalidad: 'ANPE',
          'Objeto de Contratación': 'Adquisicion De Medicamentos Para El Hospital Villa Tunari-Sus (Segunda Compra 2024)',
          Subasta: 'Si',
          'Fecha Publicación': '02/05/2024',
          'Fecha Presentación': '08/05/2024',
          Estado: 'Vigente',
          Archivos: 'Convocatoria\nDocumento Base de Contratacion\n',
          Formularios: 'FORM 100\n',
          Reportes: 'Ver Ficha'
        },
        {
          Cuce: '24-0903-20-1435657-1-1',
          Entidad: 'Hospital Villadfasdasdfasari',
          'Tipo Contratación': 'Bienes',
          Modalidad: 'ANPE',
          'Objeto de Contratación': 'Adquisicion De Medicamentos Para El Hospital Villa Tunari-Sus (Segunda Compra 2024)',
          Subasta: 'Si',
          'Fecha Publicación': '02/05/2024',
          'Fecha Presentación': '08/05/2024',
          Estado: 'Vigente',
          Archivos: 'Convocatoria\nDocumento Base de Contratacion\n',
          Formularios: 'FORM 100\n',
          Reportes: 'Ver Ficha'
        },
        {
          Cuce: '24-0903-20-1435657-1-1',
          Entidad: 'Hsdfsadfasdfasfdasdfasari',
          'Tipo Contratación': 'Bienes',
          Modalidad: 'ANPE',
          'Objeto de Contratación': 'Adquisicion De Medicamentos Para El Hospital Villa Tunari-Sus (Segunda Compra 2024)',
          Subasta: 'Si',
          'Fecha Publicación': '02/05/2024',
          'Fecha Presentación': '08/05/2024',
          Estado: 'Vigente',
          Archivos: 'Convocatoria\nDocumento Base de Contratacion\n',
          Formularios: 'FORM 100\n',
          Reportes: 'Ver Ficha'
        },
        {
          Cuce: '24-0903-20-1435657-1-1',
          Entidad: 'Hospitgagal Villa Tunasfdasdfasdfasdfsadfasdfasfdasdfasari',
          'Tipo Contratación': 'Bienes',
          Modalidad: 'ANPE',
          'Objeto de Contratación': 'Adquisicion De Medicamentos Para El Hospital Villa Tunari-Sus (Segunda Compra 2024)',
          Subasta: 'Si',
          'Fecha Publicación': '02/05/2024',
          'Fecha Presentación': '08/05/2024',
          Estado: 'Vigente',
          Archivos: 'Convocatoria\nDocumento Base de Contratacion\n',
          Formularios: 'FORM 100\n',
          Reportes: 'Ver Ficha'
        },
        {
          Cuce: '24-0903-20-1435657-1-1',
          Entidad: 'Hospital Villa Tunasfdasdfasdfasdfsadfasdfasfdasdfasari',
          'Tipo Contratación': 'Bienes',
          Modalidad: 'ANPE',
          'Objeto de Contratación': 'Adquisicion De Medicamentos Para El Hospital Villa Tunari-Sus (Segunda Compra 2024)',
          Subasta: 'Si',
          'Fecha Publicación': '02/05/2024',
          'Fecha Presentación': '08/05/2024',
          Estado: 'Vigente',
          Archivos: 'Convocatoria\nDocumento Base de Contratacion\n',
          Formularios: 'FORM 100\n',
          Reportes: 'Ver Ficha'
        },
      ]
      resolve(data);
    }, 1000);
  });
};

const ConvocatoriaNacional = () => {
  const headers = [
    {
      accessorKey: 'Cuce',
      header: 'Cuce',
    },
    {
      accessorKey: 'Entidad',
      header: 'Entidad',
    },
    {
      accessorKey: 'Modalidad',
      header: 'Modalidad',
    },
    {
      accessorKey: 'Subasta',
      header: 'Subasta',
    },
    {
      accessorKey: 'Fecha de Publicación',
      header: 'Fecha de Publicación',
    },
    {
      accessorKey: 'Fecha Presentación',
      header: 'Fecha de Presentación',
    },
    {
      accessorKey: 'Estado',
      header: 'Estado',
    },
  ];

  const items = [
    { ItemId: '1', name: 'Si' },
    { ItemId: '2', name: 'No' },
    { ItemId: '3', name: 'Todos' },
  ];
  const title = "Subasta : ";

  const [cuceID, setCuceID] = useState('');
  const [selectedItem, setSelectedItem] = useState('');
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    //remove this promise
    fetchData().then(d => setData(d));
    try {
      const response = await fetch("/api/contrataciones", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cuceID,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        //setData(result.data);
      } else {
        console.error('Error al obtener los datos');
      }
    } catch (error) {
      console.error('Network error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full mx-auto max-w-screen-xl p-4 mt-8 bg-white rounded-lg shadow-lg shadow-blue-900">
      <h1 className="text-xl font-bold text-center mb-4">Búsqueda de Procesos de Contrataciones Nacionales</h1>
      <div className="h-0.5 bg-blue-700 mb-4"></div>
      <div className="flex justify-center">
        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          <div className="flex items-center space-x-4">
            <label htmlFor="publicacionDesde" className="font-semibold text-gray-800 text-sm">Publicación Desde:</label>
            <input
              type="date"
              className="px-1 py-1 border rounded border-blue-600 text-sm"
              id="publicacionDesde"
            />
            <span className="text-base">Y</span>
            <input
              type="date"
              className="px-1 py-1 border rounded border-blue-600 text-sm"
              id="publicacionHasta"
            />
          </div>
          <div className="flex items-center space-x-4">
            <label htmlFor="presentacionDesde" className="font-semibold text-gray-800 text-sm">Presentación Desde:</label>
            <input
              type="date"
              className="px-1 py-1 border rounded border-blue-600 text-sm"
              id="presentacionDesde"
            />
            <span className="text-base">Y</span>
            <input
              type="date"
              className="px-1 py-1 border rounded border-blue-600 text-sm"
              id="presentacionHasta"
            />
          </div>
          <div className="flex items-center justify-center space-x-2 py-2 bg-blue-100 p-4 rounded-lg">
            <label htmlFor="cuceID" className="font-semibold text-gray-800 text-sm">CUCE:</label>
            <input
              type="text"
              className="px-1 py-1 text-blue-900 rounded border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-700 text-sm"
              id="cuceID"
              value={cuceID}
              onChange={(e) => setCuceID(e.target.value)}
              placeholder="CUCE ID"
            />
          </div>
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-150 text-sm" type="submit">
            Buscar
          </button>
        </form>
      </div>
      {isLoading ? (<Loading />) : (<Table className="my-10 mt-22 mx-4" columns={headers} data={data} />)}
    </div>
  );
};

export default ConvocatoriaNacional;
