import React, {Fragment, useContext} from "react";
import Tarea from "../tareas/Tarea";
import proyectoContext from "../../context/proyectos/proyectoContext";
import tareasContext from "../../context/tareas/tareaContext";
import {CSSTransition, TransitionGroup} from "react-transition-group";

const ListadoTarea = () => {
	//State context para obtner proyectos
	const stateContext = useContext(proyectoContext);
	const {proyecto, eliminarProyecto} = stateContext;

	//State context para tareas
	const tareaContext = useContext(tareasContext);
	const {tareasproyecto} = tareaContext;

	//Si no hay proyecto seleccionado
	if (!proyecto) return <h2>Selecciona un proyecto</h2>;

	//Array destricturing para extraer el proyecto actual
	const [proyectoActual] = proyecto;

	const onClickEliminar = () => {
		eliminarProyecto(proyectoActual._id);
	};

	return (
		<Fragment>
			<h2>Proyecto: {proyectoActual.nombre}</h2>
			<ul className="listado-tareas">
				{tareasproyecto.length === 0 ? (
					<li className="tarea">
						<p>No hay tareas</p>
					</li>
				) : (
					<TransitionGroup>
						{tareasproyecto.map((tarea) => (
							<CSSTransition key={tarea._id} timeout={200} classNames="tarea">
								<Tarea tarea={tarea} />
							</CSSTransition>
						))}
					</TransitionGroup>
				)}
			</ul>

			<button
				type="button"
				className="btn btn-eliminar"
				onClick={onClickEliminar}
			>
				Eliminar proyecto &times;
			</button>
		</Fragment>
	);
};

export default ListadoTarea;
