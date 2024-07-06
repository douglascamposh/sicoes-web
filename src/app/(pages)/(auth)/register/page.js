"use client"

import React, { useEffect } from "react";
import { Formik, Form } from "formik";
import { useSignUpMutation } from "@/redux/services/authApi";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import SmartphoneOutlinedIcon from '@mui/icons-material/SmartphoneOutlined';
import FormInputIcon from "@/components/common/FormInputIcon";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { validationRegisterSchema } from "@/utils/schema/validationUser";
import { userCreateScheme } from "@/utils/schema/userSchema";
import Spinner from "@/components/common/Spinner";
import Title from '@/components/common/title';
import { Logger } from "@/services/Logger";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; //Todo: check how to add it on css in order to avoid the import of the css 

const Register  = () => {
  const router = useRouter();
  const [ signUp, { data: dataSignUp, error, isLoading}] = useSignUpMutation();

  const handleSubmit = (values) => {
    signUp(values)
  };

  useEffect(() => {
    if(dataSignUp) {
      localStorage.setItem('token', dataSignUp.token);
      router.push(`/sicoesitems`);
    }
  }, [dataSignUp]);

  useEffect(() => {
    if(error) {
      Logger.error('There is an error at register the user', error);
      toast.error("No se pudo registar, revise sus datos");
    }
  }, [error]);

  return (
    isLoading ?
    <div className="justify-center flex items-center h-screen ">
      <Spinner/>
    </div> :
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-gray-200 p-8 rounded-xl shadow-2xl w-auto lg:w-[450px]">
        <h1 className="text-2xl text-center uppercase font-bold tracking-[5px] mb-8 py-2 ">
          Crear
          <span className="text-primary"> cuenta</span>
        </h1>
        <Formik
          initialValues={userCreateScheme}
          validationSchema={validationRegisterSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className="mt-8 space-y-2">
                <div className="flex space-x-4">
                    <FormInputIcon
                    icon={AccountCircleOutlinedIcon}
                    type="text"
                    name="name"
                    placeholder="Nombres"
                    touched={touched}
                    errors={errors}
                />
                
                <FormInputIcon
                    icon={AccountCircleOutlinedIcon}
                    type="text"
                    name="lastName"
                    placeholder="Apellidos"
                    touched={touched}
                    errors={errors}
                />
                </div>
              <FormInputIcon
                icon={EmailIcon}
                type="text"
                name="email"
                placeholder="Correo electronico"
                touched={touched}
                errors={errors}
              />

              <FormInputIcon
                icon={LockIcon}
                type="password"
                name="password"
                placeholder="Contraseña"
                touched={touched}
                errors={errors}
              />
              <FormInputIcon
                icon={LockIcon}
                type="password"
                name="confirmPassword"
                placeholder="Confirmar Contraseña" 
                touched={touched}
                errors={errors}
              />
                <FormInputIcon
                icon={SmartphoneOutlinedIcon}
                type="text"
                name="phoneNumber"
                placeholder="Telefono"
                touched={touched}
                errors={errors}
              />

              <div>
                <button
                  type="submit"
                  className="text-blue-400 uppercase bg-blue-700 hover:bg-blue-300 w-full rounded-lg text-sm w-8 h-8 justify-center hover:text-white items-center"
                >
                  <Title>
                    <div className='text-white'>Registrar</div>
                  </Title>
                </button>
              </div>
            </Form>
          )}
        </Formik>
        <div className="flex flex-col items-center gap-4">

            <span className="flex  items-center gap-3 ">
                ¿Ya tienes cuenta? <Link href="/login" className="text-primary hover:bg-gray-100 transition-colors">Ingresa</Link>
            </span>
        </div>

      </div>
    </div>
  );
};

export default Register;
