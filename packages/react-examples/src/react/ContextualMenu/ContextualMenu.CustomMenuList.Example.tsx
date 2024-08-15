import * as React from 'react';
import { DefaultButton } from '@fluentui/react/lib/Button';
import { ISearchBoxStyles, SearchBox } from '@fluentui/react/lib/SearchBox';
import { Text } from '@fluentui/react/lib/Text';
import { Icon } from '@fluentui/react/lib/Icon';
import { IContextualMenuListProps, IContextualMenuItem } from '@fluentui/react/lib/ContextualMenu';
import { IRenderFunction } from '@fluentui/react/lib/Utilities';
import { KeyCodes } from '@fluentui/react';

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

  const onKeyDown = React.useCallback((e, ...args) => {
    /* Key Up, but we are not at the beginning of the text: stop event propagation to prevent ContextualMenu to focus */
    if (e.target.selectionStart > 0 && e.which === KeyCodes.up) {
      e.stopPropagation();
    }
    /* Key Down, but we are not at the end of the text: stop event propagation to prevent ContextualMenu to focus */
    if (e.target.selectionStart !== e.target.value.length && e.which === KeyCodes.down) {
      e.stopPropagation();
    }
  }, []);

  const onDismiss = React.useCallback(() => {
    setItems(menuItems);
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
              onKeyDown={onKeyDown}
              styles={searchBoxStyles}
            />
          </div>
          {defaultRender(menuListProps)}
        </div>
      );
    },
    [onAbort, onChange, onKeyDown],
  );

  const menuProps = React.useMemo(
    () => ({
      onRenderMenuList: renderMenuList,
      title: 'Actions',
      shouldFocusOnMount: true,
      items,
      focusZoneProps: {
        shouldInputLoseFocusOnArrowKey: () => true /* Allow up and down arrows to move focus out of the SearchBox */,
      },
      onDismiss,
    }),
    [items, renderMenuList, onDismiss],
  );

  return (
    <>
      <p>
        <Text>
          Warning: adding an input to a menu is not technically allowed, and will trigger errors in Accessibility
          Insights and axe-core. However, real world accessibility issues are minimal and not blocking.
        </Text>
      </p>
      <DefaultButton text="Click for ContextualMenu" menuProps={menuProps} />
    </>
  );
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
