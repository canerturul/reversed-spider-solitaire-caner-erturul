import React from "react";
import Button from "./Button";
import timerIcon from "../../assets/icons/timer.ico";
import "../Header/Header.css";

export default {
  title: "Button",
  component: Button,
};

const Template = (args) => <Button {...args} />;

export const Black = Template.bind({});

Black.args = {
  variant: "Black",
  buttonText: "Black ",
  icon: timerIcon,
};

export const White = Template.bind({});

White.args = {
  variant: "White",
  buttonText: "White ",
  icon: timerIcon,
};
