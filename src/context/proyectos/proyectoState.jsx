import React, {useReducer} from "react";
import proyectoContext from "./proyectoContext";
import proyectoReducer from "./proyectoReducer";
import {
	FORMULARIO_PROYECTO,
	LISTAR_PROYECTOS,
	AGREGAR_PROYECTO,
	VALIDAR_FORMULARIO,
	PROYECTO_ACTUAL,
	ELIMINAR_PROYECTO,
	PROYECTO_ERROR,
} from "../../types/index";
import clienteAxios from "../../config/axios";

const ProyectoState = (props) => {
	//Inicio el state para el context
	const initialState = {
		proyectos: [],
		formulario: false,
		errorformulario: false,
		proyecto: null,
		mensaje: null,
	};

	//Dispatch para ejecutar las acciones
	const [state, dispatch] = useReducer(proyectoReducer, initialState);

	//Aqui van a ir las funciones para el CRUD del proyecto

	//Mostrar Formulario
	const mostrarFormulario = () => {
		dispatch({
			type: FORMULARIO_PROYECTO,
		});
	};

	//Obtener proyectos
	const obtenerProyectos = async () => {
		try {
			const respuesta = await clienteAxios.get("/api/proyecto");

			dispatch({
				type: LISTAR_PROYECTOS,
				payload: respuesta.data.proyectos,
			});
		} catch (error) {
			//Si el error es por usuario vencido, envio a el login
			if (error.response.status === 401) {
				window.location.replace("/");
				return;
			}
			dispatch({
				type: PROYECTO_ERROR,
			});
		}
	};

	//Agregar proyectos
	const addProyectos = async (proyecto) => {
		try {
			const respuesta = await clienteAxios.post("/api/proyecto", proyecto);

			dispatch({
				type: AGREGAR_PROYECTO,
				payload: respuesta.data.proyecto,
			});
		} catch (error) {
			//Si el error es por usuario vencido, envio a el login
			if (error.response.status === 401) {
				window.location.replace("/");
				return;
			}
			const alerta = {
				msg: "Error al agregar un proyecto, verifique y reintente de nuevo",
				categoria: "alerta-error",
			};

			dispatch({
				type: PROYECTO_ERROR,
				payload: alerta,
			});
		}
	};

	//Validar Formulario
	const mostrarError = () => {
		dispatch({
			type: VALIDAR_FORMULARIO,
		});
	};

	//Obtener proyecto actual
	const obtenerProyecto = (proyectoId) => {
		dispatch({
			type: PROYECTO_ACTUAL,
			payload: proyectoId,
		});
	};

	//Elimino un proyecto
	const eliminarProyecto = async (proyectoId) => {
		try {
			const url = `/api/proyecto/${proyectoId}`;
			await clienteAxios.delete(url);

			dispatch({
				type: ELIMINAR_PROYECTO,
				payload: proyectoId,
			});
		} catch (error) {
			//Si el error es por usuario vencido, envio a el login
			if (error.response.status === 401) {
				window.location.replace("/");
				return;
			}
			const alerta = {
				msg: "Error al eliminar, verifique y reintente de nuevo",
				categoria: "alerta-error",
			};

			dispatch({
				type: PROYECTO_ERROR,
				payload: alerta,
			});
		}
	};

	return (
		<proyectoContext.Provider
			value={{
				proyectos: state.proyectos,
				formulario: state.formulario,
				errorformulario: state.errorformulario,
				proyecto: state.proyecto,
				mensaje: state.mensaje,
				mostrarFormulario,
				obtenerProyectos,
				addProyectos,
				mostrarError,
				obtenerProyecto,
				eliminarProyecto,
			}}
		>
			{props.children}
		</proyectoContext.Provider>
	);
};

export default ProyectoState;
