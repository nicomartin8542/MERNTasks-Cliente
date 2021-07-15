import React, {useContext, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import alertaContext from "../../context/alertas/alertasContext";
import AuthContext from "../../context/autenticacion/authContext";

const NuevaCuenta = (props) => {
	//state para iniciar Sesion
	const [user, addUser] = useState({
		nombre: "",
		email: "",
		password: "",
		confirmar: "",
	});

	//Obtener variables
	const {email, password, nombre, confirmar} = user;

	//State context de alertas
	const stateContext = useContext(alertaContext);
	const {mostrarAlerta, alerta} = stateContext;

	//State context autenticacion
	const authContext = useContext(AuthContext);
	const {registrarUsuario, mensaje, autenticado} = authContext;

	//Queda pendiente si se produce un cambio en la variables
	useEffect(() => {
		//Si esta autenticado envio a pantalla proyectos
		if (autenticado) {
			props.history.push("/proyectos");
		}

		//Si hay algun mensaje, muestro alerta
		if (mensaje) {
			mostrarAlerta(mensaje.msg, mensaje.categoria);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [mensaje, autenticado, props.history]);

	const onChange = (e) => {
		addUser({
			...user,
			[e.target.name]: e.target.value,
		});
	};

	const onSubmit = (e) => {
		e.preventDefault();

		//Valido que todos los campos tengan datos
		if (
			nombre.trim() === "" ||
			email.trim() === "" ||
			password.trim() === "" ||
			confirmar.trim() === ""
		) {
			mostrarAlerta("Todos los campos son obligatorios", "alerta-error");
			return;
		}

		//Valido que la password tenga minimo 6 caracteres
		if (password.length < 6) {
			mostrarAlerta(
				"La contraseña debe tener minino 6 caracteres",
				"alerta-error",
			);
			return;
		}

		//Valido que las password sean iguales
		if (password !== confirmar) {
			mostrarAlerta("Las contraseñas no coinciden", "alerta-error");
			return;
		}

		//Registro usuario
		registrarUsuario({
			nombre,
			password,
			email,
		});
	};
	return (
		<div className="form-usuario">
			{alerta ? (
				<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
			) : null}
			<div className="contenedor-form sombra-dark">
				<h1>Iniciar Sesion</h1>
				<form onSubmit={onSubmit}>
					<div className="campo-form">
						<label htmlFor="nombre">Nombre</label>
						<input
							type="text"
							id="nombre"
							name="nombre"
							placeholder="Ingresa tu nombre"
							onChange={onChange}
							value={nombre}
						/>
					</div>

					<div className="campo-form">
						<label htmlFor="email">Email</label>
						<input
							type="email"
							id="email"
							name="email"
							placeholder="Tu email"
							onChange={onChange}
							value={email}
						/>
					</div>

					<div className="campo-form">
						<label htmlFor="password">Password</label>
						<input
							type="password"
							id="password"
							name="password"
							placeholder="Tu password"
							onChange={onChange}
							value={password}
						/>
					</div>

					<div className="campo-form">
						<label htmlFor="password">Confirnar Password</label>
						<input
							type="password"
							id="confirmar"
							name="confirmar"
							placeholder="Confirma tu password"
							onChange={onChange}
							value={confirmar}
						/>
					</div>

					<div className="campo-form">
						<input
							type="submit"
							className="btn btn-primario btn-block"
							value="Registrarme"
						/>
					</div>
				</form>

				<Link to="/" className="enlace-cuenta">
					Log in
				</Link>
			</div>
		</div>
	);
};

export default NuevaCuenta;
