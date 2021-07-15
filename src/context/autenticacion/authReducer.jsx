import {
	REGISTRO_EXITOSO,
	REGISTRO_ERROR,
	OBTENER_USUARIO,
	LOGIN_ERROR,
	LOGIN_EXITOSO,
	CERRAR_SESION,
} from "../../types/index";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
	switch (action.type) {
		case REGISTRO_EXITOSO:
		case LOGIN_EXITOSO:
			localStorage.setItem("token", action.payload.token);
			return {
				...state,
				token: action.payload.token,
				autenticado: true,
				mensaje: null,
				cargando: false,
			};

		case LOGIN_ERROR:
		case REGISTRO_ERROR:
		case CERRAR_SESION:
			localStorage.removeItem("token");
			return {
				...state,
				token: null,
				usuario: null,
				mensaje: action.payload || null,
				autenticado: null,
				cargando: false,
			};

		case OBTENER_USUARIO:
			return {
				...state,
				autenticado: true,
				usuario: action.payload,
				cargando: false,
				mensaje: null,
			};
		default:
			break;
	}
};
