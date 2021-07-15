import React, {useContext} from "react";
import tareaContext from "../../context/tareas/tareaContext";
import proyectoContext from "../../context/proyectos/proyectoContext";

const Tarea = ({tarea}) => {
	//State context de tarea
	const proyectocontext = useContext(proyectoContext);
	const {proyecto} = proyectocontext;

	//Extraer proyecto
	const [proyectoActual] = proyecto;

	//State context de tarea
	const stateContext = useContext(tareaContext);
	const {
		eliminarTarea,
		obtenerTareas,
		actualizarTarea,
		obtenerTareaActual,
		tareaactual,
	} = stateContext;

	//Elimino el boton de eliminar si hay alguna tarea para editar
	let mostrarBoton = true;
	if (tareaactual) {
		if (tareaactual._id === tarea._id) mostrarBoton = false;
	}

	//funcion para eliminar tarea
	const onClickEliminar = (id) => {
		eliminarTarea(id);
		obtenerTareas(proyectoActual._id);
	};

	//Cambio estado de la tarea
	const onClickEstado = (tarea) => {
		if (tarea.estado) {
			tarea.estado = false;
		} else {
			tarea.estado = true;
		}

		actualizarTarea(tarea);
	};

	//Obtengo tarea a modidifica
	const onClickModificar = (tarea) => {
		obtenerTareaActual(tarea);
	};

	return (
		<li className="tarea sombre">
			<p>{tarea.nombre}</p>
			<div className="estado">
				{tarea.estado ? (
					<button
						type="button"
						className="completo"
						onClick={() => onClickEstado(tarea)}
					>
						Completo
					</button>
				) : (
					<button
						type="button"
						className="incompleto"
						onClick={() => onClickEstado(tarea)}
					>
						Incompleto
					</button>
				)}
			</div>

			<div className="acciones">
				<button
					type="button"
					className="btn btn-primario"
					onClick={() => onClickModificar(tarea)}
				>
					Editar
				</button>
				{mostrarBoton ? (
					<button
						type="button"
						className="btn btn-secundario"
						onClick={() => onClickEliminar(tarea._id)}
					>
						Eliminar
					</button>
				) : null}
			</div>
		</li>
	);
};

export default Tarea;
