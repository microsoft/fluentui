import * as React from 'react';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { IContextualMenuListProps, IContextualMenuItem } from 'office-ui-fabric-react/lib/ContextualMenu';
import { IRenderFunction } from 'office-ui-fabric-react/lib/Utilities';

export const ContextualMenuWithCustomMenuListExample: React.FunctionComponent = () => {
  const [items, setItems] = React.useState(menuItems);

  const onAbort = () => {
    setItems(menuItems);
  };

  const onChange = (ev: React.ChangeEvent<HTMLInputElement>, newValue: string) => {
    const filteredItems = menuItems.filter(item => item.text && item.text.toLowerCase().indexOf(newValue.toLowerCase()) !== -1);

    if (!filteredItems || !filteredItems.length) {
      filteredItems.push({
        key: 'no_results',
        onRender: (item, dismissMenu) => (
          <div
            key="no_results"
            style={{
              width: '100%',
              height: '100px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Icon iconName="SearchIssue" title="No actions found" />
            <span>No actions found</span>
          </div>
        )
      });
    }

    setItems(filteredItems);
  };

  const renderMenuList = (menuListProps: IContextualMenuListProps, defaultRender: IRenderFunction<IContextualMenuListProps>) => {
    return (
      <div>
        <div style={{ borderBottom: '1px solid #ccc' }}>
          <SearchBox
            ariaLabel="Filter actions by text"
            placeholder="Filter actions"
            onAbort={onAbort}
            onChange={onChange}
            styles={{
              root: [{ margin: '8px' }]
            }}
          />
        </div>
        {defaultRender(menuListProps)}
      </div>
    );
  };

  return (
    <div>
      <DefaultButton
        text="Click for ContextualMenu"
        menuProps={{
          onRenderMenuList: renderMenuList,
          title: 'Actions',
          shouldFocusOnMount: true,
          items
        }}
      />
    </div>
  );
};

const menuItems: IContextualMenuItem[] = [
  {
    key: 'newItem',
    text: 'New',
    onClick: () => console.log('New clicked')
  },
  {
    key: 'rename',
    text: 'Rename',
    onClick: () => console.log('Rename clicked')
  },
  {
    key: 'edit',
    text: 'Edit',
    onClick: () => console.log('Edit clicked')
  },
  {
    key: 'properties',
    text: 'Properties',
    onClick: () => console.log('Properties clicked')
  },
  {
    key: 'linkNoTarget',
    text: 'Link same window',
    href: 'http://bing.com'
  },
  {
    key: 'linkWithTarget',
    text: 'Link new window',
    href: 'http://bing.com',
    target: '_blank'
  },
  {
    key: 'linkWithOnClick',
    name: 'Link click',
    href: 'http://bing.com',
    onClick: (ev: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
      alert('Link clicked');
      ev.preventDefault();
    },
    target: '_blank'
  },
  {
    key: 'disabled',
    text: 'Disabled item',
    disabled: true,
    onClick: () => console.error('Disabled item should not be clickable.')
  }
];
