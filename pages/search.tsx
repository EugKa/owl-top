import React from "react";
import { GetStaticProps } from "next";
import axios from 'axios';
import { MenuItem } from "../interfaces";

import { withLayout } from "../layout/Layout";
import { API } from "../utils/api";


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
    const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
      firstCategory
    });
    return {
      props: {
        menu,
        firstCategory
      }
    };
};
  