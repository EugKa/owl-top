import React, { ForwardedRef, forwardRef, useRef, useState } from 'react';
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
import { motion } from 'framer-motion';

export const Product = motion(forwardRef(({ product, className, ...props }: ProductProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
    const [isReviewOpened, setIsReviewOpened] = useState<boolean>(false);
    const reviewRef = useRef<HTMLDivElement>(null);

    const variants = {
        visible: { opacity: 1, height: 'auto' },
        hidden: { opacity: 0, height: 0 }
    };

    const scrollToReview = () => {
        setIsReviewOpened(true);
        reviewRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        reviewRef.current?.focus();
    };

    const renderReview = () => {
        return <>
            {product.reviews.map(item => {
                    return (
                        <div key={item._id}> 
                            <Review review={item}/>
                            <Divider/>
                        </div>
                    );
                })}
        </>;
    };
    
    return (
        <div className={className} {...props} ref={ref}>
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
                    <span className={styles.month}>??????</span>
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
                <div className={styles.priceTitle}>????????</div>          
                <div className={styles.creditTitle}>????????????</div>          
                <div className={styles.rateTitle}>
                    <a href="#ref" onClick={scrollToReview} className={styles.rateLink}>
                        {product.reviewCount}{" "}
                        {declOfNum(product.reviewCount, ['??????????', '????????????', '????????????????'])}    
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
                        <div className={styles.advTitle}>????????????????????????</div>
                        <div>{product.advantages}</div>
                    </div>}
                    {product.disadvantages && <div className={styles.disadvantages}>
                        <div className={styles.advTitle}>????????????????????</div>
                        <div>{product.disadvantages}</div>
                    </div>}
                </div>
                <Divider className={cn(styles.hr, styles.hr2)}/>
                <div className={styles.actions}>
                    <Button appearance="primary">???????????? ????????????????????</Button>
                    <Button 
                        appearance="ghost" 
                        arrow={isReviewOpened ? 'down' : 'right'} 
                        className={styles.reviewButton}
                        onClick={() =>setIsReviewOpened(!isReviewOpened)}
                    >
                        ???????????? ????????????
                    </Button>
                </div>    
            </Card>
            <motion.div 
                variants={variants} initial="hidden" 
                animate={isReviewOpened ? 'visible' : 'hidden'}
            >
                <Card 
                    color="blue" 
                    className={styles.reviews}
                    ref={reviewRef}
                    tabIndex={isReviewOpened ? 0 : -1}
                >
                    {product.reviews.length === 0 ? <div>?????????????? ??????</div> : renderReview()}
                    <ReviewForm productId={product._id} isOpend={isReviewOpened}/>
                </Card>
            </motion.div> 
        </div>
        
    );
}));
