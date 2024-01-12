import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

import React, { useEffect, useState } from "react";
import "./index.css";

const initialState = JSON.parse(localStorage.getItem("todos")) || [
	{ id: 1, text: "aprender React" },
	{ id: 2, text: "aprender Javascript" },
	{ id: 3, text: "aprender Vue" },
];
const App = () => {
	const [todos, setTodos] = useState(initialState);

	useEffect(() => {
		localStorage.setItem("todos", JSON.stringify(todos));
	}, [todos]);

	const handleDragEnd = (result) => {
		if (!result.destination) return;
		const startIndex = result.source.index;
		const endIndex = result.destination.index;

		const copyArray = [...todos];
		const [reorderItem] = copyArray.splice(startIndex, 1);
		copyArray.splice(endIndex, 0, reorderItem);
		setTodos(copyArray);
	};

	return (
		<>
			<DragDropContext onDragEnd={handleDragEnd}>
				<h1>Lista de Tareas</h1>
				<Droppable droppableId="todos">
					{(dropableProvider) => (
						<ul
							ref={dropableProvider.innerRef}
							{...dropableProvider.droppableProps}>
							{todos.map((todo, index) => (
								<Draggable
									index={index}
									key={todo.id}
									draggableId={`${todo.id}`}>
									{(draggableProvider) => (
										<li
											ref={draggableProvider.innerRef}
											{...draggableProvider.dragHandleProps}
											{...draggableProvider.draggableProps}>
											{todo.text}
										</li>
									)}
								</Draggable>
							))}
							{dropableProvider.placeholder}
						</ul>
					)}
				</Droppable>
			</DragDropContext>
		</>
	);
};

export default App;
