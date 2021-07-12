import { ProductModule, TopLevelCategory, TopPageModel } from "../../interfaces";

export interface TopPageComponentProps {
    firstLevelCategory: TopLevelCategory;
    page: TopPageModel;
    products: ProductModule[];

}