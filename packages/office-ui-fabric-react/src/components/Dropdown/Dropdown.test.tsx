/* tslint:disable:no-unused-variable */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
/* tslint:enable:no-unused-variable */
import * as ReactTestUtils from 'react-addons-test-utils';

let { expect } = chai;

import { Dropdown } from './Dropdown';
import { IDropdownOption } from './Dropdown.Props';

const DEFAULT_OPTIONS: IDropdownOption[] = [
  { key: '1', text: '1' },
  { key: '2', text: '2' },
  { key: '3', text: '3' }
];

describe('Dropdown', () => {

  it('Can flip between enabled and disabled.', () => {

    let container = document.createElement('div');
    ReactDOM.render(
      <Dropdown
        label='testgroup'
        options={ DEFAULT_OPTIONS }
      />,
      container);
    let dropdownRoot = container.querySelector('.ms-Dropdown') as HTMLElement;

    expect(dropdownRoot.className).not.contains('is-disabled', `shouldn't be disabled`);
    expect(dropdownRoot.getAttribute('data-is-focusable')).equals('true', 'data-is-focusable');

    ReactDOM.render(
      <Dropdown
        disabled={ true }
        label='testgroup'
        options={ DEFAULT_OPTIONS }
      />,
      container);

    expect(dropdownRoot.className).contains('is-disabled', `should be disabled`);
    expect(dropdownRoot.getAttribute('data-is-focusable')).equals('false', 'data-is-focusable');
  });

  it('Renders no selected item in default case', () => {
    let container = document.createElement('div');

    ReactDOM.render(
      <Dropdown
        label='testgroup'
        options={ DEFAULT_OPTIONS }
      />,
      container);
    let dropdownRoot = container.querySelector('.ms-Dropdown') as HTMLElement;
    let titleElement = dropdownRoot.querySelector('.ms-Dropdown-title');

    expect(titleElement.textContent).equals('');
  });

  it('Renders a selected item in uncontrolled case', () => {
    let container = document.createElement('div');

    ReactDOM.render(
      <Dropdown
        label='testgroup'
        defaultSelectedKey='1'
        options={ DEFAULT_OPTIONS }
      />,
      container);
    let dropdownRoot = container.querySelector('.ms-Dropdown') as HTMLElement;
    let titleElement = dropdownRoot.querySelector('.ms-Dropdown-title');

    expect(titleElement.textContent).equals('1');
  });

  it('Renders a selected item in controlled case', () => {
    let container = document.createElement('div');

    ReactDOM.render(
      <Dropdown
        label='testgroup'
        selectedKey='1'
        options={ DEFAULT_OPTIONS }
      />,
      container);
    let dropdownRoot = container.querySelector('.ms-Dropdown') as HTMLElement;
    let titleElement = dropdownRoot.querySelector('.ms-Dropdown-title');

    expect(titleElement.textContent).equals('1');
  });

  it('Can change items in uncontrolled case', () => {
    let container = document.createElement('div');
    let dropdownRoot;

    document.body.appendChild(container);

    try {
      ReactDOM.render(
        <Dropdown
          label='testgroup'
          defaultSelectedKey='1'
          options={ DEFAULT_OPTIONS }
        />,
        container);
      dropdownRoot = container.querySelector('.ms-Dropdown') as HTMLElement;

      ReactTestUtils.Simulate.click(dropdownRoot);

      let secondItemElement = document.querySelector('.ms-Dropdown-item[data-index="1"]');
      ReactTestUtils.Simulate.click(secondItemElement);
    }
    finally {
      expect(dropdownRoot.querySelector('.ms-Dropdown-title').textContent).equals('2');
    }
  });

});