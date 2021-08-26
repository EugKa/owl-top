import React, { useEffect, useState, KeyboardEvent, forwardRef, ForwardedRef, useRef } from 'react';
import { RatingProps } from './Rating.props';
import cn from 'classnames';
import StarIcon from './star.svg';
import styles from './Rating.module.css';

export const Rating = forwardRef(({ 
    rating,
    setRating,
    isEditable = false,
    error,
    tabIndex,
    ...props
    }: RatingProps,
    ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
    const [ratingArray, setRatingArray] = useState<JSX.Element[]>(new Array(5).fill(<></>));
    const ratingArrayRef = useRef<(HTMLSpanElement | null)[]>([]);


    useEffect(()=> {
        construnctRating(rating);
    },[rating, tabIndex]);

    const computeFocus = (rate: number, i: number): number => {
        if(!isEditable) {
            return -1;
        }

        if(!rating && i == 0) {
            return tabIndex ?? 0;
        }

        if(rate == i + 1) {
            return tabIndex ?? 0;
        }
        return - 1;
    };

    const changeDisplayHandler = (i: number) => {
        if(!isEditable) return;
        construnctRating(i);
    };

    const handleClick = (i: number) => {
        if(!isEditable || !setRating) return;
        setRating(i);
    };

    

    const handleKey = (e: KeyboardEvent) => {
		if (!isEditable || !setRating) {
			return;
		}
		if (e.code == 'ArrowRight' || e.code == 'ArrowUp') {
			if (!rating) {
				setRating(1);
			} else {
				e.preventDefault();
				setRating(rating < 5 ? rating + 1 : 5);
			}
            ratingArrayRef.current[rating]?.focus();
		}
		if (e.code == 'ArrowLeft' || e.code == 'ArrowDown') {
			e.preventDefault();
			setRating(rating > 1 ? rating - 1 : 1);
            ratingArrayRef.current[rating - 2]?.focus();
		}
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
                    tabIndex={computeFocus(rating, i)}
                    onKeyDown={handleKey}
                    ref={r => ratingArrayRef.current?.push(r)}
                >
                    <StarIcon/>
                </span>
            );
        });
        setRatingArray(updateArray);
    };
    return (
        <div {...props} ref={ref} className={cn(styles.ratingWrapper, {
            [styles.error]: error
        })}> 
            {ratingArray.map((item, idx) => (<span key={idx}>{item}</span>))}
            {error && <span className={styles.errorMessage}>{error.message}</span>}
        </div>
    );
});
