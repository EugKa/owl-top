import React, { useState } from 'react';
import { SearchProps } from './Search.props';
import cn from 'classnames';
import styles from './Search.module.css';
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';
import SearchIcon from './icons/glass.svg';
import { useRouter } from 'next/dist/client/router';

export const Search = ({ className, ...props }: SearchProps): JSX.Element => {
    const [search, setSearch] = useState('');
    const router = useRouter();

    const handleSearch = () => {
        router.push({
            pathname: '/search',
            query: {
                q: search
            }
        });
    };

    const handleKeyDown = (e: KeyboardEvent) => {
        if(e.key == 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className={cn(className, styles.search)} {...props}>
            <Input
                className={styles.input}
                placeholder="Поиск..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <Button
                appearance="primary"
                className={styles.button}
                onClick={handleSearch}
                onKeyDown={handleKeyDown}
            >
                <SearchIcon/>
            </Button>
        </div>
    );
};
