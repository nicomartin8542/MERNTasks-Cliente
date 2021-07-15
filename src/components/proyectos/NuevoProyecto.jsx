import React, {Fragment, useContext, useState} from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";

const NuevoProyecto = () => {
	//State para proyectos
	const [proyecto, addProyecto] = useState({
		nombre: "",
	});

	//Uso useContext para trabajar con los states
	const stateContext = useContext(proyectoContext);

	//Extraigo valores del stateContext
	const {
		formulario,
		errorformulario,
		mostrarFormulario,
		addProyectos,
		mostrarError,
	} = stateContext;

	//Extraer nombre de poryecto
	const {nombre} = proyecto;

	const onChange = (e) => {
		addProyecto({
			...proyecto,
			[e.target.name]: e.target.value,
		});
	};

	const onSubmit = (e) => {
		e.preventDefault();

		//Valido form
		if (nombre === "") {
			mostrarError();
			return;
		}

		//Agrego porecto por context
		addProyectos(proyecto);

		//Limpio formulario
		addProyecto({
			nombre: "",
		});
	};

	const onClickFormulario = () => {
		mostrarFormulario();
	};

	return (
		<Fragment>
			<button
				type="button"
				className="btn btn-block btn-primario"
				onClick={onClickFormulario}
			>
				Nuevo proyecto
			</button>

			{formulario ? (
				<form onSubmit={onSubmit} className="formulario-nuevo-proyecto">
					<input
						type="text"
						className="input-text"
						placeholder="Nombre Proyecto"
						name="nombre"
						value={nombre}
						onChange={onChange}
					/>

					<input
						type="submit"
						className="btn btn-primario btn-block"
						value="Agregar Proyecto"
					/>
				</form>
			) : null}

			{errorformulario ? (
				<p className="mensaje error">El nombre del proyecto es olbigatorio</p>
			) : null}
		</Fragment>
	);
};

export default NuevoProyecto;
