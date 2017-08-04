/* tslint:disable:no-unused-variable */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
/* tslint:enable:no-unused-variable */
import * as ReactTestUtils from 'react-addons-test-utils';

let { expect } = chai;

import {
  KeyCodes,
} from '../../Utilities';
import { Dropdown } from './Dropdown';
import { DropdownMenuItemType, IDropdownOption } from './Dropdown.Props';

const DEFAULT_OPTIONS: IDropdownOption[] = [
  { key: 'Header1', text: 'Header 1', itemType: DropdownMenuItemType.Header },
  { key: '1', text: '1' },
  { key: '2', text: '2' },
  { key: '3', text: '3' },
  { key: 'Divider1', text: '-', itemType: DropdownMenuItemType.Divider },
  { key: 'Header2', text: 'Header 2', itemType: DropdownMenuItemType.Header },
  { key: '4', text: '4' },
  { key: '5', text: '5' },
  { key: '6', text: '6' },
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
    let titleElement = dropdownRoot.querySelector('.ms-Dropdown-title') as HTMLElement;

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
    let titleElement = dropdownRoot.querySelector('.ms-Dropdown-title') as HTMLElement;

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
    let titleElement = dropdownRoot.querySelector('.ms-Dropdown-title') as HTMLElement;

    expect(titleElement.textContent).equals('1');
  });

  it('Can change items in uncontrolled case', () => {
    let container = document.createElement('div');
    let dropdownRoot: HTMLElement | undefined;

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

      let secondItemElement = document.querySelector('.ms-Dropdown-item[data-index="2"]') as HTMLElement;
      ReactTestUtils.Simulate.click(secondItemElement);
    }
    finally {
      expect(dropdownRoot!.querySelector('.ms-Dropdown-title')!.textContent).equals('2');
    }
  });

  it('Will select the first valid item on keypress', () => {
    let container = document.createElement('div');

    ReactDOM.render(
      <Dropdown
        label='testgroup'
        options={ DEFAULT_OPTIONS }
      />,
      container);
    let dropdownRoot = container.querySelector('.ms-Dropdown') as HTMLElement;
    ReactTestUtils.Simulate.keyDown(dropdownRoot, { which: KeyCodes.down });

    let titleElement = dropdownRoot.querySelector('.ms-Dropdown-title') as HTMLElement;
    expect(titleElement.textContent).equals('1');
  });

  it('Will select the first valid item on Home keypress', () => {
    let container = document.createElement('div');

    ReactDOM.render(
      <Dropdown
        label='testgroup'
        options={ DEFAULT_OPTIONS }
      />,
      container);
    let dropdownRoot = container.querySelector('.ms-Dropdown') as HTMLElement;
    ReactTestUtils.Simulate.keyDown(dropdownRoot, { which: KeyCodes.home });

    let titleElement = dropdownRoot.querySelector('.ms-Dropdown-title') as HTMLElement;
    expect(titleElement.textContent).equals('1');
  });

  it('Will select the last valid item on End keypress', () => {
    let container = document.createElement('div');

    ReactDOM.render(
      <Dropdown
        label='testgroup'
        options={ DEFAULT_OPTIONS }
      />,
      container);
    let dropdownRoot = container.querySelector('.ms-Dropdown') as HTMLElement;
    ReactTestUtils.Simulate.keyDown(dropdownRoot, { which: KeyCodes.end });

    let titleElement = dropdownRoot.querySelector('.ms-Dropdown-title') as HTMLElement;
    expect(titleElement.textContent).equals('6');
  });

  it('Will skip over headers and separators on keypress', () => {
    let container = document.createElement('div');
    let dropdownRoot;
    let titleElement;

    document.body.appendChild(container);
    ReactDOM.render(
      <Dropdown
        label='testgroup'
        options={ DEFAULT_OPTIONS }
      />,
      container);
    dropdownRoot = container.querySelector('.ms-Dropdown') as HTMLElement;

    ReactTestUtils.Simulate.keyDown(dropdownRoot, { which: KeyCodes.down });
    titleElement = dropdownRoot.querySelector('.ms-Dropdown-title') as HTMLElement;
    expect(titleElement.textContent).equals('1');

    ReactTestUtils.Simulate.keyDown(dropdownRoot, { which: KeyCodes.down });
    ReactTestUtils.Simulate.keyDown(dropdownRoot, { which: KeyCodes.down });
    ReactTestUtils.Simulate.keyDown(dropdownRoot, { which: KeyCodes.down });
    titleElement = dropdownRoot.querySelector('.ms-Dropdown-title') as HTMLElement;
    expect(titleElement.textContent).equals('4');
  });
});