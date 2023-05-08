import * as React from 'react';
import {
  ContextualMenuItemType,
  DirectionalHint,
  IContextualMenuProps,
  IContextualMenuItem,
} from '@fluentui/react/lib/ContextualMenu';
import { DefaultButton, IconButton } from '@fluentui/react/lib/Button';
import { FocusZoneDirection } from '@fluentui/react/lib/FocusZone';
import { mergeStyleSets } from '@fluentui/react/lib/Styling';
import { css } from '@fluentui/react/lib/Utilities';
import { useConst } from '@fluentui/react-hooks';

export const ContextualMenuExample: React.FunctionComponent = () => {
  const menuProps = useConst<IContextualMenuProps>(() => ({
    shouldFocusOnMount: true,
    directionalHint: DirectionalHint.bottomLeftEdge,
    className: classNames.menu,
    items: [
      { key: 'newItem', text: 'New' },
      { key: 'upload', text: 'Upload' },
      { key: 'divider_1', itemType: ContextualMenuItemType.Divider },
      {
        key: 'charm',
        text: 'Charm',
        subMenuProps: {
          focusZoneProps: { direction: FocusZoneDirection.bidirectional },
          items: [
            { key: 'none', text: 'None' },
            { key: 'bulb', text: 'Lightbulb', onRender: renderCharmMenuItem, className: classNames.item },
            { key: 'run', text: 'Running', onRender: renderCharmMenuItem, className: classNames.item },
            { key: 'plane', text: 'Airplane', onRender: renderCharmMenuItem, className: classNames.item },
            { key: 'page', text: 'Page', onRender: renderCharmMenuItem, className: classNames.item },
            { key: 'cake', text: 'Cake', onRender: renderCharmMenuItem, className: classNames.item },
            { key: 'soccer', text: 'Soccer', onRender: renderCharmMenuItem, className: classNames.item },
            { key: 'home', text: 'Home', onRender: renderCharmMenuItem, className: classNames.item },
            { key: 'emoji', text: 'Emoji2', onRender: renderCharmMenuItem, className: classNames.item },
            { key: 'work', text: 'Work', onRender: renderCharmMenuItem, className: classNames.item },
            { key: 'coffee', text: 'Coffee', onRender: renderCharmMenuItem, className: classNames.item },
            { key: 'people', text: 'People', onRender: renderCharmMenuItem, className: classNames.item },
            { key: 'stopwatch', text: 'Stopwatch', onRender: renderCharmMenuItem, className: classNames.item },
            { key: 'music', text: 'MusicInCollectionFill', onRender: renderCharmMenuItem, className: classNames.item },
            { key: 'lock', text: 'Lock', onRender: renderCharmMenuItem, className: classNames.item },
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
                { name: 'Personal', color: 'yellow' },
                { name: 'Work', color: 'green' },
                { name: 'Birthday', color: 'blue' },
                { name: 'Spam', color: 'grey' },
                { name: 'Urgent', color: 'red' },
                { name: 'Hobbies', color: 'black' },
              ],
              onRender: renderCategoriesList,
            },
            { key: 'divider_1', itemType: ContextualMenuItemType.Divider },
            { key: 'clear', text: 'Clear categories' },
            { key: 'manage', text: 'Manage categories' },
          ],
        },
      },
    ],
  }));
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  return <DefaultButton text="Click for ContextualMenu" menuProps={menuProps} />;
};

function renderCharmMenuItem(item: IContextualMenuItem, dismissMenu: () => void): JSX.Element {
  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    <IconButton
      iconProps={{ iconName: item.text }}
      className="ms-ContextualMenu-link"
      data-is-focusable
      onClick={dismissMenu}
    />
  );
}

function renderCategoriesList(item: IContextualMenuItem): JSX.Element {
  return (
    <ul className={classNames.categoriesList}>
      <li className="ms-ContextualMenu-item">
        {item.categoryList.map((category: { name: string; color: string }) => (
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          <DefaultButton
            className={css('ms-ContextualMenu-link', classNames.button)}
            role="menuitem"
            key={category.name}
          >
            <div>
              <span style={{ backgroundColor: category.color, width: 24, height: 24, verticalAlign: 'top' }} />
              <span className="ms-ContextualMenu-itemText">{category.name}</span>
            </div>
          </DefaultButton>
        ))}
      </li>
    </ul>
  );
}

const classNames = mergeStyleSets({
  menu: {
    textAlign: 'center',
    maxWidth: 180,
    selectors: {
      '.ms-ContextualMenu-item': {
        height: 'auto',
      },
    },
  },
  item: {
    display: 'inline-block',
    width: 40,
    height: 40,
    lineHeight: 40,
    textAlign: 'center',
    verticalAlign: 'middle',
    marginBottom: 8,
    cursor: 'pointer',
    selectors: {
      '&:hover': {
        backgroundColor: '#eaeaea',
      },
    },
  },
  categoriesList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  button: {
    width: '40%',
    margin: '2%',
  },
});
