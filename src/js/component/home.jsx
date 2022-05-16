import React from "react";
import { useState, useEffect } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";
import { Tarea } from "./tarea.jsx";
const API_URL = "https://assets.breatheco.de/apis/fake/todos/user/usuarioluis";

//create your first component
const Home = () => {
	const [inputValue, setInputValue] = useState("");
	const [tareas, setTareas] = useState([]);

	const obtenerTareas = async () => {
		const response = await fetch(API_URL);
		if (response.ok) {
			const body = await response.json();
			/* setTareas(body); */
		}
	};

	useEffect(() => {
		obtenerTareas();
	}, []);

	useEffect(() => {
		console.log(tareas);
		let objTemp = {};
		let arrayTemp = [];
		for (let i = 0; i < tareas.length; i = i + 1) {
			objTemp = {};
			objTemp = {
				label: tareas[i],
				done: false,
			};
			arrayTemp.push(objTemp);
		}
		fetch(API_URL, {
			method: "PUT",
			body: JSON.stringify(arrayTemp),
			headers: { "Content-Type": "application/json" },
		})
			.then((response) => response.json())
			.then((data) => console.log(data));
	}, [tareas]);

	return (
		<>
			<div className="row">
				<div className="col-4"></div>
				<div className="card col-4">
					<div className="card-header row d-flex">
						<div className="col-4 flex-colunm"></div>
						<div className="col-4 d-flex flex-row justify-content-around align-items-center">
							<input
								className="mx-2"
								type="text"
								/* onChange={(e) => setInputValue(e.target.value)} */
								onKeyPress={async (e) => {
									if (e.key == "Enter") {
										console.log(e.target.value);
										await setTareas((prev) => [
											...prev,
											e.target.value,
										]);
									}
								}}
							/>
							<button
								className="btn btn-danger"
								onClick={() => {
									setTareas([]);
									fetch(API_URL, {
										method: "DELETE",
										body: JSON.stringify([]),
										headers: {
											"Content-Type": "application/json",
										},
									})
										.then((response) => response.json())
										.then((data) => console.log(data));
								}}>
								eliminar
							</button>
						</div>
					</div>
					<button
						className="btn btn-success"
						onClick={() => {
							setTareas([]);
							fetch(API_URL, {
								method: "POST",
								body: JSON.stringify([]),
								headers: {
									"Content-Type": "application/json",
								},
							})
								.then((response) => response.json())
								.then((data) => console.log(data));
						}}>
						crear usuario
					</button>
					<div className="row">
						<div className="col-2 flex-colunm"></div>
						<ul className="col-8 list-group list-group-flush">
							{tareas.map((tarea, index) => {
								return (
									<li
										className=" list-group-item "
										key={index}>
										<Tarea
											nuevaTarea={tarea}
											posicion={index}
											quitarTarea={(removertarea) =>
												setTareas(
													tareas.filter(
														(tarea, index) =>
															index !=
															removertarea
													)
												)
											}
										/>
									</li>
								);
							})}
						</ul>
						<div className="col-2 flex-colunm"></div>

						<h1 className="itemleft">{`${tareas.length} Tareas pendientes`}</h1>
					</div>
				</div>
				<div className="col-4"></div>
			</div>
		</>
	);
};

export default Home;
