import * as React from 'react';
import { render } from '@testing-library/react';
import { ContextualMenuButton } from './ContextualMenuButton';
import type { IContextualMenuItem } from '../ContextualMenu.types';
import type { IMenuItemClassNames } from '../ContextualMenu.classNames';

describe('ContextualMenuButton', () => {
  describe('creates a normal button', () => {
    let menuItem: IContextualMenuItem;
    let menuClassNames: IMenuItemClassNames;

    beforeEach(() => {
      menuItem = { key: '123' };
      menuClassNames = getMenuItemClassNames();
    });

    it('renders the contextual menu split button correctly', () => {
      const { container } = render(
        <ContextualMenuButton
          item={menuItem}
          classNames={menuClassNames}
          index={0}
          focusableElementIndex={0}
          totalItemCount={1}
        />,
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});

function getMenuItemClassNames(): IMenuItemClassNames {
  return {
    item: 'item',
    divider: '---',
    root: 'root',
    linkContent: 'linkContent',
    icon: 'icon',
    checkmarkIcon: 'checkmarkIcon',
    subMenuIcon: 'subMenuIcon',
    label: 'label',
    secondaryText: 'secondaryText',
    splitContainer: 'splitContainer',
    splitPrimary: 'splitPrimary',
    splitMenu: 'splitMenu',
    linkContentMenu: 'linkContentMenu',
    screenReaderText: 'screenReaderText',
  };
}
