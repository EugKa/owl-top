import React from 'react';
import { HHDataProps } from './hh-data.props';
import styles from './hh-data.module.css';
import { Card } from '../Card/Card';
import RateIcon from './icons/rate.svg';
import { priceRu } from '../../utils/helpers';

export const HHData = ({ count, juniorSalary, middleSalary, seniorSalary }: HHDataProps): JSX.Element => {
    return (
        <div className={styles.hh}>
                <Card className={styles.count}>
                    <div className={styles.title}>Всего ваканисий</div>
                    <div className={styles.countCalue}>{count}</div>
                </Card>
                <Card className={styles.salary}>
                    <div>
                        <div className={styles.title}>Начальный</div>
                        <div className={styles.salaryValue}>{priceRu(juniorSalary)}</div>
                        <div className={styles.rate}>
                            <RateIcon className={styles.filled}/>
                            <RateIcon/>
                            <RateIcon/>
                        </div>
                    </div>
                    <div>
                        <div className={styles.title}>Средний</div>
                        <div className={styles.salaryValue}>{priceRu(middleSalary)}</div>
                        <div className={styles.rate}>
                            <RateIcon className={styles.filled}/>
                            <RateIcon className={styles.filled}/>
                            <RateIcon/>
                        </div>
                    </div>
                    <div>
                        <div className={styles.title}>Профессионал</div>
                        <div className={styles.salaryValue}>{priceRu(seniorSalary)}</div>
                        <div className={styles.rate}>
                            <RateIcon className={styles.filled}/>
                            <RateIcon className={styles.filled}/>
                            <RateIcon className={styles.filled}/>
                        </div>
                    </div>
                </Card>
            </div>
    );
};