import React, { useEffect, useState } from 'react';
import { SidebartProps } from './Sidebar.props';
import cn from 'classnames';
import styles from './Sidebar.module.css';

export const Sidebar = ({ ...props }: SidebartProps): JSX.Element => {
    
    return (
        <div {...props}> 
           Sidebar
        </div>
    );
};
