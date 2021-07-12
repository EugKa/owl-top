import React from "react";
import { GetStaticProps } from "next";
import axios from 'axios';
import { MenuItem } from "../interfaces";

import { withLayout } from "../layout/Layout";


interface HomeProps extends Record<string, unknown>{
    menu: MenuItem[];
    firstCategory: number;
  }

function Search(): JSX.Element {
	return (
		<>
			Search
		</>
	);
}

export default withLayout(Search);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
    const firstCategory = 0;
    const { data: menu } = await axios.post<MenuItem[]>(`${process.env.NEXT_PUBLIC_DOMAIN}/api/top-page/find`, {
      firstCategory
    });
    return {
      props: {
        menu,
        firstCategory
      }
    };
};
  