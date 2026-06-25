import { Listbox } from '../../src/listbox/listbox.js';
import { styles as listboxStyles } from '../../src/listbox/listbox.styles.js';
import { template as listboxTemplate } from '../../src/listbox/listbox.template.js';
import { DropdownOption } from '../../src/option/option.js';
import { styles as optionStyles } from '../../src/option/option.styles.js';
import { template as optionTemplate } from '../../src/option/option.template.js';
import { TreeItem } from '../../src/tree-item/tree-item.js';
import { styles as treeItemStyles } from '../../src/tree-item/tree-item.styles.js';
import { template as treeItemTemplate } from '../../src/tree-item/tree-item.template.js';
import { Tree } from '../../src/tree/tree.js';
import { styles as treeStyles } from '../../src/tree/tree.styles.js';
import { template as treeTemplate } from '../../src/tree/tree.template.js';

type ListboxUpgradeOrderResult = {
  firstOptionMultiple: boolean;
  hasOwnMultiple: boolean;
  optionsLength: number;
};

type TreeUpgradeOrderResult = {
  childTreeItemsLength: number;
  currentSelectedLocalName: string | undefined;
  firstItemSize: string;
  hasOwnSize: boolean;
};

const nextFrame = () => new Promise<void>(resolve => requestAnimationFrame(() => resolve()));

(
  window as unknown as {
    runListboxUpgradeOrderTest(): Promise<ListboxUpgradeOrderResult>;
  }
).runListboxUpgradeOrderTest = async () => {
  const id = Date.now().toString(36);
  const listboxTagName = `upgrade-${id}-listbox`;
  const optionTagName = `upgrade-${id}-option`;

  document.body.innerHTML = `
    <${listboxTagName}>
      <${optionTagName}>Apple</${optionTagName}>
      <${optionTagName}>Banana</${optionTagName}>
      <${optionTagName}>Orange</${optionTagName}>
    </${listboxTagName}>
  `;

  Listbox.compose({
    name: listboxTagName,
    template: listboxTemplate,
    styles: listboxStyles,
  }).define(customElements);

  const listbox = document.querySelector<Listbox>(listboxTagName);
  if (!listbox) {
    throw new Error('Expected listbox to exist.');
  }

  customElements.upgrade(listbox);
  listbox.multiple = true;

  DropdownOption.compose({
    name: optionTagName,
    template: optionTemplate,
    styles: optionStyles,
  }).define(customElements);

  await customElements.whenDefined(listboxTagName);
  await customElements.whenDefined(optionTagName);
  await nextFrame();
  await nextFrame();

  const firstOption = document.querySelector<DropdownOption>(optionTagName);
  if (!firstOption) {
    throw new Error('Expected option to exist.');
  }

  return {
    firstOptionMultiple: firstOption.multiple,
    hasOwnMultiple: Object.prototype.hasOwnProperty.call(firstOption, 'multiple'),
    optionsLength: listbox.options.length,
  };
};

(
  window as unknown as {
    runTreeUpgradeOrderTest(): Promise<TreeUpgradeOrderResult>;
  }
).runTreeUpgradeOrderTest = async () => {
  const id = Date.now().toString(36);
  const treeTagName = `upgrade-${id}-tree`;
  const treeItemTagName = `upgrade-${id}-tree-item`;

  document.body.innerHTML = `
    <${treeTagName} size="medium">
      <${treeItemTagName} selected>One</${treeItemTagName}>
      <${treeItemTagName}>Two</${treeItemTagName}>
    </${treeTagName}>
  `;

  Tree.compose({
    name: treeTagName,
    template: treeTemplate,
    styles: treeStyles,
  }).define(customElements);

  const tree = document.querySelector<Tree>(treeTagName);
  if (!tree) {
    throw new Error('Expected tree to exist.');
  }

  customElements.upgrade(tree);

  TreeItem.compose({
    name: treeItemTagName,
    template: treeItemTemplate,
    styles: treeItemStyles,
  }).define(customElements);

  await customElements.whenDefined(treeTagName);
  await customElements.whenDefined(treeItemTagName);
  await nextFrame();
  await nextFrame();

  const firstItem = document.querySelector<TreeItem>(treeItemTagName);
  if (!firstItem) {
    throw new Error('Expected tree item to exist.');
  }

  return {
    childTreeItemsLength: tree.childTreeItems.length,
    currentSelectedLocalName: tree.currentSelected?.localName,
    firstItemSize: firstItem.size,
    hasOwnSize: Object.prototype.hasOwnProperty.call(firstItem, 'size'),
  };
};
