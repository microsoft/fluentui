import { selectors, itemsCount } from './toolbarMenuOverflowWrapped-example';

const toolbarItem = (index: number) => `.${selectors.toolbarItem}:nth-child(${index + 1})`;
const toolbarItemWrapped = (index: number) =>
  `.${selectors.toolbarItemWrapper}:nth-child(${index + 1}) .${selectors.toolbarItem}`;
const toolbar = `.${selectors.toolbar}`;

describe('Toolbar menu overflow with wrapped first item', () => {
  let itemWidth;

  beforeEach(async () => {
    await e2e.gotoTestCase(__filename, toolbar);
    // Getting width required for an item. Assumes all items have same width.
    if (itemWidth === undefined) {
      itemWidth = (await (await e2e.getElement(toolbarItem(0))).boundingBox()).width;
    }
  });

  afterEach(async () => {
    // resizes the viewport to contain all items.
    await e2e.resizeViewport({ width: itemWidth * (itemsCount + 2) });
    await e2e.wait(500);
  });

  it("hiding focused item will set focus to first focusable element, even if it's wrapped", async () => {
    const itemToBeHiddenIndex = itemsCount / 2 - 1; // last un-wrapped item.
    const itemToReceiveFocusIndex = 0; // first item is wrapped.

    // clicks to set focus on last un-wrapped item.
    await e2e.clickOn(toolbarItem(itemToBeHiddenIndex));

    await e2e.isFocused(toolbarItem(itemToBeHiddenIndex));

    // resizes the viewport to hide the focused item.
    await e2e.resizeViewport({ width: itemWidth * (itemsCount / 2) });
    await e2e.wait(500);

    // check that the focus was applied to first item as fall-back.
    await e2e.isFocused(toolbarItemWrapped(itemToReceiveFocusIndex));
  });

  it("hiding focused wrapped item will set focus to first focusable element, even if it's wrapped", async () => {
    const itemToBeHiddenIndex = itemsCount / 2; // first wrapped item (not accounting the very first).
    const itemToReceiveFocusIndex = 0; // first item is wrapped.

    // clicks to set focus on first wrapped item.
    await e2e.clickOn(toolbarItemWrapped(itemToBeHiddenIndex));

    await e2e.isFocused(toolbarItemWrapped(itemToBeHiddenIndex));

    // resizes the viewport to hide that item.
    await e2e.resizeViewport({ width: itemWidth * (itemsCount / 2) });
    await e2e.wait(500);

    // check that the focus was applied to first item as fall-back.
    await e2e.isFocused(toolbarItemWrapped(itemToReceiveFocusIndex));
  });
});
