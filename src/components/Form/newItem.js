import { Formik, Field, Form } from 'formik';
import { Search, Add } from '@mui/icons-material';
import { CircularProgress } from '@mui/material';

const FormNewItem = ({ onSubmit, onClose, isLoading }) => {
    return (
        <Formik
            initialValues={{ newCuce: '' }}
            onSubmit={(values) => {
                onSubmit(values);
            }}
        >
            {() => (
                <Form className="flex items-center max-w-sm mx-auto">
                    <label htmlFor="simple-search" className="sr-only">
                        Search
                    </label>
                    <div className="relative w-full">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            {isLoading ? (
                                <div className="text-left rtl:text-right">
                                    <div role="status">
                                        <CircularProgress size={16} className="inlinetext-gray-200 animate-spin dark:text-gray-600 fill-blue-600" />
                                    </div>
                                </div>
                            ) : (
                                <Search className="w-4 h-4 text-blue-700" />
                            )}
                        </div>
                        <Field
                            type="text"
                            id="newCuce"
                            name="newCuce"
                            className="bg-white border border-blue-700 text-gray-600 text-sm rounded-lg  focus:border-blue-700 block w-full ps-10 p-1.5 dark:bg-blue-100 dark:border-gray-600 dark:placeholder-gray-400   dark:focus:border-blue-700"
                            placeholder="buscar por cuce..."
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="p-1.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-300 hover:text-blue-700 hover:text-sm"
                    >
                        Buscar
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default FormNewItem;