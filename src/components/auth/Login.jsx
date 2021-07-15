import React, {useContext, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import alertaContext from "../../context/alertas/alertasContext";
import AuthContext from "../../context/autenticacion/authContext";

const Login = (props) => {
	//state para iniciar Sesion
	const [user, addUser] = useState({
		email: "",
		password: "",
	});

	//Obtener variables
	const {email, password} = user;

	//State context de alertas
	const stateContext = useContext(alertaContext);
	const {mostrarAlerta, alerta} = stateContext;

	//State context autenticacion
	const authContext = useContext(AuthContext);
	const {iniciarSesion, mensaje, autenticado} = authContext;

	//Queda pendiente de que cambien las variables
	useEffect(() => {
		//Verifico si esta autenticado
		if (autenticado) {
			props.history.push("/proyectos");
		}

		//Verifico si hay mensaje de error del servidor
		if (mensaje) {
			mostrarAlerta(mensaje.msg, mensaje.categoria);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [mensaje, autenticado, props.history]);

	//Handle para los cambios en los campos del formulario
	const onChange = (e) => {
		addUser({
			...user,
			[e.target.name]: e.target.value,
		});
	};

	const onSubmit = (e) => {
		e.preventDefault();

		//Valido datos formulario
		if (email.trim() === "" || password.trim() === "") {
			mostrarAlerta("Todos los campos son obligatorios", "alerta-error");
			return;
		}

		//Envio datos de formulario para iniciar sesion
		iniciarSesion(user);
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
						<input
							type="submit"
							className="btn btn-primario btn-block"
							value="Iniciar Sesion"
						/>
					</div>
				</form>

				<Link to="/nueva_cuenta" className="enlace-cuenta">
					Obtener Cuenta
				</Link>
			</div>
		</div>
	);
};

export default Login;
