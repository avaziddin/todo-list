import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React, { useReducer, useState } from 'react';

const initialState = [];

const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [...state, { id: Date.now(), text: action.payload, completed: false }];
        case 'REMOVE_TODO':
            return state.filter(todo => todo.id !== action.payload);
        case 'TOGGLE_TODO':
            return state.map(todo =>
                todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
            );
        case 'EDIT_TODO':
            return state.map(todo =>
                todo.id === action.payload.id ? { ...todo, text: action.payload.text } : todo
            );
        default:
            return state;
    }
};

const App = () => {
    const [todos, dispatch] = useReducer(reducer, initialState);
    const [inputValue, setInputValue] = useState('');
    const [editId, setEditId] = useState(null);

    const handleAddTodo = () => {
        if (inputValue.trim()) {
            dispatch({ type: 'ADD_TODO', payload: inputValue });
            setInputValue('');
        }
    };

    const handleEditTodo = (id, text) => {
        setInputValue(text);
        setEditId(id);
    };

    const handleUpdateTodo = () => {
        if (inputValue.trim() && editId) {
            dispatch({ type: 'EDIT_TODO', payload: { id: editId, text: inputValue } });
            setInputValue('');
            setEditId(null);
        }
    };

    return (
        <div >
            <h1>Todo List</h1>
            <div className="cant">
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Add a new todo"
                className='input'
            />
            <button onClick={editId ? handleUpdateTodo : handleAddTodo}>
                {editId ? 'Update Todo' : 'Add Todo'}
            </button>
            </div>
            <ul>
                {todos.map(todo => (
                    <div className='uk' key={todo.id} >
                        <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                            {todo.text}
                        </span>
                        <div className='sp'>
                        <button onClick={() => handleEditTodo(todo.id, todo.text)}>Edit</button>
                        <button onClick={() => dispatch({ type: 'REMOVE_TODO', payload: todo.id })}>
                            Delete
                        </button>
                        </div>
                    </div>
                ))}
            </ul>
        </div>
    );
};

export default App;
