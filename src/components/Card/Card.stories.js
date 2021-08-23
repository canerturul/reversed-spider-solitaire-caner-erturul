import React from "react";
import Card from "./Card";

export default {
  title: "Card",
  component: Card,
};

const Template = (args) => <Card {...args} />;

export const Black = Template.bind({});

const cardValues = { rank: "A", suit: "heart" };

Black.args = {
  variant: "Black",
  card: cardValues,
  isSelected: false,
  isDown: false,
};

export const White = Template.bind({});

White.args = {
  variant: "White",
  card: cardValues,
  isSelected: false,
  isDown: false,
};
