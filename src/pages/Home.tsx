import React, { ChangeEvent, useEffect, useState } from 'react'
import TodoTable from '../components/TodoTable'
import GlobalStyle from '../styles/GlobalStyle'
import { createGlobalStyle } from 'styled-components'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2'


interface Todo {
    id: number;
    text: string;
    completed: string;
    isDone: boolean;
}

const Home: React.FC = () => {
    const HomeStyle = createGlobalStyle`
    .frame {
    border: 2px solid black;
    border-radius: 2rem;
    padding: 0.5rem 1.5rem;
    box-shadow: 3px 3px 0px;
    display: flex;
    flex-direction: column;
}

.filter-area {
    margin-bottom: 1rem;
    padding: 0 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
}


#filter-box {
    font-family: "Manrope", sans-serif;
    font-size: 1.5rem;
    padding: 0.3rem;
    outline: 0;
    border: 1px solid black;
    border-radius: 7px;
}

.input-area {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
}

.input-area input {
    font-family: "Manrope", sans-serif;
    padding: 0.5rem 1rem;
    border: 1px solid black;
    border-radius: 15px;
    font-size: 1.5rem;
    width: 100%;

}

span .i {
    font-size: 2.5rem;
    transition: 0.1s;
    color: #00a80b;
    padding: 0.5rem;
    margin-left: 0.5rem;

}

span .i:hover {
    transform: scale(1.1);
    color: white;
    background-color: #00a80b;
    border-radius: 7px;
    cursor: pointer;
}
    `;

    const [todos, setTodos] = useState<Todo[]>([]);
    const [todoInput, setTodoInput] = useState<string>('');
    const [filter, setFilter] = useState<string>('op_no_filter');

    // todos listesini oluştur
    useEffect(() => {
        const storedTodos = localStorage.getItem("todos");
        if (storedTodos) {
            setTodos(JSON.parse(storedTodos));
        }
        else {
            localStorage.setItem('todos', JSON.stringify([]));
        }
    }, []);

    const handleTodoUpdate = (updatedTodos: Todo[]) => {
        setTodos(updatedTodos);
    };

    const addTodo = (text: string): void => {
        if (text.trim()) {
            const newId = todos.length + 1; // Basit bir ID oluşturma mekanizması
            const newTodo: Todo = { id: newId, text, completed: '', isDone: false };
            const newTodos = [...todos, newTodo];
            setTodos(newTodos);
            localStorage.setItem('todos', JSON.stringify(newTodos));
            setTodoInput(''); // Input'u temizle
            Swal.fire({
                title: "Good job!",
                text: "Added to-do items!",
                icon: "success"
            })
            return;
        }  // Boş todo eklenmesini önle

    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setTodoInput(event.target.value);
    };

    const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setFilter(event.target.value);
    }

    return (
        <>
            <GlobalStyle />
            <HomeStyle />

            <div className="genel-box">
                <div className="frame container">
                    <div>
                        <h1>Todo List</h1>
                    </div>
                    <div className="input-area">

                        <input type="text" placeholder="Add a Todo..." value={todoInput}
                            onChange={handleInputChange} />
                        <span onClick={() => addTodo(todoInput)} >
                            <FontAwesomeIcon icon={faPlus} className='i' />
                        </span>
                    </div>
                    <div className="filter-area">

                        <select id="filter-box" onChange={handleFilterChange}>
                            <option value="op_no_filter">No Filter</option>
                            <option value="op_completed">Completed</option>
                            <option value="op_incompletes">Incompletes</option>
                            <option value="op_new_to_old">New to Old</option>
                            <option value="op_old_to_new">Old to New</option>
                        </select>

                        <div className="first-div">
                            <Link to="/about-us">About Us</Link>
                        </div>

                    </div>
                    <TodoTable todos={todos} onTodoUpdate={handleTodoUpdate} filter={filter} />
                </div>
            </div>
        </>
    )
}

export default Home