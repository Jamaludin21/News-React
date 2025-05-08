import { Image } from "antd";
import EmptyIMG from "assets/Empty.svg";

export const EmptyRender = () => (
  <Image src={EmptyIMG} preview={false} alt="No data" />
);
