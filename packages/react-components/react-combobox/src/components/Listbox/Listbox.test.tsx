import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Listbox } from './Listbox';
import { Option } from '../Option/index';
import { isConformant } from '../../common/isConformant';

describe('Listbox', () => {
  isConformant({
    Component: Listbox,
    displayName: 'Listbox',
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

  it('should move active option with arrow down', () => {
    const { getByTestId, getByText } = render(
      <Listbox data-testid="listbox">
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Listbox>,
    );

    const listbox = getByTestId('listbox');

    fireEvent.keyDown(listbox, { key: 'ArrowDown' });
    expect(listbox.getAttribute('aria-activedescendant')).toEqual(getByText('Red').id);

    fireEvent.keyDown(listbox, { key: 'ArrowDown' });
    expect(listbox.getAttribute('aria-activedescendant')).toEqual(getByText('Green').id);
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

    expect(getByText('Green').getAttribute('aria-selected')).toEqual('true');
    expect(getByText('Red').getAttribute('aria-selected')).toEqual('true');
    expect(getByText('Blue').getAttribute('aria-selected')).toEqual('false');
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

    expect(getByText('Green').getAttribute('aria-selected')).toEqual('true');
    expect(getByText('Red').getAttribute('aria-selected')).toEqual('true');
  });

  it('should fire onChange when an option is selected', () => {
    const onSelect = jest.fn();

    const { getByText } = render(
      <Listbox onSelect={onSelect}>
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Listbox>,
    );

    fireEvent.click(getByText('Red'));

    expect(onSelect).toHaveBeenCalled();
    expect(onSelect.mock.calls[0][1]).toEqual({ optionValue: 'Red', selectedOptions: ['Red'] });
  });

  it('should not change selection with selectedOptions', () => {
    const onSelect = jest.fn();

    const { getByText } = render(
      <Listbox onSelect={onSelect} selectedOptions={['Green']}>
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Listbox>,
    );

    const option = getByText('Red');

    fireEvent.click(option);

    expect(option.getAttribute('aria-selected')).toEqual('false');
    expect(onSelect).toHaveBeenCalled();
    expect(onSelect.mock.calls[0][1]).toEqual({ optionValue: 'Red', selectedOptions: ['Red'] });
  });

  it('should select option with the enter key', () => {
    const onSelect = jest.fn();

    const { getByTestId } = render(
      <Listbox data-testid="listbox" onSelect={onSelect}>
        <Option data-testid="red">Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Listbox>,
    );

    const listbox = getByTestId('listbox');
    fireEvent.keyDown(listbox, { key: 'ArrowDown' });
    fireEvent.keyDown(listbox, { key: 'Enter' });

    expect(getByTestId('red').getAttribute('aria-selected')).toEqual('true');
    expect(onSelect).toHaveBeenCalled();
  });

  it('should select option with the space key', () => {
    const onSelect = jest.fn();

    const { getByTestId } = render(
      <Listbox data-testid="listbox" onSelect={onSelect}>
        <Option data-testid="red">Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Listbox>,
    );

    const listbox = getByTestId('listbox');
    fireEvent.keyDown(listbox, { key: 'ArrowDown' });
    fireEvent.keyDown(listbox, { key: ' ' });

    expect(getByTestId('red').getAttribute('aria-selected')).toEqual('true');
    expect(onSelect).toHaveBeenCalled();
  });
});
