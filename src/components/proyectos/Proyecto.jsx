import React, {useContext} from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";
import tareasContext from "../../context/tareas/tareaContext";

const Proyecto = ({proyecto}) => {
	//State del context para el proyecto actual
	const stateContext = useContext(proyectoContext);
	const {obtenerProyecto} = stateContext;

	//State del context para las tareas
	const stateTareas = useContext(tareasContext);
	const {obtenerTareas} = stateTareas;

	const seleccionarProyecto = (id) => {
		obtenerProyecto(id);
		obtenerTareas(id);
	};

	return (
		<li>
			<button
				type="button"
				className="btn btn-blank"
				onClick={() => seleccionarProyecto(proyecto._id)}
			>
				{proyecto.nombre}
			</button>
		</li>
	);
};

export default Proyecto;
