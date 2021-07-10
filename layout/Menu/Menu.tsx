import React, { useContext } from 'react';
import cn from 'classnames';
import Link from 'next/link';
import styles from './Menu.module.css';
import { AppContext } from '../../context/app.context';
import { FirstLevelMenuItem, PageItem } from '../../interfaces';
import { useRouter } from 'next/dist/client/router';
import { firstLevelMenu } from '../../utils/helpers';

export const Menu = (): JSX.Element => {
    const { menu, setMenu, firstCategory } = useContext(AppContext);
    const router = useRouter();

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
                            <div className={cn(styles.secondLevelBlock, {
                                [styles.secondLevelBlockOpend]: item.isOpend
                            })}>
                                {buildThirdLevel(item.pages, menuItem.route)}
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };

    const buildThirdLevel = (pages: PageItem[], route: string) => {
        return (
            pages.map(page => (
                <Link href={`/${route}/${page.alias}`} key={page._id} >
                     <a className={cn(styles.thirdLevel, {
                        [styles.thirdLevelActive] : `/${route}/${page.alias}` === router.asPath
                    })}>
                        {page.category}
                    </a>
                </Link>
               
            ))
        );
    };
    

    return (
        <div className={styles.menu}> 
           {buildFirstLevel()}
        </div>
    );
};
