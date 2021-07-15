import React, {useContext, useEffect, useState} from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";
import tareasContext from "../../context/tareas/tareaContext";

const FormTarea = () => {
	//State del context de proyectos
	const stateContext = useContext(proyectoContext);
	const {proyecto} = stateContext;

	//State del context de tareas
	const tareaContext = useContext(tareasContext);
	const {
		tareaactual,
		agregarTareas,
		obtenerTareas,
		validarTarea,
		errortarea,
		actualizarTarea,
	} = tareaContext;

	//State del formulario
	const [tarea, agregarTarea] = useState({
		nombre: "",
	});

	//Verifico si di a moficiar una tarea
	useEffect(() => {
		if (tareaactual) {
			agregarTarea(tareaactual);
		} else {
			agregarTarea({
				nombre: "",
			});
		}
	}, [tareaactual]);

	//Si no selecciono un proyecto mostrar null
	if (!proyecto) return null;

	//Dystruncturie de tareas
	const {nombre} = tarea;

	//Dystructurie del array del proyecto
	const [proyectoActual] = proyecto;

	//Guardo datos del formulario en el state
	const handleChange = (e) => {
		agregarTarea({
			...tarea,
			[e.target.name]: e.target.value,
		});
	};

	//Submit form agregar tareas
	const onSubmitTareas = (e) => {
		e.preventDefault();

		//Valido campos del formulario
		if (nombre.trim() === "") {
			validarTarea();
			return;
		}

		if (tareaactual === null) {
			//Agrego tarea al array
			tarea.proyecto = proyectoActual._id;
			agregarTareas(tarea);
		} else {
			//ACtualizar tarea existente
			tareaactual.nombre = tarea.nombre;
			actualizarTarea(tareaactual);
		}

		//Actualizo listado de tareas
		obtenerTareas(proyectoActual._id);

		//Limpio formulario
		agregarTarea({
			nombre: "",
		});
	};

	return (
		<div className="formulario">
			<form action="" onSubmit={onSubmitTareas}>
				<div className="contenedor-input">
					<input
						type="text"
						className="input-text"
						placeholder="Nombre Tarea"
						name="nombre"
						value={nombre}
						onChange={handleChange}
					/>
				</div>

				<div className="contenedor-input">
					<input
						type="submit"
						className="btn btn-primario btn-submit btn-block"
						value={tareaactual ? "Modificar Tarea" : "Agregar Tarea"}
					/>
				</div>
			</form>
			{errortarea ? (
				<p className="mensaje error">El campo nombre es olbigatorio</p>
			) : null}
		</div>
	);
};

export default FormTarea;
