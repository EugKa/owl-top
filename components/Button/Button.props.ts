
import { ButtonHTMLAttributes, ReactNode, DetailedHTMLProps } from "react";

export interface ButtonProps
    extends Omit<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, 
    'onAnimationStart' | 'onDragStart' | 'onDragEnd' | 'onDrag' | 'ref'> 
{
    children: ReactNode;
    appearance: 'primary' | 'ghost';
    arrow?: 'right' | 'down' | 'none';
}