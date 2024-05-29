import React from 'react';
import CloseIcon from '@mui/icons-material/Close';

const ModalCuce = ({ isOpen, onClose, children, handleNewItemSubmit }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-blue-100 bg-opacity-70">
            <div className="relative p-4 w-full max-w-2xl max-h-full bg-white rounded-lg shadow 0">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-blue-600">
                    <h3 className="text-xl font-semibold text-blue-700">
                        AGREGAR NUEVO SICOES
                    </h3>
                    <button
                        type="button"
                        className="text-blue-400 bg-transparent hover:bg-blue-200 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center hover:text-white items-center dark:hover:bg-blue-600"
                        onClick={onClose}
                    >
                        <CloseIcon />
                    </button>
                </div>
                <div className="p-4 md:p-5 space-y-4">{children}</div>
                <div className="flex items-center p-4 md:p-5 border-t border-blue-200 rounded-b dark:border-blue-600">
                    <button
                        type="button"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onClick={() => {
                            handleNewItemSubmit();
                            onClose();
                        }}
                    >
                        Agregar
                    </button>
                    <button
                        type="button"
                        className="py-2.5 px-5 ms-3 text-sm font-medium text-blue-900 focus:outline-none bg-white rounded-lg border border-blue-400 hover:bg-blue-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-700 "
                        onClick={onClose}
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalCuce;