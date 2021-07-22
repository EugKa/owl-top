import React, { useRef, useState } from 'react';
import { ProductProps } from './Product.props';
import cn from 'classnames';
import styles from './Product.module.css';
import { Card } from '../Card/Card';
import { Rating } from '../Rating/Rating';
import { Tag } from '../Tag/Tag';
import { Button } from '../Button/Button';
import { priceRu, declOfNum } from '../../utils/helpers';
import { Divider } from '../Divider/Divider';
import Image from 'next/image';
import { Review } from "../Review/Review";
import { ReviewForm } from '../ReviewForm/ReviewForm';
export const Product = ({ product, className, ...props }: ProductProps): JSX.Element => {
    const [isReviewOpened, setIsReviewOpened] = useState<boolean>(false);
    const reviewRef = useRef<HTMLDivElement>(null);

    const scrollToReview = () => {

        setIsReviewOpened(true);
        reviewRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    };

    const renderReview = () => {
        return <>
            {product.reviews.map(item => {
                    return (
                        <div key={item._id}> 
                            <Review className='f' review={item}/>
                            <Divider/>
                        </div>
                    );
                })}
        </>;
    };
    
    return (
        <div className={className} {...props}>
            <Card className={styles.product}>
                <div className={styles.logo}>
                    <Image 
                        src={process.env.NEXT_PUBLIC_DOMAIN + product.image}
                        alt={product.title}
                        width={70}
                        height={70}
                    />
                </div>
                <div className={styles.title}>{product.title}</div>
                <div className={styles.price}>
                    {priceRu(product.price)}
                    {product.oldPrice && <Tag className={styles.oldPrice} color="green">{priceRu(product.price - product.oldPrice)}</Tag>}
                </div>
                <div className={styles.credit}>
                    {priceRu(product.credit)}/
                    <span className={styles.month}>мес</span>
                </div>
                <div className={styles.rating}>
                    <Rating rating={product.reviewAvg ?? product.initialRating}/>
                </div>
                <div className={styles.tags}>
                    {product.categories.map(item => (
                        <Tag key={item} color="ghost" className={styles.category}>
                            {item}
                        </Tag>
                    ))}
                </div>
                <div className={styles.priceTitle}>цена</div>          
                <div className={styles.creditTitle}>кредит</div>          
                <div className={styles.rateTitle}>
                    <a onClick={scrollToReview} className={styles.rateLink}>
                        {product.reviewCount}{" "}
                        {declOfNum(product.reviewCount, ['отзыв', 'отзыва', 'отзыввов'])}    
                    </a>     
                </div>
                <Divider className={styles.hr}/>      
                <div className={styles.description}>{product.description}</div>          
                <div className={styles.feature}>
                    {product.characteristics.map(item => (
                        <div key={item.name} className={styles.characteristics}>
                            <span className={styles.characteristicsName}>{item.name}</span>
                            <span className={styles.characteristicsDots}></span>
                            <span className={styles.characteristicsValue}>{item.value}</span>
                        </div>
                    ))}
                </div>      
                <div className={styles.advBlock}>
                    {product.advantages &&<div className={styles.advantages}>
                        <div className={styles.advTitle}>Преимущества</div>
                        <div>{product.advantages}</div>
                    </div>}
                    {product.disadvantages && <div className={styles.disadvantages}>
                        <div className={styles.advTitle}>Недостатки</div>
                        <div>{product.disadvantages}</div>
                    </div>}
                </div>
                <Divider className={cn(styles.hr, styles.hr2)}/>
                <div className={styles.actions}>
                    <Button appearance="primary">Узнать подробнеее</Button>
                    <Button 
                        appearance="ghost" 
                        arrow={isReviewOpened ? 'down' : 'right'} 
                        className={styles.reviewButton}
                        onClick={() =>setIsReviewOpened(!isReviewOpened)}
                    >
                        Читать отзывы
                    </Button>
                </div>    
            </Card>
            <Card 
                color="blue" 
                className={cn(styles.reviews, {
                    [styles.opened]: isReviewOpened,
                    [styles.closed]: !isReviewOpened,
                })}
                ref={reviewRef}
            >
                {product.reviews.length === 0 ? <div>Отзывов нет</div> : renderReview()}
                <ReviewForm productId={product._id}/>
            </Card>
        </div>
        
    );
};
