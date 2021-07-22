import React, { useEffect, useReducer } from 'react';
import { TopPageComponentProps } from './TopPageComponent.props';
import styles from './TopPageComponent.module.css';
import { Advantages, Htag, Product, Sort, Tag } from '../../components';
import { HHData } from '../../components/hh-data/hh-data';
import { TopLevelCategory } from '../../interfaces';
import { SortEnum } from '../../components/Sort/Sort.props';
import { sortReducer } from './sort.reducer';

export const TopPageComponent = ({ page, products, firstLevelCategory }: TopPageComponentProps):JSX.Element => {
	const [{ products: sortedProducts, sort }, dispathSort] = useReducer(sortReducer, { products, sort: SortEnum.Rating });

    const setSort = (sort: SortEnum) => {
        dispathSort({ type: sort });
    };

    useEffect(() => {
        dispathSort({ type: 'reset', initialState: products });
    },[products]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>
                <Htag tag="h1">{page.title}</Htag>
                {products && <Tag color="grey" size="medium">{products.length}</Tag>}
                <Sort sort={sort} setSort={setSort}/>
            </div>
            <div>
            {sortedProducts && sortedProducts.map(item => (
                <Product key={item._id} product={item} layout/>
            ))}
            </div>
            <div className={styles.hhTitle}>
                <Htag tag="h2">Вакансии - {page.category}</Htag>
                {products && <Tag color="red" size="medium">hh.ru</Tag>}
            </div>
            {firstLevelCategory == TopLevelCategory.Courses && page.hh && <HHData {...page.hh}/>}
            {page.advantages && page.advantages.length > 0 && <>
                    <Htag tag='h2'>Преимущества</Htag>
                    <Advantages advantages={page.advantages}/>
                </>
            }
            {page.seoText && <div className={styles.seo} dangerouslySetInnerHTML={{__html: page.seoText}}/>}
            <Htag tag='h2'>Получаемые навыки</Htag>
            {page.tags.map(item => <Tag key={item} color="primary">{item}</Tag>)}
        </div>
    );
};