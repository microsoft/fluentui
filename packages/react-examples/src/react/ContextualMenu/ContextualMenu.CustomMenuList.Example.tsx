import * as React from 'react';
import { DefaultButton } from '@fluentui/react/lib/Button';
import { ISearchBoxStyles, SearchBox } from '@fluentui/react/lib/SearchBox';
import { Icon } from '@fluentui/react/lib/Icon';
import { IContextualMenuListProps, IContextualMenuItem } from '@fluentui/react/lib/ContextualMenu';
import { IRenderFunction } from '@fluentui/react/lib/Utilities';

export const ContextualMenuWithCustomMenuListExample: React.FunctionComponent = () => {
  const [items, setItems] = React.useState(menuItems);

  const onAbort = React.useCallback(() => {
    setItems(menuItems);
  }, []);

  const onChange = React.useCallback((ev: React.ChangeEvent<HTMLInputElement>, newValue: string) => {
    const filteredItems = menuItems.filter(
      item => item.text && item.text.toLowerCase().indexOf(newValue.toLowerCase()) !== -1,
    );

    if (!filteredItems || !filteredItems.length) {
      filteredItems.push({
        key: 'no_results',
        onRender: (item, dismissMenu) => (
          <div key="no_results" style={filteredItemsStyle}>
            <Icon iconName="SearchIssue" title="No actions found" />
            <span>No actions found</span>
          </div>
        ),
      });
    }

    setItems(filteredItems);
  }, []);

  const renderMenuList = React.useCallback(
    (menuListProps: IContextualMenuListProps, defaultRender: IRenderFunction<IContextualMenuListProps>) => {
      return (
        <div>
          <div style={{ borderBottom: '1px solid #ccc' }}>
            <SearchBox
              ariaLabel="Filter actions by text"
              placeholder="Filter actions"
              onAbort={onAbort}
              onChange={onChange}
              styles={searchBoxStyles}
            />
          </div>
          {defaultRender(menuListProps)}
        </div>
      );
    },
    [onAbort, onChange],
  );

  const menuProps = React.useMemo(
    () => ({
      onRenderMenuList: renderMenuList,
      title: 'Actions',
      shouldFocusOnMount: true,
      items,
    }),
    [items, renderMenuList],
  );

  return <DefaultButton text="Click for ContextualMenu" menuProps={menuProps} />;
};

const filteredItemsStyle: React.CSSProperties = {
  width: '100%',
  height: '100px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};
const searchBoxStyles: ISearchBoxStyles = {
  root: { margin: '8px' },
};

const menuItems: IContextualMenuItem[] = [
  { key: 'newItem', text: 'New', onClick: () => console.log('New clicked') },
  { key: 'rename', text: 'Rename', onClick: () => console.log('Rename clicked') },
  { key: 'edit', text: 'Edit', onClick: () => console.log('Edit clicked') },
  { key: 'properties', text: 'Properties', onClick: () => console.log('Properties clicked') },
  { key: 'linkNoTarget', text: 'Link same window', href: 'http://bing.com' },
  { key: 'linkWithTarget', text: 'Link new window', href: 'http://bing.com', target: '_blank' },
  {
    key: 'linkWithOnClick',
    text: 'Link click',
    href: 'http://bing.com',
    onClick: (ev: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
      alert('Link clicked');
      ev.preventDefault();
    },
    target: '_blank',
  },
  {
    key: 'disabled',
    text: 'Disabled item',
    disabled: true,
    onClick: () => console.error('Disabled item should not be clickable.'),
  },
];
