import type { Meta, StoryObj, ArgTypes } from "@storybook/vue3";
import { expect, fn, userEvent, within } from "@storybook/test";

import { MdButton } from "mark-design";

type Story = StoryObj<typeof MdButton> & { argTypes?: ArgTypes };

const meta: Meta<typeof MdButton> = {
  title: "MdButton",
  component: MdButton,
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["primary", "success", "warning", "danger", "info"],
    },
    size: {
      control: { type: "select" },
      options: ["small", "default", "large"],
    },
    disabled: {
      control: { type: "boolean" },
    },
    loading: {
      control: { type: "boolean" },
    },
  },
  args: {
    onClick: fn(),
  },
};

export const Default: Story & { args: { content: string } } = {
  argTypes: {
    content: {
      control: { type: "text" },
    },
  },
  args: {
    type: "primary",
    content: "Click me",
  },
  render: (args) => ({
    components: { MdButton },
    setup() {
      return { args };
    },
    template: `<md-button v-bind="args">{{ args.content }}</md-button>`,
  }),
  play: async ({ canvasElement, args, step }) => {
    const canvas = within(canvasElement);
    await step("click button", async () => {
      await userEvent.tripleClick(canvas.getByRole("button"));
    });

    expect(args.onClick).toHaveBeenCalled();
  },
};

export default meta;
