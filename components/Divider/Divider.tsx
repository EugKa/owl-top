import React from 'react';
import { DividerhProps } from './Divider.props';
import cn from 'classnames';
import styles from './Divider.module.css';

export const Divider = ({ className, ...props }: DividerhProps): JSX.Element => {
    return (
        <hr className={cn(className, styles.hr)} {...props}/>
    );
};
