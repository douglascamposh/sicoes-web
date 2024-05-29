'use client'
import React, { useState, useEffect } from "react";
import Table from "@/components/table";
import FormNationalTender from "@/components/Form/formNationalTender";
import ModalCuce from "@/components/modal";
import FormNewItem from "@/components/Form/newItem";
import SicoesData from "@/components/sicoesData";
import { usePostItemMutation, useGetItemsQuery, useDeleteItemMutation} from "@/redux/services/itemsApi";
import AddIcon from '@mui/icons-material/Add';
import { transformData, newItemObject } from "@/app/functions/utilities";
import { useDispatch, useSelector } from "react-redux";
import { nextPage, prevPage, firsPage, lastPage, searchCuce, anyPage } from "@/redux/slice/paginationSlice";
import DeleteIcon from '@mui/icons-material/Delete';


const SicoesItems = () => {

    const headers = [
        {
            accessorKey: 'cuce',
            header: 'Cuce',
        },
        {
            accessorKey: 'entity',
            header: 'Entidad',
        },
        {
            accessorKey: 'contractDescription',
            header: 'Tipo Contratación',
        },
        {
            accessorKey: 'modality',
            header: 'Modalidad',
        },
        {
            accessorKey: 'auction',
            header: 'Subasta',
            meta: {
                filterVariant: 'select',
            },
        },
        {
            accessorKey: 'publishDateItem',
            header: 'Fecha de Publicación',
        },
        {
            accessorKey: 'presentationDate',
            header: 'Fecha de Presentación',
        },
        {
            accessorKey: 'stateAuction',
            header: 'Estado',
        },
        {
            accessorKey: 'deleteRow',
            header: 'Eliminar',
            cell: ({ row }) => (
                <button
                className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-2 rounded-md shadow-md transition duration-300 ease-in-out"
                onClick={() => {
                  if (window.confirm('¿Estás seguro de que quieres eliminar?')) {
                    handleDeleteItems(row.original.id);
                  }
                }}
              >
                <DeleteIcon className="h-5 w-5" />
              </button>
            ),
          }
    ];


    const sicoesDataFields = [
        { label: 'CUCE', key: 'cuce' },
        { label: 'Entidad', key: 'entity' },
        { label: 'Tipo de Contrato', key: 'contract' },
        { label: 'Modalidad', key: 'modality' },
        { label: 'Descripción del Contrato', key: 'contractDescription' },
        { label: 'Subasta', key: 'auction' },
        { label: 'Estado de la Subasta', key: 'stateAuction' },
        { label: 'Fecha de Presentación', key: 'presentationDate' },
        { label: 'Fecha de Publicación', key: 'publishDateItem' },
        { label: 'Archivos', key: 'Archivos' },
        { label: 'Formularios', key: 'Formularios' },
        { label: 'Reportes', key: 'Reportes' },
    ];


    const dispatch = useDispatch();
    const page = useSelector(state => state.pagination.page);
    const search = useSelector(state => state.pagination.search);
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const [dataSicoes, setDataSicoes] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [postItem] = usePostItemMutation();
    const [deleteItem] = useDeleteItemMutation();

    //add when we have limit
    const { data: itemsSicoesData, refetch: refetchItems } = useGetItemsQuery({
        page: page,
        search: search,
        //limit
    });

    useEffect(() => {
        if (itemsSicoesData) {
            setData(transformData(itemsSicoesData.content));
        }
    }, [itemsSicoesData]);

    const handleNextPage = () => {
        dispatch(nextPage());
        refetchItems();
    };

    const handlePrevPage = () => {
        dispatch(prevPage());
        refetchItems();
    };

    const handleFirstPage = () => {
        dispatch(firsPage());
        refetchItems();
    };

    const handleLastPage = (lastPageNumber) => {
        dispatch(lastPage(lastPageNumber));
        refetchItems();
    };

    const handleSearchById = async (values) => {
        dispatch(searchCuce(values.cuceId))
        refetchItems();
    }

    const handleAnyPage = async (page) => {
        dispatch(anyPage(page));
        refetchItems();
    }
    
    const handleDeleteItems = async (id) => {
      try {
        await deleteItem(id);
        refetchItems();
      } catch (error) {
        console.error('Error al eliminar el ítem:', error.message);
      }
    };

    const handleSearchItem = async (values) => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/recruitments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    cuceID: values.newCuce,
                }),
            });

            if (response.ok) {
                const result = await response.json();
                setDataSicoes(Object(result.data[0]));
            } else {
                console.error('Error al obtener los datos');
            }
        } catch (error) {
            console.error('Network error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleNewItemSubmit = async () => {
        try {
            const response = await postItem(newItemObject(dataSicoes));
            refetchItems();
        } catch (error) {
            console.error('Error al guardar el ítem:', error.message);
        }
    }

    const handleModalClose = () => {
        setShowModal(false);
        setDataSicoes('');
    };

    return (
        <div className="w-full mx-auto max-w-screen-2xl p-4 mt-8 bg-white rounded-lg shadow-lg shadow-blue-900">
            <h1 className="text-xl font-bold text-center mb-4">Búsqueda de Procesos de Contrataciones Nacionales</h1>
            <div className="flex justify-end">
                <button
                    type="button"
                    className="flex items-end px-3 py-2 bg-blue-700 text-white hover:bg-blue-600  transition-colors duration-300 text-sm "
                    onClick={() => setShowModal(true)}
                >
                    <AddIcon className="text-lg mr-2" />Registrar Cuce
                </button>
            </div>
            <div className="h-0.5 bg-blue-700 mb-4"></div>
            <div className="flex justify-center">
                <FormNationalTender onSubmit={handleSearchById} onNewItemClick={() => setShowModal(true)} />
                <ModalCuce isOpen={showModal} onClose={handleModalClose} handleNewItemSubmit={handleNewItemSubmit}>
                    <FormNewItem onSubmit={handleSearchItem} isLoading={isLoading} />
                    <SicoesData dataSicoes={dataSicoes} sicoesDataFields={sicoesDataFields} />
                </ModalCuce>
            </div>
            <Table className="my-10 mt-22 mx-4"
                columns={headers}
                data={data}
                handleNextPage={handleNextPage}
                handlePrevPage={handlePrevPage}
                handleFirstPage={handleFirstPage}
                handleLastPage={handleLastPage}
                handleAnyPage={handleAnyPage}
                totalPages={itemsSicoesData?.totalPages || 0}
                totalElements={itemsSicoesData?.totalElements || 0}
                page={page} />
        </div>
    );
};

export default SicoesItems;