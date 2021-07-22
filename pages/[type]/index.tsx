import React from "react";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import axios from 'axios';
import { MenuItem } from "../../interfaces";
import { withLayout } from "../../layout/Layout";
import { firstLevelMenu } from "../../utils/helpers";
import { ParsedUrlQuery } from "querystring";
import { API } from "../../utils/api";


interface TypeProps extends Record<string, unknown>{
    menu: MenuItem[];
    firstCategory: number;
  }

function Type({ firstCategory }: TypeProps): JSX.Element {
	return (
		<>
			Type: {firstCategory}
		</>
	);
}

export default withLayout(Type);

export const getStaticPaths: GetStaticPaths = async () => {
	return {
		paths: firstLevelMenu.map(item => `/${item.route}`),
		fallback: true
	};
};

export const getStaticProps: GetStaticProps<TypeProps> = async ({ params }: GetStaticPropsContext<ParsedUrlQuery>) => {
    if (!params) {
		return {
			notFound: true
		};
	}

    const firstCategoryItem = firstLevelMenu.find(item => item.route == params.type);
	if (!firstCategoryItem) {
		return {
			notFound: true
		};
	}

    const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
      firstCategory: firstCategoryItem.id
    });
    return {
      props: {
        menu,
        firstCategory: firstCategoryItem.id
      }
    };
  };
  