import { describe, test, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";

import Button from "./Button.vue";

describe("Button", () => {
  // Props: type
  it("should has the correct type class when type is set", () => {
    const types = [
      "primary",
      "secondary",
      "success",
      "danger",
      "warning",
      "info",
    ];
    types.forEach((type) => {
      const wrapper = mount(Button, {
        props: { type: type as any },
      });
      expect(wrapper.classes()).toContain(`btn-${type}`);
    });
  });

  // props: size
  it("should has the correct size class when size prop is set", () => {
    const sizes = ["large", "defaut", "small"];
    sizes.forEach((size) => {
      const wrapper = mount(Button, {
        props: { size: size as any },
      });
      expect(wrapper.classes()).toContain(`btn-${size}`);
    });
  });

  // Props: plain, round, cirlce
  it.each(
    ["plain", "is-plain"],
    ["round", "is-round"],
    ["circle", "is-circle"],
    ["disabled", "is-disabled"]
  )("should has the correct class when %s is set", (prop, className) => {
    const wrapper = mount(Button, {
      props: { [prop]: true },
    });
    expect(wrapper.classes()).toContain(className);
  });

  it('should has the correct class when type attribute when native-type prpo is set"', () => {
    const wrapper = mount(Button, {
      props: { nativeType: "submit" },
    });
    expect(wrapper.element.tagName).toBe("BUTTON");
    expect((wrapper.element as any).type).toBe("submit");
  });

  // Props: tag
  it("should renders the custon tag when tag prop is set", () => {
    const wrapper = mount(Button, {
      props: { tag: "a" },
    });
    expect(wrapper.element.tagName.toLowerCase()).toBe("a");
  });

  // Events: click
  it("should emit the click event when button is clicked", async () => {
    const wrapper = mount(Button, {});
    await wrapper.trigger("click");
    expect(wrapper.emitted("click")).toHaveLength(1);
  });
});
