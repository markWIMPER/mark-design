import type { ISplistData, SplitDataItem, SplitMode } from "./types";

export const useMouseEvent = (splitData: ISplistData, mode: SplitMode) => {
  let startX = 0,
    startY = 0,
    currentX = 0,
    currentY = 0;
  let firstItem: SplitDataItem;
  let secondItem: SplitDataItem;

  const handleDown = (index: number, event: MouseEvent) => {
    splitData.moveIndex = index;
    const mouseEvent = getStdMouseEvent(event);
    startX = mouseEvent.positonX;
    startY = mouseEvent.positionY;

    firstItem = splitData.items.find((item) => item.index == index - 1)!;
    secondItem = splitData.items.find(
      (item) => item.index == splitData.moveIndex
    )!;

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);
    // emits...
  };

  const handleMove = (e: MouseEvent) => {
    if (!splitData.moveIndex) return;
    e.stopPropagation();
    e.preventDefault();
    splitData.isDragging = true;

    const mouseEvent = getStdMouseEvent(e);
    currentX = mouseEvent.positonX;
    currentY = mouseEvent.positionY;

    if (mode === "horizontal") {
      splitData.currentChange = currentX - startX;
    }
    if (mode === "vertical") {
      splitData.currentChange = currentY - startY;
    }

    const firstSize = firstItem.getInstance() + splitData.currentChange;
    const firMinSize = firstItem.minSize as number;
    const firMaxSize = firstItem.maxSize as number;
    const secondSize = secondItem.getInstance() - splitData.currentChange;
    const secMinSize = secondItem.minSize as number;
    const secMaxSize = secondItem.maxSize as number;

    if (firMinSize && firstSize < firMinSize) {
      splitData.currentChange = firMinSize - firstItem.getInstance();
    } else if (firMaxSize && firstSize > firMaxSize) {
      splitData.currentChange = firMaxSize - firstItem.getInstance();
    } else if (secMinSize && secondSize < secMinSize) {
      splitData.currentChange = secondItem.getInstance() - secMinSize;
    } else if (secMaxSize && secondSize > secMaxSize) {
      splitData.currentChange = secondItem.getInstance() - secMaxSize;
    } else if (firstSize < 10) {
      splitData.currentChange = 10 - firstItem.getInstance();
    } else if (secondSize < 10) {
      splitData.currentChange = secondItem.getInstance() - 10;
    }

    window.requestAnimationFrame(() => {
      if (splitData.currentChange) {
        firstItem.setChange(splitData.currentChange);
        secondItem.setChange(-splitData.currentChange);
      }
    });
  };

  const handleUp = (e: MouseEvent) => {
    if (!splitData.moveIndex) return;
    // emits...
    e.stopPropagation();
    e.preventDefault();

    window.requestAnimationFrame(() => {
      // 停止后记录更新当前的currentWidth或者currentHeight
      const firstSize = firstItem.getInstance() + splitData.currentChange;
      const secondSize = secondItem.getInstance() - splitData.currentChange;
      firstItem.setInstance(firstSize);
      firstItem.setChange(0);
      secondItem.setInstance(secondSize);
      secondItem.setChange(0);

      splitData.moveIndex = -1;
      startX = 0;
      startY = 0;
      currentX = 0;
      currentY = 0;
      splitData.currentChange = 0;
    });

    splitData.isDragging = false;
    window.removeEventListener("mouseup", handleUp);
    window.removeEventListener("mousemove", handleMove);
  };

  const getStdMouseEvent = (event: MouseEvent) => {
    return {
      positonX:
        event.clientX +
        document.body.scrollLeft +
        document.documentElement.scrollLeft,
      positionY:
        event.clientY +
        document.body.scrollHeight +
        document.documentElement.scrollTop,
    };
  };

  return { handleDown, handleMove, handleUp };
};
