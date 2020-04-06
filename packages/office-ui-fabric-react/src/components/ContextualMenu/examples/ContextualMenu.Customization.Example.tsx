import * as React from 'react';
import {
  ContextualMenuItemType,
  DirectionalHint,
  IContextualMenuProps,
  IContextualMenuItem,
} from 'office-ui-fabric-react/lib/ContextualMenu';
import { DefaultButton, IconButton } from 'office-ui-fabric-react/lib/Button';
import { FocusZoneDirection } from 'office-ui-fabric-react/lib/FocusZone';
import './ContextualMenuExample.scss';

export const ContextualMenuCustomizationExample: React.FunctionComponent = () => {
  return <DefaultButton className="ContextualMenuButton3" text="Click for ContextualMenu" menuProps={menuProps} />;
};

function renderCharmMenuItem(item: IContextualMenuItem, dismissMenu: () => void): JSX.Element {
  return (
    <IconButton
      iconProps={{ iconName: item.text }}
      className="ms-ContextualMenu-customizationExample-icon ms-ContextualMenu-link"
      data-is-focusable={true}
      onClick={dismissMenu}
    />
  );
}

function renderCategoriesList(item: IContextualMenuItem): JSX.Element {
  return (
    <ul className="ms-ContextualMenu-customizationExample-categoriesList">
      <li className="ms-ContextualMenu-item">
        {item.categoryList.map((category: ICategoryList) => (
          <DefaultButton
            className="ms-ContextualMenu-link ms-ContextualMenu-customizationExample-button"
            role="menuitem"
            key={category.name}
          >
            <div>
              <span
                className="ms-ContextualMenu-icon ms-ContextualMenu-customizationExample-categorySwatch"
                style={{ backgroundColor: category.color }}
              />
              <span className="ms-ContextualMenu-itemText">{category.name}</span>
            </div>
          </DefaultButton>
        ))}
      </li>
    </ul>
  );
}

interface ICategoryList {
  name: string;
  color: string;
}

const menuItems: IContextualMenuItem[] = [
  {
    key: 'newItem',
    text: 'New',
  },
  {
    key: 'upload',
    text: 'Upload',
  },
  {
    key: 'divider_1',
    itemType: ContextualMenuItemType.Divider,
  },
  {
    key: 'charm',
    text: 'Charm',
    className: 'Charm-List',
    subMenuProps: {
      focusZoneProps: { direction: FocusZoneDirection.bidirectional },
      items: [
        {
          key: 'none',
          text: 'None',
        },
        {
          key: 'bulb',
          text: 'Lightbulb',
          onRender: renderCharmMenuItem,
          className: 'ms-ContextualMenu-customizationExample-item',
        },
        {
          key: 'run',
          text: 'Running',
          onRender: renderCharmMenuItem,
          className: 'ms-ContextualMenu-customizationExample-item',
        },
        {
          key: 'plane',
          text: 'Airplane',
          onRender: renderCharmMenuItem,
          className: 'ms-ContextualMenu-customizationExample-item',
        },
        {
          key: 'page',
          text: 'Page',
          onRender: renderCharmMenuItem,
          className: 'ms-ContextualMenu-customizationExample-item',
        },
        {
          key: 'cake',
          text: 'Cake',
          onRender: renderCharmMenuItem,
          className: 'ms-ContextualMenu-customizationExample-item',
        },
        {
          key: 'soccer',
          text: 'Soccer',
          onRender: renderCharmMenuItem,
          className: 'ms-ContextualMenu-customizationExample-item',
        },
        {
          key: 'home',
          text: 'Home',
          onRender: renderCharmMenuItem,
          className: 'ms-ContextualMenu-customizationExample-item',
        },
        {
          key: 'emoji',
          text: 'Emoji2',
          onRender: renderCharmMenuItem,
          className: 'ms-ContextualMenu-customizationExample-item',
        },
        {
          key: 'work',
          text: 'Work',
          onRender: renderCharmMenuItem,
          className: 'ms-ContextualMenu-customizationExample-item',
        },
        {
          key: 'coffee',
          text: 'Coffee',
          onRender: renderCharmMenuItem,
          className: 'ms-ContextualMenu-customizationExample-item',
        },
        {
          key: 'people',
          text: 'People',
          onRender: renderCharmMenuItem,
          className: 'ms-ContextualMenu-customizationExample-item',
        },
        {
          key: 'stopwatch',
          text: 'Stopwatch',
          onRender: renderCharmMenuItem,
          className: 'ms-ContextualMenu-customizationExample-item',
        },
        {
          key: 'music',
          text: 'MusicInCollectionFill',
          onRender: renderCharmMenuItem,
          className: 'ms-ContextualMenu-customizationExample-item',
        },
        {
          key: 'lock',
          text: 'Lock',
          onRender: renderCharmMenuItem,
          className: 'ms-ContextualMenu-customizationExample-item',
        },
      ],
    },
  },
  {
    key: 'categories',
    text: 'Categorize',
    subMenuProps: {
      items: [
        {
          key: 'categories',
          text: 'categories',
          categoryList: [
            {
              name: 'Personal',
              color: 'yellow',
            },
            {
              name: 'Work',
              color: 'green',
            },
            {
              name: 'Birthday',
              color: 'blue',
            },
            {
              name: 'Spam',
              color: 'grey',
            },
            {
              name: 'Urgent',
              color: 'red',
            },
            {
              name: 'Hobbies',
              color: 'black',
            },
          ],
          onRender: renderCategoriesList,
        },
        {
          key: 'divider_1',
          itemType: ContextualMenuItemType.Divider,
        },
        {
          key: 'clear',
          text: 'Clear categories',
        },
        {
          key: 'manage',
          text: 'Manage categories',
        },
      ],
    },
  },
];

const menuProps: IContextualMenuProps = {
  shouldFocusOnMount: true,
  directionalHint: DirectionalHint.bottomLeftEdge,
  className: 'ms-ContextualMenu-customizationExample',
  items: menuItems,
};
