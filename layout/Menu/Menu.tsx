import React, { useContext, useEffect } from 'react';
import cn from 'classnames';
import styles from './Menu.module.css';
import { AppContext } from '../../context/app.context';

export const Menu = (): JSX.Element => {
    const { menu, setMenu, firstCategory } = useContext(AppContext);

    return (
        <div> 
           {menu.map(item => (
                <div key={item._id.secondCategory}>
                    {item._id.secondCategory}
                </div>
            ))}
        </div>
    );
};
