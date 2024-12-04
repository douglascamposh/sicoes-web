import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { Search } from '@mui/icons-material';
import Title from '../common/title';

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
                <Form className="flex flex-col space-y-4">
                    <div className="flex flex-col lg:flex-row space-y-2 lg:space-x-2">
                        <div className="flex items-center">
                            <label htmlFor="publicacionDesde" className="font-semibold text-gray-800">
                                <Title>{"Publicación Desde:"}</Title>
                            </label>
                            <Field
                                type="date"
                                className="py-1 border rounded border-gray-300 w-full sm:w-auto ml-1"
                                id="publicacionDesde"
                                name="publicacionDesde"
                            />
                            <Title className="mr-1 ml-1">{"Y"}</Title>
                            <Field
                                type="date"
                                className="py-1 border rounded w-full sm:w-auto border-gray-300  ml-0.5"
                                id="publicacionHasta"
                                name="publicacionHasta"
                            />
                        </div>
                        <div className="flex items-center">
                            <label htmlFor="presentacionDesde" className="font-semibold text-gray-800">
                                <Title className="">{"Presentación Desde:"}</Title>
                            </label>
                            <Field
                                type="date"
                                className="py-1 border rounded w-full sm:w-auto border-gray-300  ml-1"
                                id="presentacionDesde"
                                name="presentacionDesde"
                            />
                            <Title className="mr-1 ml-1">{"Y"}</Title>
                            <Field
                                type="date"
                                className="py-1 border rounded w-full sm:w-auto border-gray-300"
                                id="presentacionHasta"
                                name="presentacionHasta"
                            />
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                        <div className="flex flex-col items-center w-full md:w-auto">
                            <div className="flex bg-white border border-blue-700 text-gray-600 text-sm rounded-lg focus:border-blue-700 p-1.5 dark:bg-blue-100 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:border-blue-700">
                                <Search className="w-4 h-4 text-blue-700 mr-2 mt-1" />
                                <Field
                                    type="text"
                                    className="flex-grow bg-transparent outline-none md:text-sm p-0.5 md:p-0.5"
                                    id="cuceId"
                                    name="cuceId"
                                    placeholder="CUCE ID"
                                />
                            </div>
                        </div>
                        <button type="submit" className="p-2  ms-2 md:ms-4 text-base md:text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-300 hover:text-blue-700">
                            <Title>
                                <div className='text-white'>Buscar</div>
                            </Title>
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default FormNationalTender;