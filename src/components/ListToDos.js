import { React, Fragment, useState, useEffect } from "react";
import EditToDo from "./EditToDo";

//to capture response from backend ie. returning all perntodo table results 

//to return these results

const ListToDos = () => {

    const [todos, setTodos] = useState([]);

    const getTodos = async () => {
        try {
            const response = await fetch("http://localhost:5000/todos");
            const jsonData = await response.json();
            setTodos(jsonData);
        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        getTodos()
    }, [])

    const deleteTodo = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/todos/${id}`, {
                method: "DELETE"
            });
            console.log(response);
            // getTodos();
            setTodos(todos.filter(todo => todo.todo_id !== id))
        } catch (error) {
            console.error(error.message)
        }
    }

    return (
        <Fragment>
            <table className="table mt-5 text-center" >
                <thead>
                    <tr>
                        <th>Description </th>
                        <th> Edit </th>
                        <th> Delete </th>
                    </tr>
                </thead>
                <tbody>
                    {/* /* <tr>
                <td>John</td>
                <td>Doe</t>
                <td>john@example.com</td>
                                </tr> */}
                    {todos.map(todo => (<Fragment>
                        <tr key={todo.todo_id}>
                            <td>{todo.description} </td>
                            <td>
                                <EditToDo todo={todo} />
                            </td>
                            <td>
                                <button className="btn btn-danger" onClick={() => deleteTodo(todo.todo_id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    </ Fragment>))}
                </tbody>
            </table>
        </Fragment >
    )
}

export default ListToDos;

