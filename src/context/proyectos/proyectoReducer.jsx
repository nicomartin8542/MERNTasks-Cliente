import {
	FORMULARIO_PROYECTO,
	LISTAR_PROYECTOS,
	AGREGAR_PROYECTO,
	VALIDAR_FORMULARIO,
	PROYECTO_ACTUAL,
	ELIMINAR_PROYECTO,
	PROYECTO_ERROR,
} from "../../types/index";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
	switch (action.type) {
		case FORMULARIO_PROYECTO:
			return {
				...state,
				formulario: true,
				mensaje: null,
			};

		case LISTAR_PROYECTOS:
			return {
				...state,
				proyectos: action.payload,
				mensaje: null,
			};

		case AGREGAR_PROYECTO:
			return {
				...state,
				proyectos: [...state.proyectos, action.payload],
				formulario: false,
				errorformulario: false,
				mensaje: null,
			};

		case VALIDAR_FORMULARIO:
			return {
				...state,
				errorformulario: true,
				mensaje: action.payload,
			};

		case PROYECTO_ACTUAL:
			return {
				...state,
				proyecto: state.proyectos.filter((p) => p._id === action.payload),
				mensaje: null,
			};

		case ELIMINAR_PROYECTO:
			return {
				...state,
				proyectos: state.proyectos.filter((p) => p._id !== action.payload),
				proyecto: null,
				mensaje: null,
			};

		case PROYECTO_ERROR:
			return {
				...state,
				mensaje: action.payload,
			};

		default:
			return state;
	}
};
