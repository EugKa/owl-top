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
