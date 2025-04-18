import * as React from 'react';
import { Tree, TreeItem, TreeItemLayout, TreeProps } from '@fluentui/react-components';

export const Default = () => {
  const [checked, setChecked] = React.useState(['maxMustermann']);
  const onCheckedChange: TreeProps['onCheckedChange'] = (e, data) => {
    setChecked([data.value as string]);
  };

  const onNavigationIn: TreeProps['onNavigationIn'] = (e, data) => {
    console.log(data);
    if (data.itemType === 'leaf') {
      setChecked([data.value as string]);
    }
  };

  // This should be built into an enhanced tree item
  const onClick = (e: React.MouseEvent) => {
    const treeItem = e.nativeEvent.composedPath().find(el => (el as HTMLElement).getAttribute('role') === 'treeitem');
    // @ts-expect-error
    const value = treeItem._treeItem?.value;
    // @ts-expect-error
    const itemType = treeItem._treeItem?.itemType;
    if (value && itemType === 'leaf') {
      setChecked([value]);
    }
  };

  return (
    <>
      <pre>Selected: {checked[0]}</pre>
      <Tree
        aria-label="Default"
        selectionMode="single"
        checkedItems={checked}
        onCheckedChange={onCheckedChange}
        onNavigationIn={onNavigationIn}
        onClick={onClick}
        defaultOpenItems={['favorites', 'teamsAndChannels', 'chats']}
      >
        <TreeItem itemType="branch" value={'favorites'}>
          <TreeItemLayout selector={null}>Favorites</TreeItemLayout>
          <Tree>
            <TreeItem itemType="leaf" value={'maxMustermann'}>
              <TreeItemLayout>Max Mustermann</TreeItemLayout>
            </TreeItem>
            <TreeItem itemType="leaf" value={'johnDoe'}>
              <TreeItemLayout>John Doe</TreeItemLayout>
            </TreeItem>
            <TreeItem itemType="leaf" value={'pierreDupont'}>
              <TreeItemLayout>Pierre Dupont</TreeItemLayout>
            </TreeItem>
          </Tree>
        </TreeItem>
        <TreeItem itemType="branch" value={'chats'}>
          <TreeItemLayout selector={null}>Chats</TreeItemLayout>
          <Tree>
            <TreeItem itemType="leaf" value={'janNovak'}>
              <TreeItemLayout>Jan Novak</TreeItemLayout>
            </TreeItem>
            <TreeItem itemType="leaf" value={'janeDoe'}>
              <TreeItemLayout>Jane Doe</TreeItemLayout>
            </TreeItem>
            <TreeItem itemType="leaf" value={'erikaMustermann'}>
              <TreeItemLayout>Erika Mustermann</TreeItemLayout>
            </TreeItem>
          </Tree>
        </TreeItem>
        <TreeItem itemType="branch" value={'teamsAndChannels'}>
          <TreeItemLayout selector={null}>Teams and Channels</TreeItemLayout>
          <Tree>
            <TreeItem itemType="leaf" value={'general'}>
              <TreeItemLayout>General</TreeItemLayout>
            </TreeItem>
            <TreeItem itemType="leaf" value={'engPlanning'}>
              <TreeItemLayout>Eng planning</TreeItemLayout>
            </TreeItem>
            <TreeItem itemType="leaf" value={'pmDiscussion'}>
              <TreeItemLayout>PM discussion</TreeItemLayout>
            </TreeItem>
          </Tree>
        </TreeItem>
      </Tree>
    </>
  );
};
