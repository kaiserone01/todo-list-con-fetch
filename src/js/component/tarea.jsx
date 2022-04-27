import React from "react";

import PropTypes from "prop-types";

export const Tarea = (props) => {
	return (
		<div className=" d-flex flex-row justify-content-around align-items-center">
			<h1>{props.nuevaTarea}</h1>
			<div onClick={() => props.quitarTarea(props.posicion)}>
				<i className="fa-solid fa-xmark"></i>
			</div>
		</div>
	);
};

Tarea.propTypes = {
	nuevaTarea: PropTypes.string,
	quitarTarea: PropTypes.func,
	posicion: PropTypes.number,
};
