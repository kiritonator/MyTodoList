'use client';

import { FilterType } from '../todo';
import styles from './TodoFilter.module.css';

interface TodoFilterProps {
    currentFilter: FilterType;
    onFilterChange: (filter: FilterType) => void;
}

const filterOptions: { value: FilterType; label: string }[] = [
    { value: 'all', label: 'Все' },
    { value: 'active', label: 'Активные' },
    { value: 'completed', label: 'Выполненные' }
];

export default function TodoFilter({ currentFilter, onFilterChange }: TodoFilterProps) {
    return (
        <div className={styles.container}>
            {filterOptions.map((option) => (
                <button
                    key={option.value}
                    onClick={() => onFilterChange(option.value)}
                    className={`${styles.knopka} ${currentFilter === option.value ? styles.active : ''}`}
                >
                    {option.label}
                </button>
            ))}
        </div>
    );
}