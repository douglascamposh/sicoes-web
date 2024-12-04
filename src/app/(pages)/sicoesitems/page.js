'use client'
import React, { useState, useEffect } from "react";
import Table from "@/components/table";
import FormNationalTender from "@/components/Form/formNationalTender";
import ModalCuce from "@/components/modalCuce";
import FormNewItem from "@/components/Form/newItem";
import SicoesData from "@/components/sicoesData";
import { usePostItemMutation, useGetItemsQuery, useDeleteItemMutation, useEditItemMutation } from "@/redux/services/itemsApi";
import AddIcon from '@mui/icons-material/Add';
import { transformData, newItemObject, transformedItem } from "@/app/functions/utilities";
import { useDispatch, useSelector } from "react-redux";
import { nextPage, prevPage, firsPage, lastPage, searchCuce, anyPage } from "@/redux/slice/paginationSlice";
import DeleteIcon from '@mui/icons-material/Delete';
import CachedIcon from '@mui/icons-material/Cached';
import { toast } from 'react-toastify';
import Title from "@/components/common/title";
import DescriptionContent from "@/components/common/description";

const SicoesItems = () => {
    const headers = [
        {
            accessorKey: 'cuce',
            header: 'Cuce',
            cell : ({row}) => (<DescriptionContent>{row.original.cuce}</DescriptionContent>)
        },
        {
            accessorKey: 'entity',
            header: 'Entidad',
            cell : ({row}) => (<DescriptionContent>{row.original.entity}</DescriptionContent>)
        },
        {
            accessorKey: 'contractDescription',
            header: 'Tipo Contratación', cell : ({row}) => (<DescriptionContent>{row.original.contractDescription}</DescriptionContent>)
        },
        {
            accessorKey: 'modality',
            header: 'Modalidad',
            cell : ({row}) => (<DescriptionContent>{row.original.modality}</DescriptionContent>)
        },
        {
            accessorKey: 'auction',
            header: 'Subasta',
            meta: {
                filterVariant: 'select',
            },
            cell : ({row}) => (<DescriptionContent>{row.original.auction}</DescriptionContent>)
        },
        {
            accessorKey: 'publishDateItem',
            header: 'Fecha de Publicación',
            cell : ({row}) => (<DescriptionContent>{row.original.publishDateItem}</DescriptionContent>)
        },
        {
            accessorKey: 'presentationDate',
            header: 'Fecha de Presentación',
            cell : ({row}) => (<DescriptionContent>{row.original.presentationDate}</DescriptionContent>)
        },
        {
            accessorKey: 'form170Date',
            header: '170 Fecha de Publicación',
            cell : ({row}) => (<DescriptionContent>{row.original.form170Date}</DescriptionContent>)
        },
        {
            accessorKey: 'stateAuction',
            header: 'Estado',
            cell : ({row}) => (<DescriptionContent>{row.original.stateAuction}</DescriptionContent>)
        },
        {
            accessorKey: 'refresh',
            header: 'Refrescar',
            cell: ({ row }) => {
                return (
                    <div className="flex items-center justify-center text-blue-800">
                        <button onClick={() => handlerefresh(row)} disabled={isRefreshing[row.original.id] ? true : false}>

                            <CachedIcon
                                className={`${isRefreshing[row.original.id] ? 'animate-spin' : ''}`}
                            />
                        </button>
                    </div>)
            }
        },
        {
            accessorKey: 'deleteRow',
            header: 'Eliminar',
            cell: ({ row }) => (
                //handleDeleteItems(row.original.id);
                <button
                    className="  text-red-600 font-bold py-2 px-2  rounded-md transition duration-300 ease-in-out"
                    onClick={() => handleDeleteItemModal(row.original.id)}
                >
                    <DeleteIcon className="h-5 w-5" />
                </button>
            ),
        },
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
        { label: '170 Fecha de Publicación', key: 'form170Date' },
        { label: 'Archivos', key: 'Archivos' },
        { label: 'Formularios', key: 'Formularios' },
    ];


    const dispatch = useDispatch();
    const page = useSelector(state => state.pagination.page);
    const search = useSelector(state => state.pagination.search);
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const [dataSicoes, setDataSicoes] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [selectedItemToDelete, setSelectedItemToDelete] = useState(null);
    const [isRefreshing, setIsRefreshing] = useState({});
    const [postItem] = usePostItemMutation();
    const [deleteItem] = useDeleteItemMutation();
    const [editItem] = useEditItemMutation();

    const titleModal = "AGREGAR NUEVO SICOES ITEM";
    const titleModalDelete = "ELIMINAR SICOES ITEM";
    const titleTable = "Búsqueda de Procesos de Contrataciones Nacionales"
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

    const handlerefresh = async (row) => {
        try {
            setIsRefreshing({ [row.original.id]: true });
            const response = await fetch('/api/recruitments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    cuceID: row.original.cuce.trim(),
                }),
            });

            if (response.ok) {
                const result = await response.json();
                const itemToUpdate = {
                    id: row.original.id,
                    ...Object(result.data[0]),
                };
                await editItem({ id: row.original.id, item: transformedItem(itemToUpdate) });
                toast.success("Item Actualizado correctamente",{
                    position : "bottom-right"
                })
                setIsRefreshing({ [row.original.id]: false });
            } else {
                setIsRefreshing({ [row.original.id]: false });
                toast.error("Error al actualizar el item",{
                    position : "bottom-right"
                })
            }
        } catch (error) {
            setIsRefreshing({ [row.original.id]: false });
        }
    };

    const handleSearchItem = async (values) => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/recruitments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    cuceID: values.newCuce.trim(),
                }),
            });

            if (response.ok) {
                const result = await response.json();
                setDataSicoes(Object(result.data[0]));
            } else {
                //TODO show in the UI try again or something like that
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
            setShowModal(false);
        } catch (error) {
            console.error('Error al guardar el ítem:', error.message);
        }
    }

    const handleModalClose = () => {
        setShowModal(false);
        setDataSicoes('');
    }
    const handleModalDeleteClose = () => {
        setShowModalDelete(false);
    }

    const handleDeleteItemModal = (id) => {
        setSelectedItemToDelete(id);
        setShowModalDelete(true);
    }

    const handleDeleteItems = async () => {
        try {
          const response = await deleteItem(selectedItemToDelete);
          if (response.error.originalStatus === 200) {
            refetchItems();
            setShowModalDelete(false);
            setSelectedItemToDelete(null);
            toast.success("Item eliminado exitosamente", {
              position: "bottom-right",
            });
          } else {
            toast.error("Error al eliminar el elemento",{
                position : "bottom-right"
            });
          }
        } catch (error) {
          console.error('Error al eliminar el ítem:', error.message);
          toast.error("Error al eliminar el elemento",{
            position : "bottom-right"
        });
        }
      };
    return (
        <div className="w-full mx-auto max-w-screen-2xl p-4 mt-8 bg-white rounded-lg shadow-lg shadow-blue-900">
             <Title className="text-center">
                <h1 className="text-blue-500 text-xl">{titleTable}</h1>
            </Title>
            <div className="flex justify-end">
                <button
                    type="button"
                    className="flex items-end px-3 py-2 bg-blue-700 text-white hover:bg-blue-600  transition-colors duration-300 text-sm "
                    onClick={() => setShowModal(true)}
                >
                    <AddIcon className="text-lg mr-2" />
                    <Title>
                        <h1 className="text-white">{"Registrar Cuce"}</h1>
                    </Title>
                </button>
            </div>
            <div className="h-0.5 bg-blue-700 mb-4"></div>
            <div className="flex justify-center">
                <FormNationalTender onSubmit={handleSearchById} onNewItemClick={() => setShowModal(true)} />
                <ModalCuce
                    title={titleModal}
                    isOpen={showModal}
                    onClose={handleModalClose}
                    handleNewItemSubmit={handleNewItemSubmit}
                    submitButtonText="Agregar"
                    cancelButtonText="Cancelar"
                >
                    <FormNewItem onSubmit={handleSearchItem} isLoading={isLoading} />
                    <SicoesData dataSicoes={dataSicoes} sicoesDataFields={sicoesDataFields} />
                </ModalCuce>
            </div>
            <div>
                <ModalCuce
                    title={titleModalDelete}
                    isOpen={showModalDelete}
                    onClose={handleModalDeleteClose}
                    handleNewItemSubmit={handleDeleteItems}
                    submitButtonText="Eliminar"
                    cancelButtonText="Cancelar"
                >
                    <h1>¿Seguro que quieres eliminar este Item?</h1>
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