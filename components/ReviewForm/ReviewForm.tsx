import React, { useState } from 'react';
import { ReviewFormProps } from './ReviewForm.props';
import cn from 'classnames';
import styles from './ReviewForm.module.css';
import { Input } from '../Input/Input';
import { Rating } from '../Rating/Rating';
import { Textarea } from '../Textarea/Textarea';
import { Button } from '../Button/Button';
import CloseIcon from './icons/close.svg';
import { useForm, Controller } from 'react-hook-form';
import { IReviewForm, IReviewSendResponse } from './ReviewForm.interface';
import axios from 'axios';
import { API } from '../../utils/api';

export const ReviewForm = ({ productId, className, ...props }: ReviewFormProps): JSX.Element => {
    const { register, control, handleSubmit, formState: { errors }, reset } = useForm<IReviewForm>();
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [error, setError] = useState<string>();

    const onSubmit = async (formData: IReviewForm) => {
        try {
            console.log(formData);
            const { data } = await axios.post<IReviewSendResponse>(API.review.createDemo, {...formData, productId});
            if(data.message) {
                setIsSuccess(true);
                reset();
            } else {
                setError("Что-то пошло не так");
            }
        } catch (error) {
            setError(error.message);
        }
        
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div 
                className={cn(styles.reviewForm, className)}
                {...props}
            >
                <Input 
                    {...register('name', { required: { value: true, message: 'Заполните имя' } })} 
                    placeholder="Имя"
                    error={errors.name}
                />
                <Input 
                    {...register('title', { required: { value: true, message: 'Заполните заголовок' } })}
                    className={styles.title} 
                    placeholder="Заголовок отзыва"
                    error={errors.title}
                />
                <div className={styles.rating}>
                    <span>Оценка:</span>
                    <Controller
                        control={control}
                        name="rating"
                        rules={{required: { value: true, message: 'Укажите рейтинг' }}}
                        render={({ field }) => (
                            <Rating 
                                isEditable 
                                setRating={field.onChange} 
                                ref={field.ref} 
                                rating={field.value}
                                error={errors.rating}
                            />
                        )}
                    />
                </div>
                <Textarea 
                    {...register('description', { required: { value: true, message: 'Заполните текст озыва' } })} 
                    placeholder="Текст отзыва" 
                    className={styles.description}
                    error={errors.description}
                />
                <div className={styles.submit}>
                    <Button appearance="primary">
                        Отправить
                    </Button>
                    <span className={styles.info}>* Перед публикацией озыв пройдет предварительную модерацию и проверку</span>
                </div>
            </div>
            {isSuccess && <div className={cn(styles.success, styles.panel)}>
                <div className={styles.successTitle}>
                    Ваш отзыв отправлен
                </div>
                <div>
                    Спасибо, ваш отзыв будет опубликован после проверки.
                </div>
                <CloseIcon className={styles.close} onClick={() => setIsSuccess(false)}/>
            </div>}
            {error && <div className={cn(styles.error, styles.panel)}>
                <span>
                    Что-то пошло не так попробуйте позже.
                </span>
                <CloseIcon className={styles.close} onClick={() => setError(undefined)}/>
            </div>}
        </form>
    );
};