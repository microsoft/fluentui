import { Layout } from 'react-grid-layout';
type LayoutItem = {
  w: number;
  h: number;
  x: number;
  y: number;
  i?: string | undefined;
  minW?: number | undefined;
  minH?: number | undefined;
  maxW?: number | undefined;
  maxH?: number | undefined;
  moved?: boolean | undefined;
  static?: boolean | undefined;
  isDraggable?: boolean | undefined;
  isResizable?: boolean | undefined;
};
const sortLayoutItemsByRowCol = (layout: Layout[]): Layout[] => {
  const tempLayout: Layout[] = [];
  return tempLayout.concat(layout).sort((a: Layout, b: Layout) => {
    if (a.y > b.y || (a.y === b.y && a.x > b.x)) {
      return 1;
    } else if (a.y === b.y && a.x === b.x) {
      // Without this, we can get different sort results in IE vs. Chrome/FF
      return 0;
    }
    return -1;
  });
};
const cloneLayoutItem = (layoutItem: LayoutItem): LayoutItem => {
  return {
    w: layoutItem.w,
    h: layoutItem.h,
    x: layoutItem.x,
    y: layoutItem.y,
    i: layoutItem.i,
    minW: layoutItem.minW,
    maxW: layoutItem.maxW,
    minH: layoutItem.minH,
    maxH: layoutItem.maxH,
    moved: Boolean(layoutItem.moved),
    static: Boolean(layoutItem.static),
    // These can be null
    isDraggable: layoutItem.isDraggable,
    isResizable: layoutItem.isResizable
  };
};
const bottomCoordinate = (layout: Layout[]): number => {
  let max = 0;
  let bottomY = 0;
  for (let i = 0, len = layout.length; i < len; i++) {
    bottomY = layout[i].y + layout[i].h;
    if (bottomY > max) {
      max = bottomY;
    }
  }
  return max;
};
const collides = (layoutItem1: LayoutItem, layoutItem2: LayoutItem): boolean => {
  if (layoutItem1.i === layoutItem2.i) {
    return false; // same item
  }
  if (layoutItem1.x + layoutItem1.w <= layoutItem2.x) {
    return false; // layoutItem1 is left of layoutItem2
  }
  if (layoutItem1.x >= layoutItem2.x + layoutItem2.w) {
    return false; // layoutItem1 is right of layoutItem2
  }
  if (layoutItem1.y + layoutItem1.h <= layoutItem2.y) {
    return false; // layoutItem1 is below layoutItem2
  }
  if (layoutItem1.y >= layoutItem2.y + layoutItem2.h) {
    return false; // layoutItem1 is above layoutItem2
  }
  return true; // boxes overlap
};
const getFirstCollision = (layout: Layout[], layoutItem: LayoutItem): LayoutItem | undefined => {
  for (let i = 0, len = layout.length; i < len; i++) {
    if (collides(layout[i], layoutItem)) {
      return layout[i];
    }
  }
  return undefined;
};
const resolveCompactionCollision = (layout: Layout[], item: LayoutItem, moveToCoord: number, axis: 'x' | 'y') => {
  item[axis] += 1;
  const itemIndex = layout
    .map((layoutItem: LayoutItem) => {
      return layoutItem.i;
    })
    .indexOf(item.i);
  // Go through each item we collide with.
  for (let i = itemIndex + 1; i < layout.length; i++) {
    const otherItem = layout[i];
    // Optimization: we can break early if we know we're past this el
    // We can do this b/c it's a sorted layout
    if (otherItem.y > item.y + item.h) {
      break;
    }
    if (collides(item, otherItem)) {
      resolveCompactionCollision(layout, otherItem, moveToCoord + item.w, axis);
    }
  }
  item[axis] = moveToCoord;
};
const compactLayoutItem = (
  uncompactedLayout: Layout[],
  layoutItem: LayoutItem,
  compactHorizontal: boolean,
  cols: number,
  sortedLayout: Layout[]
): LayoutItem => {
  layoutItem.y = Math.min(bottomCoordinate(uncompactedLayout), layoutItem.y);
  // Move the element left as far as it can go without colliding.
  while (layoutItem.x > 0 && !getFirstCollision(uncompactedLayout, layoutItem)) {
    layoutItem.x--;
  }
  let collidesItem;
  while ((collidesItem = getFirstCollision(uncompactedLayout, layoutItem))) {
    if (compactHorizontal) {
      resolveCompactionCollision(sortedLayout, layoutItem, collidesItem.x + collidesItem.w, 'x');
    } else {
      resolveCompactionCollision(sortedLayout, layoutItem, collidesItem.y + collidesItem.h, 'y');
    }
    // Since we can't grow without bounds horizontally, if we've overflown, let's move it down and try again.
    if (compactHorizontal && layoutItem.x + layoutItem.w > cols) {
      layoutItem.x = cols - layoutItem.w;
      layoutItem.y++;
    }
  }
  return layoutItem;
};
export const compactHorizontally = (uncompactedLayout: Layout[], cols: number): Layout[] => {
  const sortedLayout = sortLayoutItemsByRowCol(uncompactedLayout);
  const compactedLayout = Array(uncompactedLayout.length);
  for (let i = 0; i < sortedLayout.length; i++) {
    let clonedItem = cloneLayoutItem(sortedLayout[i]);
    clonedItem = compactLayoutItem(uncompactedLayout, clonedItem, true, cols, sortedLayout);
    compactedLayout[uncompactedLayout.indexOf(sortedLayout[i])] = clonedItem;
    uncompactedLayout[uncompactedLayout.indexOf(sortedLayout[i])] = clonedItem;
    clonedItem.moved = false;
  }
  return compactedLayout;
};
