import { DetailedHTMLProps, ReactNode, HTMLAttributes } from "react";

export interface ParagraphProps extends DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement> {
    size?: 'small' | 'medium' | 'large';
    children: ReactNode;
}