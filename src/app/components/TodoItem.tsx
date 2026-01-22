'use client';

import { Todo } from '../todo';
import styles from './TodoItem.module.css'

interface TodoItemProps {
    todo: Todo;
    onSwitchstatus: (id: number | string) => void;
    onDelete: (id: number | string) => void;
}

export default function TodoItem(props: TodoItemProps) {
    const todo = props.todo;
    const onSwitchstatus = props.onSwitchstatus;
    const onDelete = props.onDelete;

    return (
        <div className={styles.container}>
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => onSwitchstatus(todo.id)}
                className={styles.checkbox}
            />
            <span className={`${styles.done} ${todo.completed ? styles.active : ''}`}>
        {todo.title}
      </span>
            <button
                onClick={() => onDelete(todo.id)}
                className={styles.deleteButton}
            >
                Удалить
            </button>
        </div>
    );
}