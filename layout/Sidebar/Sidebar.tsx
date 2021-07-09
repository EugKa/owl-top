import React, { useEffect, useState } from 'react';
import { SidebartProps } from './Sidebar.props';
import cn from 'classnames';
import styles from './Sidebar.module.css';
import { Menu } from '../Menu/Menu';

export const Sidebar = ({ ...props }: SidebartProps): JSX.Element => {
    
    return (
        <div {...props}> 
           <Menu/>
        </div>
    );
};
