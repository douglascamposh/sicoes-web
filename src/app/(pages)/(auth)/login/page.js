"use client"

import React, { use, useEffect } from "react";
import { Formik, Form } from "formik";
import { useLogInMutation } from "@/redux/services/authApi";
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import FormInputIcon from "@/components/common/FormInputIcon";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { validationLoginSchema } from "@/utils/schema/validationUser";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Logger } from "@/services/Logger";
import Spinner from "@/components/common/Spinner";
import Title from '@/components/common/title';
import { setUserToken } from "@/redux/actions";
import { useDispatch } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [logInMutation, {data:dataLogIn, error, isLoading}] = useLogInMutation();

  const handleSubmit = (values) => {
    logInMutation(values);
  };

  useEffect(() => {
   if(dataLogIn) {
    localStorage.setItem('token', dataLogIn.token);
    dispatch(setUserToken(dataLogIn.token));
     router.push(`/sicoesitems`);
   }
  }, [dataLogIn]);
  
  useEffect(() => {
    if(error) {
      Logger.error('There is an error at login the user', error);
      toast.error("No se pudo iniciar sesión, revise sus datos");
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
          Iniciar
          <span className="text-primary"> sesión</span>
        </h1>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationLoginSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className="mt-8 space-y-2">
              <FormInputIcon
                icon={EmailIcon}
                type="email"
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

              <div>
                <button
                  type="submit"
                  className="text-blue-400 uppercase bg-blue-700 hover:bg-blue-300 w-full rounded-lg text-sm w-8 h-8 justify-center hover:text-white items-center"
                >
                  <Title>
                    <div className='text-white'>{"Ingresar"}</div>
                  </Title>
                </button>
              </div>
            </Form>
          )}
        </Formik>
        <div className="flex flex-col items-center gap-4">
            <Link href="/" className=" hover:text-primary transition-colors">
                ¿Olvidaste tu contraseña?
            </Link >
            <span className="flex  items-center gap-3 ">
                ¿No tienes cuenta? <Link href="/register" className="text-primary hover:text-gray600 transition-colors">Registrate</Link>
            </span>
        </div>

      </div>
    </div>
  );
};

export default Login;
