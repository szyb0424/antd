import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Button from ".";
// 元数组 Button组件的描述信息
export default {
  title: "通用/Button(按钮)",
  component: Button,
} as ComponentMeta<typeof Button>;
// 定义一个组件故事模板
const Template: ComponentStory<typeof Button> = (args) => (
  <Button  {...args} />
);
// 基本组件
export const Basic = Template.bind({});
// 定义组件的属性
Basic.args = {
  children: "按钮",
};