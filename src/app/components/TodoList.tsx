'use client';

import { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import TodoFilter from './TodoFilter';
import { Todo, FilterType } from '../todo';
import styles from './TodoList.module.css';

interface TodoListProps {
    initialTodos: Todo[];
}

export function TodoList({ initialTodos }: TodoListProps) {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodoTitle, setNewTodoTitle] = useState('');
    const [filter, setFilter] = useState<FilterType>('all');

    useEffect(() => {
        const savedTodos = localStorage.getItem('todos');

        if (savedTodos) {
            const parsedTodos = JSON.parse(savedTodos);
            setTodos(parsedTodos);
        } else {
            setTodos(initialTodos);
        }
    }, [initialTodos]);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const addTodo = () => {

        const newTodo: Todo = {
            id: Date.now(),
            title: newTodoTitle,
            completed: false
        };

        setTodos([...todos, newTodo]);
        setNewTodoTitle('');
    };

    const deleteTodo = (id: number | string) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const switchstatusTodo = (id: number | string) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    const filteredTodos = todos.filter(todo => {
        if (filter === 'active') return !todo.completed;
        if (filter === 'completed') return todo.completed;
        if (filter === 'all') return true;
    });

    const activeCount = todos.filter(todo => !todo.completed).length;

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            addTodo();
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.adding}>
                <input
                    type="text"
                    value={newTodoTitle}
                    onChange={(e) => setNewTodoTitle(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Новая задача"
                    className={styles.addenter}
                />
                <button
                    onClick={addTodo}
                    className={styles.addbutton}
                >
                    Добавить
                </button>
            </div>

            <TodoFilter currentFilter={filter} onFilterChange={setFilter} />

            <div className={styles.list}>
                {filteredTodos.length === 0 ? (
                    <p className={styles.filteroptions}>
                        {filter === 'all' ? 'Нет задач' :
                            filter === 'active' ? 'Нет активных задач' :
                                'Нет выполненных задач'}
                    </p>
                ) : (
                    <div>
                        {filteredTodos.map(todo => (
                            <TodoItem
                                key={todo.id}
                                todo={todo}
                                onSwitchstatus={switchstatusTodo}
                                onDelete={deleteTodo}
                            />
                        ))}
                    </div>
                )}
            </div>

            <div className={styles.count}>
                <div className={styles.leftones}>
                    <span>Осталось: {activeCount}</span>
                </div>
            </div>
        </div>
    );
}