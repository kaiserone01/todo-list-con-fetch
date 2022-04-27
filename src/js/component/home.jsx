import React from "react";
import { useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";
import { Tarea } from "./tarea.jsx";

//create your first component
const Home = () => {
	const [inputValue, setInputValue] = useState("");
	const [tareas, setTareas] = useState([]);

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
								onChange={(e) => setInputValue(e.target.value)}
								onKeyPress={(e) => {
									if (e.key == "Enter") {
										console.log(e.target.value);
										setTareas((prev) => [
											...prev,
											inputValue,
										]);
										console.log(tareas);
									}
								}}
							/>
							<button
								className="btn btn-danger"
								onClick={() => {
									setTareas([]);
								}}>
								eliminar
							</button>
						</div>
					</div>
					<div className="row">
						<div className="col-2 flex-colunm"></div>
						<ul className="col-8 list-group list-group-flush">
							{tareas.map((tarea, index) => {
								return (
									<li className=" list-group-item ">
										<Tarea
											nuevaTarea={tarea}
											key={index}
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
