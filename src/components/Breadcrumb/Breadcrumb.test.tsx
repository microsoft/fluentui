/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */

import * as ReactDOM from 'react-dom';
import * as ReactTestUtils from 'react-addons-test-utils';

let { expect } = chai;

import { Breadcrumb } from './Breadcrumb';
import { IBreadcrumbItem } from './Breadcrumb.Props';

describe('Breadcrumb', () => {

  it('can call the callback when an item is clicked', () => {
    let callbackValue;
    const clickCallback = (ev: React.MouseEvent, item: IBreadcrumbItem) => {
      callbackValue = item.key;
    };

    const items: IBreadcrumbItem[] = [
      {text: 'TestText', key: 'TestKey', onClick: clickCallback}
    ];

    let component = ReactTestUtils.renderIntoDocument(
      <Breadcrumb
        items={items}
      />
    );

    let renderedDOM = ReactDOM.findDOMNode(component);
    let itemLink = renderedDOM.querySelector('.ms-Breadcrumb-itemLink');

    ReactTestUtils.Simulate.click(itemLink);
    expect(callbackValue).to.equal('TestKey');
  });

});
