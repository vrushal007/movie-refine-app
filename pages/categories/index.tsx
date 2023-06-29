import { AntdListInferencer } from "@refinedev/inferencer/antd";
import { GetServerSideProps } from "next";

export default function CategoryList() {
  return <AntdListInferencer />;
}

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  return {
    props: {},
  };
};
