/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */

import * as ReactDOM from 'react-dom';
import * as ReactTestUtils from 'react-addons-test-utils';

let { expect } = chai;

import { ContextualMenu } from './ContextualMenu';
import { IContextualMenuItem } from './ContextualMenu.Props';

describe('ContextualMenu', () => {

  it('does not have a scrollbar due to an overflowing icon', () => {
    const items: IContextualMenuItem[] = [
      { name: 'TestText 1', key: 'TestKey1', canCheck: true, isChecked: true },
      { name: 'TestText 2', key: 'TestKey2', canCheck: true, isChecked: true },
      { name: 'TestText 3', key: 'TestKey3', canCheck: true, isChecked: true },
      { name: 'TestText 4', key: 'TestKey4', canCheck: true, isChecked: true },
    ];

    let component = ReactTestUtils.renderIntoDocument<ContextualMenu>(
      <ContextualMenu
        items={ items }
        />
    );

    let renderedDOM = ReactDOM.findDOMNode(component as React.ReactInstance);
    let menuList = document.querySelector('.ms-ContextualMenu-list') as HTMLUListElement;

    expect(menuList.scrollHeight).to.be.lte(menuList.offsetHeight, 'ContextualMenu is showing a scrollbar due to checkmark');
  });

});
