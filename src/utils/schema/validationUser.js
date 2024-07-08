import * as Yup from "yup";

export const validationLoginSchema = Yup.object().shape({
  email: Yup.string()
    .required("El correo electrónico es requerido")
    .email("Ingresa un correo electrónico válido"),
  password: Yup.string()
    .required("La contraseña es requerida")
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .max(50, "La contraseña no puede tener más de 50 caracteres"),
});
  
export const validationRegisterSchema = Yup.object().shape({
  email: Yup.string()
    .required("El correo electrónico es requerido")
    .email("Ingresa un correo electrónico válido"),
  password: Yup.string()
    .required("La contraseña es requerida")
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .max(50, "La contraseña no puede tener más de 50 caracteres")
    .matches(
    /^(?=.*[a-z])/,
    "La contraseña debe contener al menos una letra minúscula"
    )
    .matches(
    /^(?=.*[A-Z])/,
    "La contraseña debe contener al menos una letra mayúscula"
    )
    .matches(
    /^(?=.*\d)/,
    "La contraseña debe contener al menos un número"
    ),
    confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir')
    .required('Confirma tu contraseña'),
  name: Yup.string()
    .required("El nombre es requerido")
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(50, "El nombre no puede tener más de 50 caracteres"),
  lastName: Yup.string()
    .required("El apellido es requerido")
    .min(2, "El apellido debe tener al menos 2 caracteres")
    .max(50, "El apellido no puede tener más de 50 caracteres"),
  phoneNumber: Yup.string()
    .required("El número de teléfono es requerido")
    .matches(/^[0-9]{8,15}$/, "Ingresa un número de teléfono válido"),
});
