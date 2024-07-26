import type { Meta, StoryObj } from "@storybook/vue3";
import { MdCollapse, MdCollapseItem } from "mark-design";
import "@mark-design/theme/index.css";

type Story = StoryObj<typeof MdCollapse>;

const meta: Meta<typeof MdCollapse> = {
  title: "Example/Collapse",
  component: MdCollapse,
  subcomponents: { MdCollapseItem },
  tags: ["autodocs"],
};

export const Default: Story = {
  render: (args) => ({
    components: {
      MdCollapse,
      MdCollapseItem,
    },
    setup() {
      return {
        args,
      };
    },
    template: `
    <md-collapse v-bind="args">
      <md-collapse-item name="a" title="Title a">
        <div>this is content a</div>
      </md-collapse-item>
      <md-collapse-item name="b" title="title b">
        <div>this is content b</div>
      </md-collapse-item>
      <md-collapse-item name="c" title="title c  disable" disabled>
        <div>this is content c</div>
      </md-collapse-item>
    </md-collapse>
    `,
  }),
  args: {
    accordion: true,
    modelValue: ["a"],
  },
};

export default meta;
