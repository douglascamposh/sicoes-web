import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { Search } from '@mui/icons-material';

const FormNationalTender = ({ onSubmit, onNewItemClick }) => {
    return (
        <Formik
            initialValues={{
                cuceId: '',
                publicationFrom: '',
                publicationTo: '',
                presentationFrom: '',
                presentationTo: '',

            }}
            onSubmit={(values) => onSubmit(values)}
        >
            {() => (
                <Form className="flex flex-col space-y-4 ">
                    <div className="flex items-center space-x-4">
                        <label htmlFor="publicacionDesde" className="font-semibold text-gray-800 text-sm">
                            Publicación Desde:
                        </label>
                        <Field
                            type="date"
                            className="px-1 py-1 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                            id="publicacionDesde"
                            name="publicacionDesde"
                        />
                        <span className="text-base">Y</span>
                        <Field
                            type="date"
                            className="px-1 py-1 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                            id="publicacionHasta"
                            name="publicacionHasta"
                        />

                        <label htmlFor="presentacionDesde" className="font-semibold text-gray-800 text-sm">
                            Presentación Desde:
                        </label>
                        <Field
                            type="date"
                            className="px-1 py-1 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                            id="presentacionDesde"
                            name="presentacionDesde"
                        />
                        <span className="text-base">Y</span>
                        <Field
                            type="date"
                            className="px-1 py-1 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                            id="presentacionHasta"
                            name="presentacionHasta"
                        />
                    </div>
                    <div className="flex items-center justify-center max-w-sm mx-auto">
                        <div className="relative w-full">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <Search className="w-4 h-4 text-blue-700" />
                            </div>
                            <Field
                                type="text"
                                className="bg-white border border-blue-700 text-gray-600 text-sm rounded-lg focus:border-blue-700 block w-full ps-10 p-1.5 dark:bg-blue-100 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:border-blue-700"
                                id="cuceId"
                                name="cuceId"
                                placeholder="CUCE ID"
                            />
                        </div>
                        <button
                            type="submit"
                            className="p-1.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-300 hover:text-blue-700 hover:text-sm"
                        >
                            Buscar
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default FormNationalTender;