import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Listbox } from './Listbox';
import { Option } from '../Option/index';
import { isConformant } from '../../testing/isConformant';

describe('Listbox', () => {
  isConformant({
    Component: Listbox,
    displayName: 'Listbox',
    testOptions: {
      'consistent-callback-args': {
        legacyCallbacks: ['onOptionSelect'],
      },
    },
  });

  it('renders a default state', () => {
    const result = render(
      <Listbox>
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Listbox>,
    );
    expect(result.container).toMatchSnapshot();
  });

  it('renders with a selected option', () => {
    const result = render(
      <Listbox selectedOptions={['Red']}>
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Listbox>,
    );
    expect(result.container).toMatchSnapshot();
  });

  it('uses lisbox/option semantics for single-select', () => {
    const { getAllByRole } = render(
      <Listbox>
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Listbox>,
    );
    expect(getAllByRole('listbox').length).toEqual(1);
    expect(getAllByRole('option').length).toEqual(3);
  });

  it('uses menu/menuitemcheckbox semantics for multi-select', () => {
    const { getAllByRole } = render(
      <Listbox multiselect>
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Listbox>,
    );
    expect(getAllByRole('menu').length).toEqual(1);
    expect(getAllByRole('menuitemcheckbox').length).toEqual(3);
  });

  /* Moving activeOption */
  it('should set active option on click', () => {
    const { getByTestId } = render(
      <Listbox data-testid="listbox">
        <Option>Red</Option>
        <Option data-testid="clicked">Green</Option>
        <Option>Blue</Option>
      </Listbox>,
    );

    const option = getByTestId('clicked');
    fireEvent.click(option);

    expect(getByTestId('listbox').getAttribute('aria-activedescendant')).toEqual(option.id);
  });

  it('should set active option to first option if nothing is selected', () => {
    const { getByTestId } = render(
      <Listbox data-testid="listbox">
        <Option data-testid="firstOption">Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Listbox>,
    );

    const firstOption = getByTestId('firstOption');
    expect(getByTestId('listbox').getAttribute('aria-activedescendant')).toEqual(firstOption.id);
  });

  it('should set active option to first selected option if one is selected', () => {
    const { getByTestId } = render(
      <Listbox data-testid="listbox" selectedOptions={['Green']}>
        <Option>Red</Option>
        <Option data-testid="firstSelectedOption">Green</Option>
        <Option>Blue</Option>
      </Listbox>,
    );

    const selectedOption = getByTestId('firstSelectedOption');
    expect(getByTestId('listbox').getAttribute('aria-activedescendant')).toEqual(selectedOption.id);
  });

  it('should set active option to first option, not selected options if multiselect', () => {
    const { getByTestId } = render(
      <Listbox data-testid="listbox" multiselect={true} selectedOptions={['Green', 'Blue']}>
        <Option data-testid="firstOption">Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Listbox>,
    );

    const firstOption = getByTestId('firstOption');
    expect(getByTestId('listbox').getAttribute('aria-activedescendant')).toEqual(firstOption.id);
  });

  it('should preserve active option on last active option on blur and focus', () => {
    const { getByTestId } = render(
      <Listbox data-testid="listbox" selectedOptions={[]}>
        <Option data-testid="redOption">Red</Option>
        <Option data-testid="greenOption">Green</Option>
        <Option data-testid="blueOption">Blue</Option>
      </Listbox>,
    );

    expect(getByTestId('listbox').getAttribute('aria-activedescendant')).toEqual(getByTestId('redOption').id);

    fireEvent.keyDown(getByTestId('listbox'), { key: 'ArrowDown' });

    expect(getByTestId('listbox').getAttribute('aria-activedescendant')).toEqual(getByTestId('greenOption').id);

    fireEvent.blur(getByTestId('listbox'));
    fireEvent.focus(getByTestId('listbox'));

    expect(getByTestId('listbox').getAttribute('aria-activedescendant')).toEqual(getByTestId('greenOption').id);
  });

  it('should move active option with arrow down', () => {
    const { getByTestId, getByText } = render(
      <Listbox data-testid="listbox">
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Listbox>,
    );

    const listbox = getByTestId('listbox');

    expect(listbox.getAttribute('aria-activedescendant')).toEqual(getByText('Red').id);

    fireEvent.keyDown(listbox, { key: 'ArrowDown' });
    expect(listbox.getAttribute('aria-activedescendant')).toEqual(getByText('Green').id);

    fireEvent.keyDown(listbox, { key: 'ArrowDown' });
    expect(listbox.getAttribute('aria-activedescendant')).toEqual(getByText('Blue').id);
  });

  it('should move active option with arrow up', () => {
    const { getByTestId, getByText } = render(
      <Listbox data-testid="listbox">
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Listbox>,
    );

    const listbox = getByTestId('listbox');

    fireEvent.click(getByText('Blue'));

    fireEvent.keyDown(listbox, { key: 'ArrowUp' });
    expect(listbox.getAttribute('aria-activedescendant')).toEqual(getByText('Green').id);
  });

  it('should not wrap from bottom to top with arrow keys', () => {
    const { getByTestId, getByText } = render(
      <Listbox data-testid="listbox">
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Listbox>,
    );

    const listbox = getByTestId('listbox');
    fireEvent.keyDown(listbox, { key: 'ArrowUp' });
    fireEvent.keyDown(listbox, { key: 'ArrowUp' });

    expect(listbox.getAttribute('aria-activedescendant')).toEqual(getByText('Red').id);

    fireEvent.click(getByText('Blue'));
    fireEvent.keyDown(listbox, { key: 'ArrowDown' });

    expect(listbox.getAttribute('aria-activedescendant')).toEqual(getByText('Blue').id);
  });

  it('should move active option with pageDown', () => {
    const { getByTestId, getByText } = render(
      <Listbox data-testid="listbox">
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Listbox>,
    );

    const listbox = getByTestId('listbox');

    fireEvent.keyDown(listbox, { key: 'PageDown' });
    expect(listbox.getAttribute('aria-activedescendant')).toEqual(getByText('Blue').id);
  });

  it('should move active option with pageUp', () => {
    const { getByTestId, getByText } = render(
      <Listbox data-testid="listbox">
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Listbox>,
    );

    const listbox = getByTestId('listbox');

    fireEvent.click(getByText('Blue'));

    fireEvent.keyDown(listbox, { key: 'PageUp' });
    expect(listbox.getAttribute('aria-activedescendant')).toEqual(getByText('Red').id);
  });

  /* Selection */
  it('should set defaultSelectedOptions', () => {
    const { getByText } = render(
      <Listbox defaultSelectedOptions={['Green']}>
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Listbox>,
    );

    expect(getByText('Green').getAttribute('aria-selected')).toEqual('true');
  });

  it('should set multiple defaultSelectedOptions', () => {
    const { getByText } = render(
      <Listbox multiselect defaultSelectedOptions={['Green', 'Red']}>
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Listbox>,
    );

    expect(getByText('Green').getAttribute('aria-checked')).toEqual('true');
    expect(getByText('Red').getAttribute('aria-checked')).toEqual('true');
    expect(getByText('Blue').getAttribute('aria-checked')).toEqual('false');
  });

  it('should set selectedOptions', () => {
    const { getByText } = render(
      <Listbox selectedOptions={['Green']}>
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Listbox>,
    );

    expect(getByText('Green').getAttribute('aria-selected')).toEqual('true');
  });

  it('should change defaultSelectedOptions on click', () => {
    const { getByText } = render(
      <Listbox defaultSelectedOptions={['Green']}>
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Listbox>,
    );

    fireEvent.click(getByText('Red'));

    expect(getByText('Green').getAttribute('aria-selected')).toEqual('false');
    expect(getByText('Red').getAttribute('aria-selected')).toEqual('true');
  });

  it('should add to defaultSelectedOptions on click on multiselect', () => {
    const { getByText } = render(
      <Listbox multiselect defaultSelectedOptions={['Green']}>
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Listbox>,
    );

    fireEvent.click(getByText('Red'));

    expect(getByText('Green').getAttribute('aria-checked')).toEqual('true');
    expect(getByText('Red').getAttribute('aria-checked')).toEqual('true');
  });

  it('should fire onChange when an option is selected', () => {
    const onOptionSelect = jest.fn();

    const { getByText } = render(
      <Listbox onOptionSelect={onOptionSelect}>
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Listbox>,
    );

    fireEvent.click(getByText('Red'));

    expect(onOptionSelect).toHaveBeenCalled();
    expect(onOptionSelect.mock.calls[0][1]).toEqual({
      optionValue: 'Red',
      optionText: 'Red',
      selectedOptions: ['Red'],
    });
  });

  it('should not change selection with selectedOptions', () => {
    const onOptionSelect = jest.fn();

    const { getByText } = render(
      <Listbox onOptionSelect={onOptionSelect} selectedOptions={['Green']}>
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Listbox>,
    );

    const option = getByText('Red');

    fireEvent.click(option);

    expect(option.getAttribute('aria-selected')).toEqual('false');
    expect(onOptionSelect).toHaveBeenCalled();
    expect(onOptionSelect.mock.calls[0][1]).toEqual({
      optionValue: 'Red',
      optionText: 'Red',
      selectedOptions: ['Red'],
    });
  });

  it('should select option with the enter key', () => {
    const onOptionSelect = jest.fn();

    const { getByTestId } = render(
      <Listbox data-testid="listbox" onOptionSelect={onOptionSelect}>
        <Option data-testid="red">Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Listbox>,
    );

    const listbox = getByTestId('listbox');
    fireEvent.keyDown(listbox, { key: 'Enter' });

    expect(getByTestId('red').getAttribute('aria-selected')).toEqual('true');
    expect(onOptionSelect).toHaveBeenCalled();
  });

  it('should select option with the space key', () => {
    const onOptionSelect = jest.fn();

    const { getByTestId } = render(
      <Listbox data-testid="listbox" onOptionSelect={onOptionSelect}>
        <Option data-testid="red">Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Listbox>,
    );

    const listbox = getByTestId('listbox');
    fireEvent.keyDown(listbox, { key: ' ' });

    expect(getByTestId('red').getAttribute('aria-selected')).toEqual('true');
    expect(onOptionSelect).toHaveBeenCalled();
  });
});
