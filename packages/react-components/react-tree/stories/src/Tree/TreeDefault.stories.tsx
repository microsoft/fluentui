import * as React from 'react';
import { Tree, TreeItem, TreeItemLayout, TreeProps, Select, Button } from '@fluentui/react-components';

const values = [
  'maxMustermann',
  'johnDoe',
  'pierreDupont',
  'janNovak',
  'janeDoe',
  'erikaMustermann',
  'general',
  'engPlanning',
  'pmDiscussion',
];

export function useDebounce(cb: any, delay: number) {
  const timeoutRef = React.useRef<number>(0);
  React.useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  return React.useCallback(
    (...args) => {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        cb(...args);
      }, delay);
    },
    [cb, delay],
  );
}

export const Default = () => {
  const [checked, setChecked] = React.useState(['maxMustermann']);
  const [itemToSelect, setItemToSelect] = React.useState<string>('maxMustermann');
  const onCheckedChange: TreeProps['onCheckedChange'] = (e, data) => {
    setChecked([data.value as string]);
  };

  const debouncedSetChecked = useDebounce(setChecked, 500);

  const selectedItem = checked[0];

  const onNavigationIn: TreeProps['onNavigationIn'] = (e, data) => {
    console.log(data);
    if (data.itemType === 'leaf') {
      debouncedSetChecked([data.value as string]);
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

  const imperativeRef: NonNullable<TreeProps['imperativeRef']> = React.useRef(null);

  React.useEffect(() => {
    imperativeRef.current?.focus(selectedItem);
  }, [selectedItem]);

  return (
    <>
      <pre>Selected: {selectedItem}</pre>
      <div style={{ display: 'grid', gap: '10px', gridTemplateColumns: '200px 120px' }}>
        <Select value={itemToSelect} onChange={(e, data) => setItemToSelect(data.value)}>
          {values.map(value => (
            <option key={value}>{value}</option>
          ))}
        </Select>
        <Button onClick={() => setChecked([itemToSelect])}>Select item imperatively</Button>
      </div>
      <Tree
        imperativeRef={imperativeRef}
        aria-label="Default"
        selectionMode="single"
        checkedItems={[selectedItem]}
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
