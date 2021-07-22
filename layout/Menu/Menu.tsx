import React, { useContext } from 'react';
import cn from 'classnames';
import Link from 'next/link';
import styles from './Menu.module.css';
import { AppContext } from '../../context/app.context';
import { FirstLevelMenuItem, PageItem } from '../../interfaces';
import { useRouter } from 'next/dist/client/router';
import { firstLevelMenu } from '../../utils/helpers';
import { motion } from 'framer-motion';

export const Menu = (): JSX.Element => {
    const { menu, setMenu, firstCategory } = useContext(AppContext);
    const router = useRouter();

    const variants = {
        visible: {
            marginBotton: 20,
            transition: {
                when: 'beforeChildren',
                staggerChildren: 0.1
            }
        },
        hidden: {
            marginBottom: 0
        }
    };

    const variantsChildren = {
        visible: {
            opacity: 1,
            height: 29,
        },
        hidden: {
            opacity: 0,
            height: 0,
        }
    };

    const openSecondLevel = (secondCategory: string) => {
        setMenu && setMenu(menu.map(item => {
            if(item._id.secondCategory === secondCategory) {
                item.isOpend = !item.isOpend;
            }
            return item;
        }));
    };

    const buildFirstLevel = () => {
        return (
            <>
                {firstLevelMenu.map(menu => (
                    <div key={menu.route}>
                        <Link href={`/${menu.route}`}>
                            <a>
                                <div className={cn(styles.firstLevel, {
                                    [styles.firstLevelActive]: menu.id === firstCategory
                                })}>
                                    {menu.icon}
                                    <span>{menu.name}</span>
                                </div>
                            </a>
                        </Link>
                       
                        {menu.id === firstCategory && buildSecondLevel(menu)}
                    </div>
                ))}
            </>
        );
    };

    const buildSecondLevel = (menuItem: FirstLevelMenuItem) => {
        return (
            <div className={styles.secondBlock}>
                {menu.map(item => {
                    if(item.pages.map(el => el.alias).includes(router.asPath.split('/')[2])) {
                        item.isOpend = true;
                    }
                    return (
                        <div key={item._id.secondCategory}>
                            <div className={styles.secondLevel} onClick={() => openSecondLevel(item._id.secondCategory)}>
                                {item._id.secondCategory}
                            </div>
                            <motion.div
                                initial={item.isOpend ? 'visible': 'hidden'}
                                animate={item.isOpend ? 'visible': 'hidden'}
                                layout
                                variants={variants}
                                className={cn(styles.secondLevelBlock)}
                            >
                                {buildThirdLevel(item.pages, menuItem.route)}
                            </motion.div>
                        </div>
                    );
                })}
            </div>
        );
    };

    const buildThirdLevel = (pages: PageItem[], route: string) => {
        return (
            pages.map(page => (
                <motion.div key={page._id} variants={variantsChildren}>
                    <Link href={`/${route}/${page.alias}`}>
                        <a className={cn(styles.thirdLevel, {
                            [styles.thirdLevelActive] : `/${route}/${page.alias}` === router.asPath
                        })}>
                            {page.category}
                        </a>
                    </Link>
                </motion.div>
                
               
            ))
        );
    };
    

    return (
        <div className={styles.menu}> 
           {buildFirstLevel()}
        </div>
    );
};
