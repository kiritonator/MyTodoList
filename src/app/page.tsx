import { TodoList } from './components/TodoList';
import { Todo } from './todo';
import styles from './page.module.css';

async function getInitialTodos(): Promise<Todo[]> {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos?_start=0&_limit=5');

    const data = await response.json();

    return data.map((item: any) => ({
        id: item.id,
        title: item.title,
        completed: item.completed
    }));
}

export default async function Home() {
    const initialTodos = await getInitialTodos();

    return (
        <div className={styles.container}>
            <div className={styles.line}>
                <h1 className={styles.text}>Список дел</h1>
                <TodoList initialTodos={initialTodos} />
            </div>
        </div>
    );
}