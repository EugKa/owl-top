import React, { useEffect, useState } from 'react';
import { HeaderProps } from './Header.props';
import cn from 'classnames';
import styles from './Header.module.css';

export const Header = ({ ...props }: HeaderProps): JSX.Element => {
    
    return (
        <header {...props}> 
           Header
        </header>
    );
};
