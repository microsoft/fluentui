// @codepen
import * as React from 'react';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import './ContextualMenuExample.scss';
import { IContextualMenuListProps, IContextualMenuItem } from 'office-ui-fabric-react/lib/ContextualMenu';
import { IRenderFunction } from '@uifabric/utilities';

const ITEMS: IContextualMenuItem[] = [
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

export class ContextualMenuWithCustomMenuListExample extends React.Component<
  {},
  {
    items: IContextualMenuItem[];
  }
> {
  constructor(props: {}) {
    super(props);

    this._renderMenuList = this._renderMenuList.bind(this);
    this._onAbort = this._onAbort.bind(this);
    this._onChange = this._onChange.bind(this);

    this.state = {
      items: ITEMS
    };
  }

  public render(): JSX.Element {
    return (
      <div>
        <DefaultButton
          text="Click for ContextualMenu"
          menuProps={{
            onRenderMenuList: this._renderMenuList,
            title: 'Actions',
            shouldFocusOnMount: true,
            items: this.state.items
          }}
        />
      </div>
    );
  }

  private _onAbort() {
    this.setState({ items: ITEMS });
  }

  private _onChange(newValue: any) {
    const filteredItems = ITEMS.filter(item => item.text && item.text.toLowerCase().includes(newValue.toLowerCase()));

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

    this.setState((prevState, props) => ({
      items: filteredItems
    }));
  }

  private _renderMenuList(menuListProps: IContextualMenuListProps, defaultRender: IRenderFunction<IContextualMenuListProps>) {
    return (
      <div>
        <div style={{ borderBottom: '1px solid #ccc' }}>
          <SearchBox
            ariaLabel="Filter actions by text"
            placeholder="Filter actions"
            onAbort={this._onAbort}
            onChange={this._onChange}
            styles={{
              root: [{ margin: '8px' }]
            }}
          />
        </div>
        {defaultRender(menuListProps)}
      </div>
    );
  }
}
