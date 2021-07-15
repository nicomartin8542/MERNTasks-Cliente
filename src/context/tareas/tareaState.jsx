import React, {useReducer} from "react";
import tareaContext from "./tareaContext";
import tareaReducer from "./tareaReducer";
import clienteAxios from "../../config/axios";
import {
	TAREAS_PROYECTO,
	AGREGAR_TAREAS,
	VALIDAR_TAREA,
	ELIMINAR_TAREA,
	TAREA_ACTUAL,
	ACTUALIZAR_TAREA,
} from "../../types/index";

const TareaState = (props) => {
	//Creo el state inicial para el reducer
	const initialState = {
		tareasproyecto: [],
		errortarea: false,
		tareaactual: null,
	};

	//Inicialito useReducer para utilizar el dispach y disparar las funciones
	const [state, dispatch] = useReducer(tareaReducer, initialState);

	//Aqui van las funciones del TareaState

	//Obtengo tareas
	const obtenerTareas = async (proyecto) => {
		try {
			const respuesta = await clienteAxios.get("/api/tarea", {
				params: {
					proyecto,
				},
			});

			dispatch({
				type: TAREAS_PROYECTO,
				payload: respuesta.data.tareas,
			});
		} catch (error) {
			console.log(error.response.data);
		}
	};

	//Agrego tareas
	const agregarTareas = async (tarea) => {
		try {
			const respuesta = await clienteAxios.post("/api/tarea", tarea);
			dispatch({
				type: AGREGAR_TAREAS,
				payload: respuesta.data.tarea,
			});
		} catch (error) {
			console.log(error.response.data);
		}
	};

	//Valido tarea y muestro error si es necesario
	const validarTarea = () => {
		dispatch({
			type: VALIDAR_TAREA,
		});
	};

	//Elimino una tarea
	const eliminarTarea = async (tareaId) => {
		try {
			const url = `/api/tarea/${tareaId}`;
			await clienteAxios.delete(url);
			dispatch({
				type: ELIMINAR_TAREA,
				payload: tareaId,
			});
		} catch (error) {
			//Si el error es por usuario vencido, envio a el login
			if (error.response.status === 401) {
				window.location.replace("/");
				return;
			}
			console.log(error.response.data);
		}
	};

	//Obtengo tarea actual que quiero modificar
	const obtenerTareaActual = (tarea) => {
		dispatch({
			type: TAREA_ACTUAL,
			payload: tarea,
		});
	};

	//Editar tarea
	const actualizarTarea = async (tarea) => {
		try {
			const url = `/api/tarea/${tarea._id}`;
			const respuesta = await clienteAxios.put(url, tarea);

			dispatch({
				type: ACTUALIZAR_TAREA,
				payload: respuesta.data.tarea,
			});
		} catch (error) {
			//Si el error es por usuario vencido, envio a el login
			if (error.response.status === 401) {
				window.location.replace("/");
				return;
			}
			console.log(error.response.data);
		}
	};

	return (
		<tareaContext.Provider
			value={{
				tareas: state.tareas,
				tareasproyecto: state.tareasproyecto,
				errortarea: state.errortarea,
				tareaactual: state.tareaactual,
				obtenerTareas,
				agregarTareas,
				validarTarea,
				eliminarTarea,
				obtenerTareaActual,
				actualizarTarea,
			}}
		>
			{props.children}
		</tareaContext.Provider>
	);
};

export default TareaState;
