import React, { useEffect, useState, KeyboardEvent } from 'react';
import { RatingProps } from './Rating.props';
import cn from 'classnames';
import StarIcon from './star.svg';
import styles from './Rating.module.css';

export const Rating = ({ 
    className,
    rating,
    setRating,
    isEditable = false,
    ...props
    }: RatingProps): JSX.Element => {
    const [ratingArray, setRatingArray] = useState<JSX.Element[]>(new Array(5).fill(<></>));
    
    useEffect(()=> {
        construnctRating(rating);
    },[rating]);

    const changeDisplayHandler = (i: number) => {
        if(!isEditable) return;
        construnctRating(i);
    };

    const handleClick = (i: number) => {
        if(!isEditable || !setRating) return;
        setRating(i);
    };

    const handleSpace = (i: number, e: KeyboardEvent<SVGAElement>) => {
        if(e.code !== 'Space' || !setRating) return;
        setRating(i);
    };

    const construnctRating = (currentRating: number) => {
        const updateArray = ratingArray.map((r: JSX.Element, i: number) => {
            return (
                <span 
                    className={cn(styles.star, {
                        [styles.filled]: i < currentRating,
                        [styles.editable]: isEditable,
                    })}
                    onMouseEnter={() => changeDisplayHandler(i + 1)}
                    onMouseLeave={() => changeDisplayHandler(rating)}
                    onClick={()=> handleClick(i + 1)}
                >
                    <StarIcon
                        tabIndex={isEditable ? 0 : -1}
                        onKeyDown={(e: KeyboardEvent<SVGAElement>) => isEditable && handleSpace(i + 1, e)}
                    />
                </span>
            );
        });
        setRatingArray(updateArray);
    };
    return (
        <div {...props}> 
            {ratingArray.map((item, idx) => (<span key={idx}>{item}</span>))}
        </div>
    );
};