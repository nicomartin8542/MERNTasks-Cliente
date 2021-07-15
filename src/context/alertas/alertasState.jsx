import React, {useReducer} from "react";
import alertasContext from "../alertas/alertasContext";
import alertasReducer from "../alertas/alertasReducer";
import {MOSTRAR_ALERTA, OCULTAR_ALERTA} from "../../types/index";

const AlertasContext = (props) => {
	//Iicio el state para el context
	const initialState = {
		alerta: null,
	};

	//Dispach para ejecutar las acciones
	const [state, dispatch] = useReducer(alertasReducer, initialState);

	//Funciones para ejecutar las acciones
	const mostrarAlerta = (msg, categoria) => {
		dispatch({
			type: MOSTRAR_ALERTA,
			payload: {
				msg,
				categoria,
			},
		});

		//Oculto alerta
		setTimeout(() => {
			dispatch({
				type: OCULTAR_ALERTA,
			});
		}, 5000);
	};

	//Return
	return (
		<alertasContext.Provider
			value={{
				alerta: state.alerta,
				mostrarAlerta,
			}}
		>
			{props.children}
		</alertasContext.Provider>
	);
};

export default AlertasContext;
