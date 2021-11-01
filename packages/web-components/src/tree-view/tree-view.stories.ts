import { fluentTreeView } from './index';

export default {
  title: 'Components/Tree View',
  component: fluentTreeView,
  argTypes: {
    renderCollapsedNodes: {
      control: { type: 'boolean' },
    },
  },
};

const TreeViewTemplate = ({ renderCollapsedNodes }) => `
<style>
div.docs-story>div:first-child {
  height: 26em !important;
}
</style>
<fluent-tree-view
  ${renderCollapsedNodes ? `render-collapsed-nodes="${renderCollapsedNodes}` : ''}
">
  <fluent-tree-item>
    Root item 1
    <fluent-tree-item>
      Flowers
      <fluent-tree-item disabled>Daisy</fluent-tree-item>
      <fluent-tree-item>Sunflower</fluent-tree-item>
      <fluent-tree-item>Rose</fluent-tree-item>
    </fluent-tree-item>
    <fluent-tree-item>Nested item 2</fluent-tree-item>
    <fluent-tree-item>Nested item 3</fluent-tree-item>
  </fluent-tree-item>
  <fluent-tree-item>
    Root item 2
    <fluent-divider></fluent-divider>
    <fluent-tree-item>
      Flowers
      <fluent-tree-item disabled>Daisy</fluent-tree-item>
      <fluent-tree-item>Sunflower</fluent-tree-item>
      <fluent-tree-item>Rose</fluent-tree-item>
    </fluent-tree-item>
    <fluent-tree-item>Nested item 2</fluent-tree-item>
    <fluent-tree-item>Nested item 3</fluent-tree-item>
  </fluent-tree-item>
  <fluent-tree-item> Root item 3 - Leaf Erikson </fluent-tree-item>
</fluent-tree-view>`;

export const TreeView = TreeViewTemplate.bind({});

TreeView.args = {
  renderCollapsedNodes: false,
};

const example = `
<fluent-tree-view>
  <fluent-tree-item>
    Root item 1
    <fluent-tree-item>
      Flowers
      <fluent-tree-item disabled>Daisy</fluent-tree-item>
      <fluent-tree-item>Sunflower</fluent-tree-item>
      <fluent-tree-item>Rose</fluent-tree-item>
    </fluent-tree-item>
    <fluent-tree-item>Nested item 2</fluent-tree-item>
    <fluent-tree-item>Nested item 3</fluent-tree-item>
  </fluent-tree-item>
  <fluent-tree-item>
    Root item 2
    <fluent-divider></fluent-divider>
    <fluent-tree-item>
      Flowers
      <fluent-tree-item disabled>Daisy</fluent-tree-item>
      <fluent-tree-item>Sunflower</fluent-tree-item>
      <fluent-tree-item>Rose</fluent-tree-item>
    </fluent-tree-item>
    <fluent-tree-item>Nested item 2</fluent-tree-item>
    <fluent-tree-item>Nested item 3</fluent-tree-item>
  </fluent-tree-item>
  <fluent-tree-item> Root item 3 - Leaf Erikson </fluent-tree-item>
</fluent-tree-view>`;

TreeView.parameters = {
  docs: {
    source: {
      code: example,
    },
  },
};
