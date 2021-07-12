import React from 'react';
import { TopPageComponentProps } from './TopPageComponent.props';
import styles from './TopPageComponent.module.css';
import { Htag, Tag } from '../../components';
import { HHData } from '../../components/hh-data/hh-data';
import { TopLevelCategory } from '../../interfaces';

export const TopPageComponent = ({ page, products, firstLevelCategory }: TopPageComponentProps):JSX.Element => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>
                <Htag tag="h1">{page.title}</Htag>
                {products && <Tag color="grey" size="medium">{products.length}</Tag>}
                <span>Сортировка</span>
            </div>
            <div>
            {products && products.map(item => (
                <div key={item._id}>{item.title}</div>
            ))}
            </div>
            <div className={styles.hhTitle}>
                <Htag tag="h2">Вакансии - {page.category}</Htag>
                {products && <Tag color="red" size="medium">hh.ru</Tag>}
            </div>
            {firstLevelCategory == TopLevelCategory.Courses && <HHData {...page.hh}/>}
        </div>
    );
};
