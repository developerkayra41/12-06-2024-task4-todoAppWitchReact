import React, { useState } from 'react'
import { createGlobalStyle } from 'styled-components'
import GlobalStyle from '../styles/GlobalStyle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPencil, faXmark } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

interface Todo {
    id: number;
    text: string;
    completed: string;
    isDone: boolean;
}

interface TodoTableProps {
    todos: Todo[];
    filter: string;
    onTodoUpdate: (updatedTodos: Todo[]) => void;
}

const TodoTable: React.FC<TodoTableProps> = ({ todos, filter, onTodoUpdate }) => {
    const [inputValue, setInputValue] = useState<string>('');

    const TodoTableStyle = createGlobalStyle`
        .table-outside {
            height: 20rem;
            overflow: auto;
            border: 1px solid black;
            padding: 1rem;
            border-radius: 15px;
            margin-bottom: 1rem;
        }

        .table-todo {
            width: 100%;
            text-align: left;
            font-family: "Manrope", sans-serif;
            font-size: 1.5rem;
        }

        .table-todo,
        td,
        th {
            border: 2px solid black;
            border-collapse: collapse;
            padding: 0.5rem;
        }

        .done-todo {
            color: #00a80b;
            text-decoration: line-through;
        }

        .icon-list {
            list-style-type: none;
            display: flex;
            justify-content: center;
        }

        .icon-list input {
            width: 1.1rem;
            height: 1.1rem;
        }

        .icon-list li .i {
            transition: 0.1s;
            padding: 0.3rem;
            border-radius: 7px;
        }

        .icon-list li .i:hover {
            cursor: pointer;
            transform: scale(1.2);
        }

        .icon-list li {
            width: 33%;
            text-align: center;
        }

        .icon-list .i-ok {
            color: #00a80b;
        }

        .icon-list .i-edit {
            color: #0045bd;
        }

        .icon-list .i-delete {
            color: #ff0000;
        }

        .icon-list .i-ok:hover {
            color: white;
            background-color: #00a80b;
        }

        .icon-list .i-edit:hover {
            color: white;
            background-color: #0045bd;
        }

        .icon-list .i-delete:hover {
            color: white;
            background-color: #ff0000;
        }
    `;

    const chosoTodo = (id: number) => {
        const storedTodos = localStorage.getItem('todos');
        if (storedTodos) {
            const todos: Todo[] = JSON.parse(storedTodos);
            const updatedTodos = todos.map(todo =>
                todo.id === id ? { ...todo, isDone: !todo.isDone, completed: !todo.isDone ? String(formatDate()) : '' } : todo
            );
            localStorage.setItem('todos', JSON.stringify(updatedTodos));
            onTodoUpdate(updatedTodos);  // state'i güncelle

            const todo = todos.find(todo => todo.id === id);
            if (todo && !todo.isDone) {
                Swal.fire({
                    title: 'Görev Tamamlandı!',
                    text: `${todo.text} görevi tamamlandı.`,
                    icon: 'success',
                });
            }
        }
    };

    const filterTodos = (todos: Todo[], filter: string) => {
        const parseDate = (dateString: string) => {
            if (!dateString) return new Date(0); // Tarih yoksa çok eski bir tarih döner
            const [day, month, yearAndTime] = dateString.split('/');
            const [year, time] = yearAndTime.split(' ');
            return new Date(`${year}-${month}-${day}T${time}`);
        };

        switch (filter) {
            case 'op_completed':
                return todos.filter(todo => todo.isDone);
            case 'op_incompletes':
                return todos.filter(todo => !todo.isDone);
            case 'op_new_to_old':
                return todos.filter(todo => todo.isDone).sort((a, b) => parseDate(b.completed).getTime() - parseDate(a.completed).getTime());
            case 'op_old_to_new':
                return todos.filter(todo => todo.isDone).sort((a, b) => parseDate(a.completed).getTime() - parseDate(b.completed).getTime());
            default:
                return todos;
        }
    };

    const filteredTodos = filterTodos(todos, filter);

    function formatDate() {
        const now = new Date();

        const day = now.getDate().toString().padStart(2, '0');
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const year = now.getFullYear();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');

        const formattedDateTime = `${day}/${month}/${year} ${hours}:${minutes}`;
        return formattedDateTime;
    }

    const updateTodo = (id: number) => {
        const storedTodos = localStorage.getItem('todos');
        if (storedTodos) {
            showSwal(id, JSON.parse(storedTodos));
        }
    }

    const showSwal = (id: number, todos: Todo[]) => {
        const todo = todos.find(todo => todo.id === id);
        const MySwal = withReactContent(Swal);

        MySwal.fire({
            title: <i>Input something</i>,
            input: 'text',
            inputValue: todo ? todo.text : '',
            preConfirm: () => {
                const newValue = Swal.getInput()?.value || '';
                if (todo) {
                    todo.text = newValue;
                    localStorage.setItem('todos', JSON.stringify(todos));
                    onTodoUpdate(todos);
                }
                setInputValue(newValue);
            },
        });
    }

    const deleteTodo = (id: number) => {
        const storedTodos = localStorage.getItem('todos');
        if (storedTodos) {
            const todos: Todo[] = JSON.parse(storedTodos);
            const updatedTodos = todos.filter(todo => todo.id !== id);
            localStorage.setItem('todos', JSON.stringify(updatedTodos));
            onTodoUpdate(updatedTodos);
        }
    }

    return (
        <>
            <GlobalStyle />
            <TodoTableStyle />
            <div className="table-outside">
                <table className="table-todo">
                    <thead>
                        <tr>
                            <th style={{ width: "60%" }}>Todo Name</th>
                            <th style={{ width: "20%" }}>Date Completed</th>
                            <th style={{ width: "20%" }}>Utilities</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTodos.map(todo => (
                            <tr key={todo.id}>
                                <td className={todo.isDone ? 'done-todo' : ''}>{todo.text}</td>
                                <td>{todo.completed}</td>
                                <td>
                                    <ul className="icon-list">
                                        <li><FontAwesomeIcon icon={faCheck} className='i i-ok' onClick={() => chosoTodo(todo.id)} /></li>
                                        <li><FontAwesomeIcon icon={faPencil} className='i i-edit' onClick={() => updateTodo(todo.id)} /></li>
                                        <li><FontAwesomeIcon icon={faXmark} className='i i-delete' onClick={() => deleteTodo(todo.id)} /></li>
                                    </ul>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default TodoTable;
