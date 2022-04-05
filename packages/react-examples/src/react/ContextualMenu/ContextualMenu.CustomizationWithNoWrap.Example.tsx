import * as React from 'react';
import { ContextualMenuItemType, DirectionalHint, IContextualMenuProps } from '@fluentui/react/lib/ContextualMenu';
import { DefaultButton, IconButton } from '@fluentui/react/lib/Button';
import { FocusZoneDirection } from '@fluentui/react/lib/FocusZone';
import { mergeStyleSets } from '@fluentui/react/lib/Styling';
import { css } from '@fluentui/react/lib/Utilities';
import { useConst } from '@fluentui/react-hooks';

export const ContextualMenuCustomizationWithNoWrapExample: React.FunctionComponent = () => {
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
        className: 'Charm-List',
        ariaLabel: 'Charm. Press enter, space or right arrow keys to open submenu.',
        subMenuProps: {
          focusZoneProps: {
            direction: FocusZoneDirection.bidirectional,
            checkForNoWrap: true,
          },
          items: [
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
            { key: 'item3', text: 'Item 3', 'data-no-horizontal-wrap': true },
            { key: 'item4', text: 'Item 4', 'data-no-horizontal-wrap': true },
          ],
        },
      },
      {
        key: 'categories',
        text: 'Categorize',
        ariaLabel: 'Categorize. Press enter, space or right arrow keys to open submenu.',
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
            { key: 'clear', text: 'Additional Item' },
            { key: 'manage', text: 'Additional Item' },
          ],
        },
      },
    ],
  }));

  return <DefaultButton text="Click for ContextualMenu" menuProps={menuProps} />;
};

function renderCharmMenuItem(item: any, dismissMenu: () => void): JSX.Element {
  return (
    <IconButton
      {...item}
      iconProps={{ iconName: item.text }}
      className="ms-ContextualMenu-link"
      data-is-focusable
      onClick={dismissMenu}
      data-no-vertical-wrap
    />
  );
}

function renderCategoriesList(item: any): JSX.Element {
  return (
    <ul className={classNames.categoriesList}>
      <li className="ms-ContextualMenu-item">
        {item.categoryList.map((category: ICategoryList) => (
          <DefaultButton
            key={category.name}
            className={css('ms-ContextualMenu-link', classNames.button)}
            role="menuitemcheckbox"
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

interface ICategoryList {
  name: string;
  color: string;
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
