import React, {useContext, useEffect} from "react";
import Proyecto from "../proyectos/Proyecto";
import proyectoContext from "../../context/proyectos/proyectoContext";
import AlertasContext from "../../context/alertas/alertasContext";
import {CSSTransition, TransitionGroup} from "react-transition-group";

const ListadoProyectos = () => {
	//Extraer poryectos de initialstate
	const stateContext = useContext(proyectoContext);
	const {proyectos, mensaje, obtenerProyectos} = stateContext;

	//State del context de alertas
	const alertasContext = useContext(AlertasContext);
	const {alerta, mostrarAlerta} = alertasContext;

	useEffect(() => {
		if (mensaje) {
			mostrarAlerta(mensaje.msg, mensaje.categoria);
		}

		obtenerProyectos();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [mensaje]);

	if (proyectos.length === 0)
		return <p>No tiene nigun proyecto, comience creando uno!</p>;
	return (
		<ul className="listado-proyectos">
			{alerta ? (
				<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
			) : null}
			<TransitionGroup>
				{proyectos.map((p) => (
					<CSSTransition key={p._id} timeout={200} classNames="tarea">
						<Proyecto proyecto={p} />
					</CSSTransition>
				))}
			</TransitionGroup>
		</ul>
	);
};

export default ListadoProyectos;
