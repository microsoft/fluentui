/* tslint:disable:no-unused-variable */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
/* tslint:enable:no-unused-variable */

import * as ReactTestUtils from 'react-addons-test-utils';

let { expect } = chai;

import { Dropdown } from './Dropdown';
import { IDropdownOption } from './Dropdown.Props';

describe('Dropdown', () => {

  it('Can flip between enabled and disabled.', () => {
    const options: IDropdownOption[] = [
      { key: '1', text: '1' },
      { key: '2', text: '2' },
      { key: '3', text: '3' }
    ];
    let container = document.createElement('div');
    ReactDOM.render(
      <Dropdown
        label='testgroup'
        options={ options }
        />,
      container);
    let dropdownRoot = container.querySelector('.ms-Dropdown') as HTMLElement;

    expect(dropdownRoot.className).not.contains('is-disabled', `shouldn't be disabled`);

    ReactDOM.render(
      <Dropdown
        disabled={ true }
        label='testgroup'
        options={ options }
        />,
      container);

    expect(dropdownRoot.className).contains('is-disabled', `should be disabled`);
  });

});