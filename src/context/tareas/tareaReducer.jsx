import {
	TAREAS_PROYECTO,
	AGREGAR_TAREAS,
	VALIDAR_TAREA,
	ELIMINAR_TAREA,
	TAREA_ACTUAL,
	ACTUALIZAR_TAREA,
} from "../../types/index";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
	switch (action.type) {
		case TAREAS_PROYECTO:
			return {
				...state,
				tareasproyecto: action.payload,
			};

		case AGREGAR_TAREAS:
			return {
				...state,
				tareasproyecto: [action.payload, ...state.tareasproyecto],
				errortarea: false,
			};

		case VALIDAR_TAREA:
			return {
				...state,
				errortarea: true,
			};

		case ELIMINAR_TAREA:
			return {
				...state,
				tareasproyecto: state.tareasproyecto.filter(
					(tarea) => tarea._id !== action.payload,
				),
			};

		case ACTUALIZAR_TAREA:
			return {
				...state,
				tareasproyecto: state.tareasproyecto.map((tarea) =>
					tarea._id === action.payload._id ? action.payload : tarea,
				),
				tareaactual: null,
			};

		case TAREA_ACTUAL:
			return {
				...state,
				tareaactual: action.payload,
			};

		default:
			return state;
	}
};
