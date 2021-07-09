import { GetStaticProps } from "next";
import React, { useState } from "react";
import { Htag, Button, Paragraph, Tag, Rating } from "../components";
import { withLayout } from "../layout/Layout";
import axios from 'axios';
import { MenuItem } from "../interfaces/menu";

interface HomeProps extends Record<string, unknown>{
  menu: MenuItem[];
  firstCategory: number;
}


function Home({ menu }: HomeProps): JSX.Element {
  const [rating, setRating] = useState(4);
  return (
    <>
      APP
      <Htag tag="h1">Ntewew</Htag>
      <Button appearance="primary" arrow="right">BTN</Button>
      <Button appearance="ghost" arrow="down">BTN2</Button>
      <Paragraph size="small">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure cumque magnam modi dolorem rerum accusantium eveniet perferendis delectus, ratione quas. Neque quia asperiores distinctio commodi ad ducimus natus autem quod?
      </Paragraph>
      <Paragraph size="medium">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure cumque magnam modi dolorem rerum accusantium eveniet perferendis delectus, ratione quas. Neque quia asperiores distinctio commodi ad ducimus natus autem quod?
      </Paragraph>
      <Paragraph size="large">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure cumque magnam modi dolorem rerum accusantium eveniet perferendis delectus, ratione quas. Neque quia asperiores distinctio commodi ad ducimus natus autem quod?
      </Paragraph>
      <Tag size="small">SSS</Tag>
      <Tag size="medium" color="red">RED</Tag>
      <Tag size="small" color="green">GREEN</Tag>
      <Tag size='medium' color="primary">primary</Tag>
      <Rating rating={rating} isEditable setRating={setRating}/>
      
    </>
  );
}

export default withLayout(Home);

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
