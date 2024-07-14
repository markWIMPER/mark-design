import type { Meta, StoryObj, ArgTypes } from "@storybook/vue3";
import { expect, fn, userEvent, within } from "@storybook/test";

import { MdButton, MdButtonGroup } from "mark-design";

type Story = StoryObj<typeof MdButton> & { argTypes?: ArgTypes };

const container = (val: string) => `
<div style="margin:5px">
  ${val}
</div>
`;

const meta: Meta<typeof MdButton> = {
  title: "MdButton",
  // component: MdButton,
  // subcomponents: { ButtonGroup: MdButtonGroup },
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

export const Circle: Story = {
  args: {
    icon: "search",
  },
  render: (args) => ({
    components: { MdButton },
    setup() {
      return { args };
    },
    template: container(`
      <md-button circle v-bind="args"/>
    `),
  }),
  play: async ({ canvasElement, args, step }) => {
    const canvas = within(canvasElement);
    await step("click button", async () => {
      await userEvent.click(canvas.getByRole("button"));
    });

    expect(args.onClick).toHaveBeenCalled();
  },
};

export const Group: Story & { args: { content1: string; content2: string } } = {
  argTypes: {
    groupType: {
      control: { type: "select" },
      options: ["primary", "success", "warning", "danger", "info", ""],
    },
  },
  args: {
    round: true,
    content1: "Button1",
    content2: "Button2",
  },
  render: (args) => ({
    components: { MdButton, MdButtonGroup },
    setup() {
      return { args };
    },
    template: container(`
      <md-button-group :type="args.groupType" :size="args.groupSize" :disabled="args.groupDisabled">
        <md-button v-bind="args">{{args.content1}}</md-button>
        <md-button v-bind="args">{{args.content1}}</md-button>
      </md-button-group>
    `),
  }),
  play: async ({ canvasElement, args, step }) => {
    const canvas = within(canvasElement);
    await step("click button", async () => {
      await userEvent.click(canvas.getByRole("button"));
    });

    expect(args.onClick).toHaveBeenCalled();
  },
};

export default meta;
