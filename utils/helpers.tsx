import CoursesIcom  from './icons/hat.svg';
import CloudIcom  from './icons/cloud.svg';
import BooksIcom  from './icons/book.svg';
import ItemIcom  from './icons/item.svg';
import { FirstLevelMenuItem, TopLevelCategory } from '../interfaces';

export const firstLevelMenu: FirstLevelMenuItem[] = [
    { route: 'courses', name: 'Курсы', icon: <CoursesIcom/>, id: TopLevelCategory.Courses },
    { route: 'services', name: 'Сервисы', icon: <CloudIcom/>, id: TopLevelCategory.Services },
    { route: 'books', name: 'Книги', icon: <BooksIcom/>, id: TopLevelCategory.Books },
    { route: 'products', name: 'Продукты', icon: <ItemIcom/>, id: TopLevelCategory.Products },
];

export const priceRu = (price:number): string => price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ').concat('₽');

export const declOfNum = (number: number, titles: [string, string, string]): string => {
    const cases = [2, 0 ,1 ,1 ,1 ,2];
    return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number %  10 < 5) ? number % 10 : 5]]
};
