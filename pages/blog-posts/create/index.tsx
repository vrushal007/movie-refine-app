import { AntdCreateInferencer } from "@refinedev/inferencer/antd";
import { GetServerSideProps } from "next";

export default function BlogPostCreate() {
  return <AntdCreateInferencer />;
}

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  return {
    props: {},
  };
};
