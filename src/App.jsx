import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Proyectos from "./components/proyectos/Proyectos";
import Login from "./components/auth/Login";
import NuevaCuenta from "./components/auth/NuevaCuenta";
import ProyectoState from "./context/proyectos/proyectoState";
import TareaState from "./context/tareas/tareaState";
import AlertasState from "./context/alertas/alertasState";
import AuthState from "./context/autenticacion/authState";
import tokenAuth from "./config/token";
import RutaPrivada from "./components/rutas/RutaPrivada";

//Envio header al clienteaxios
const token = localStorage.getItem("token");
if (token) {
	tokenAuth(token);
}

function App() {
	return (
		<ProyectoState>
			<TareaState>
				<AlertasState>
					<AuthState>
						<Router>
							<Switch>
								<Route exact path="/" component={Login} />
								<Route exact path="/nueva_cuenta" component={NuevaCuenta} />
								<RutaPrivada exact path="/proyectos" component={Proyectos} />
							</Switch>
						</Router>
					</AuthState>
				</AlertasState>
			</TareaState>
		</ProyectoState>
	);
}

export default App;
