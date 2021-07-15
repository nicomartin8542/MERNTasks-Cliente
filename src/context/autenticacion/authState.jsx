import React, {useReducer} from "react";
import authContext from "./authContext";
import authReducer from "./authReducer";
import clienteAxios from "../../config/axios";
import tokenAuth from "../../config/token";
import {
	REGISTRO_EXITOSO,
	REGISTRO_ERROR,
	OBTENER_USUARIO,
	LOGIN_ERROR,
	LOGIN_EXITOSO,
	CERRAR_SESION,
} from "../../types/index";

const AuthState = (props) => {
	//Inicializo el state
	const initialState = {
		token: localStorage.getItem("token"),
		autenticado: null,
		usuario: null,
		mensaje: null,
		cargando: true,
	};

	//Dispach para ejecutar las acciones
	const [state, dispatch] = useReducer(authReducer, initialState);

	//Funciones para ejecutar el dispatch
	const registrarUsuario = async (datos) => {
		try {
			const respuesta = await clienteAxios.post("/api/usuarios/", datos);

			dispatch({
				type: REGISTRO_EXITOSO,
				payload: respuesta.data,
			});

			usuarioAutenticado();
		} catch (error) {
			const alerta = {
				msg: error.response.data.msg,
				categoria: "alerta-error",
			};

			dispatch({
				type: REGISTRO_ERROR,
				payload: alerta,
			});
		}
	};

	//Retorna el usuario autenticado
	const usuarioAutenticado = async () => {
		const token = localStorage.getItem("token");
		if (token) {
			tokenAuth(token);
		}

		try {
			const respuesta = await clienteAxios.get("/api/auth");
			dispatch({
				type: OBTENER_USUARIO,
				payload: respuesta.data.usuario,
			});
		} catch (error) {
			dispatch({
				type: LOGIN_ERROR,
			});
		}
	};

	//Inicio de sesion
	const iniciarSesion = async (datos) => {
		try {
			const respuesta = await clienteAxios.post("/api/auth", datos);
			dispatch({
				type: LOGIN_EXITOSO,
				payload: respuesta.data,
			});

			usuarioAutenticado();
		} catch (error) {
			const alerta = {
				msg: error.response.data.msg,
				categoria: "alerta-error",
			};
			dispatch({
				type: LOGIN_ERROR,
				payload: alerta,
			});
		}
	};

	//Cerrar iniciarSesion
	const cerrarSesion = () => {
		dispatch({
			type: CERRAR_SESION,
		});
	};

	//return
	return (
		<authContext.Provider
			value={{
				token: state.token,
				usuario: state.usuario,
				autenticado: state.autenticado,
				mensaje: state.mensaje,
				cargando: state.cargando,
				registrarUsuario,
				iniciarSesion,
				usuarioAutenticado,
				cerrarSesion,
			}}
		>
			{props.children}
		</authContext.Provider>
	);
};

export default AuthState;
