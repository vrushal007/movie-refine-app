import { AntdListInferencer } from "@refinedev/inferencer/antd";
import { GetServerSideProps } from "next";

export default function BlogPostList() {
  return <AntdListInferencer />;
}

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  return {
    props: {},
  };
};
