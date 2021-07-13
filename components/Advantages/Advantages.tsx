import React from 'react';
import { AdvantagesProps } from './Advantages.props';
import styles from './Advantages.module.css';
import CheckIcon from './icons/check.svg';

export const Advantages = ({ advantages }: AdvantagesProps): JSX.Element => {
    return (
        <>
            {advantages.map(item => (
                <div key={item._id} className={styles.advantage}>
                    <CheckIcon/>
                    <div className={styles.title}>{item.title}</div>
                    <hr className={styles.vline}/>
                    <div>{item.description}</div>
                </div>
            ))}
        </>
    );
};