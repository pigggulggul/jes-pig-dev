import { Meta, StoryFn } from "@storybook/react";
import NewButton, { NewButtonProps } from "./NewButton";

export default {
  title: "Components/NewButton",
  component: NewButton,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    onClick: { action: "clicked" },
    backgroundColor: { control: "color" },
  },
} as Meta<typeof NewButton>;

const Template: StoryFn<NewButtonProps> = (args) => <NewButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: "Click Me",
};

export const WithCustomLabel = Template.bind({});
WithCustomLabel.args = {
  label: "Custom Label",
};

export const ClickableButton = Template.bind({});
ClickableButton.args = {
  label: "Button with Click Event",
  onClick: () => alert("Button Clicked!"),
};
