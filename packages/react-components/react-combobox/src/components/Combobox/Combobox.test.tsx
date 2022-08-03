import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Combobox } from './Combobox';
import { Option } from '../Option/index';
import { isConformant } from '../../common/isConformant';

describe('Combobox', () => {
  isConformant({
    Component: Combobox,
    displayName: 'Combobox',
    primarySlot: 'input',
    testOptions: {
      'has-static-classnames': [
        {
          props: {
            open: true,
            // Portal messes with the classNames test, so rendering the listbox inline here
            inlinePopup: true,
          },
        },
      ],
    },
  });

  it('renders a default state', () => {
    const result = render(
      <Combobox>
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Combobox>,
    );
    expect(result.container).toMatchSnapshot();
  });

  it('renders an open listbox', () => {
    const result = render(
      <Combobox open inlinePopup>
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Combobox>,
    );
    expect(result.container).toMatchSnapshot();
  });

  it('renders the popup under document.body by default', () => {
    const { container } = render(
      <Combobox open>
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Combobox>,
    );
    expect(container.querySelector('[role=listbox]')).toBeNull();
    expect(document.body.querySelector('[role=listbox]')).not.toBeNull();
  });

  it('renders the popup inline when specified', () => {
    const { container } = render(
      <Combobox open inlinePopup>
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Combobox>,
    );
    expect(container.querySelector('[role=listbox]')).not.toBeNull();
  });

  /* open/close tests */
  it('opens the popup on click', () => {
    const { getByRole } = render(
      <Combobox>
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Combobox>,
    );

    fireEvent.click(getByRole('combobox'));

    expect(getByRole('listbox')).not.toBeNull();
    expect(getByRole('combobox').getAttribute('aria-expanded')).toEqual('true');
  });

  it('closes the popup on click with defaultOpen', () => {
    const { getByRole, queryByRole } = render(
      <Combobox defaultOpen>
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Combobox>,
    );

    const combobox = getByRole('combobox');

    expect(getByRole('listbox')).not.toBeNull();
    expect(combobox.getAttribute('aria-expanded')).toEqual('true');

    fireEvent.click(combobox);

    expect(queryByRole('listbox')).toBeNull();
    expect(combobox.getAttribute('aria-expanded')).toEqual('false');
  });

  it('does not close the combobox on click with controlled open', () => {
    const { getByRole } = render(
      <Combobox open>
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Combobox>,
    );

    expect(getByRole('listbox')).not.toBeNull();

    fireEvent.click(getByRole('combobox'));

    expect(getByRole('listbox')).not.toBeNull();
  });

  it('opens the popup on enter', () => {
    const { getByRole } = render(
      <Combobox>
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Combobox>,
    );

    fireEvent.keyDown(getByRole('combobox'), { key: 'Enter' });

    expect(getByRole('listbox')).not.toBeNull();
    expect(getByRole('combobox').getAttribute('aria-expanded')).toEqual('true');
  });

  it('opens and closes the popup with alt + arrow keys', () => {
    const { getByRole, queryByRole } = render(
      <Combobox>
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Combobox>,
    );

    fireEvent.keyDown(getByRole('combobox'), { key: 'ArrowDown', altKey: true });

    expect(getByRole('listbox')).not.toBeNull();

    fireEvent.keyDown(getByRole('combobox'), { key: 'ArrowUp', altKey: true });

    expect(queryByRole('listbox')).toBeNull();
  });

  it('closes the popup with escape', () => {
    const { getByRole, queryByRole } = render(
      <Combobox defaultOpen>
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Combobox>,
    );

    fireEvent.keyDown(getByRole('combobox'), { key: 'Escape' });

    expect(queryByRole('listbox')).toBeNull();
  });

  it('fires onOpen callback', () => {
    const onOpen = jest.fn();

    const { getByRole } = render(
      <Combobox onOpenChange={onOpen}>
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Combobox>,
    );

    fireEvent.click(getByRole('combobox'));

    expect(onOpen).toHaveBeenCalledTimes(1);
    expect(onOpen.mock.calls[0][1]).toEqual({ open: true });
  });

  /* Selection */
  it('should set defaultSelectedOptions', () => {
    const { getByTestId } = render(
      <Combobox open defaultSelectedOptions={['Green']}>
        <Option>Red</Option>
        <Option data-testid="green">Green</Option>
        <Option>Blue</Option>
      </Combobox>,
    );

    expect(getByTestId('green').getAttribute('aria-selected')).toEqual('true');
  });

  it('should set multiple defaultSelectedOptions', () => {
    const { getByTestId } = render(
      <Combobox open multiselect defaultSelectedOptions={['Green', 'Red']}>
        <Option data-testid="red">Red</Option>
        <Option data-testid="green">Green</Option>
        <Option data-testid="blue">Blue</Option>
      </Combobox>,
    );

    expect(getByTestId('green').getAttribute('aria-selected')).toEqual('true');
    expect(getByTestId('red').getAttribute('aria-selected')).toEqual('true');
    expect(getByTestId('blue').getAttribute('aria-selected')).toEqual('false');
  });

  it('should set selectedOptions', () => {
    const { getByTestId } = render(
      <Combobox open selectedOptions={['Green']}>
        <Option>Red</Option>
        <Option data-testid="green">Green</Option>
        <Option>Blue</Option>
      </Combobox>,
    );

    expect(getByTestId('green').getAttribute('aria-selected')).toEqual('true');
  });

  it('should change defaultSelectedOptions on click', () => {
    const { getByTestId } = render(
      <Combobox open defaultSelectedOptions={['Green']}>
        <Option data-testid="red">Red</Option>
        <Option data-testid="green">Green</Option>
        <Option>Blue</Option>
      </Combobox>,
    );

    fireEvent.click(getByTestId('red'));

    expect(getByTestId('green').getAttribute('aria-selected')).toEqual('false');
    expect(getByTestId('red').getAttribute('aria-selected')).toEqual('true');
  });

  it('selects an option on click', () => {
    const { getByTestId, getByRole } = render(
      <Combobox defaultOpen>
        <Option data-testid="red">Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Combobox>,
    );

    fireEvent.click(getByTestId('red'));

    expect((getByRole('combobox') as HTMLInputElement).value).toEqual('Red');
  });

  it('selects an option on enter and space', () => {
    const { getByTestId, getByRole } = render(
      <Combobox open data-testid="combobox">
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Combobox>,
    );

    const combobox = getByTestId('combobox');

    fireEvent.keyDown(combobox, { key: 'Enter' });

    expect((getByRole('combobox') as HTMLInputElement).value).toEqual('Red');

    fireEvent.keyDown(combobox, { key: 'ArrowDown' });
    fireEvent.keyDown(combobox, { key: ' ' });

    expect((getByRole('combobox') as HTMLInputElement).value).toEqual('Green');
  });

  it('does not select a disabled option with the keyboard', () => {
    const { getByTestId, getByRole } = render(
      <Combobox open data-testid="combobox">
        <Option disabled>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Combobox>,
    );

    const combobox = getByTestId('combobox');

    fireEvent.keyDown(combobox, { key: 'Enter' });

    expect((getByRole('combobox') as HTMLInputElement).value).toEqual('');
  });

  it('selects an option when tabbing away from an open combobox', () => {
    const { getByTestId, getByRole } = render(
      <Combobox defaultOpen data-testid="combobox">
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Combobox>,
    );

    const combobox = getByTestId('combobox');
    fireEvent.keyDown(combobox, { key: 'Tab' });

    expect((getByRole('combobox') as HTMLInputElement).value).toEqual('Red');
  });

  it('adds to selection for multiselect', () => {
    const { getByText } = render(
      <Combobox open multiselect defaultSelectedOptions={['Red']}>
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Combobox>,
    );

    fireEvent.click(getByText('Green'));

    expect(getByText('Red', { selector: '[role=option]' }).getAttribute('aria-selected')).toEqual('true');
    expect(getByText('Green').getAttribute('aria-selected')).toEqual('true');
    expect(getByText('Blue').getAttribute('aria-selected')).toEqual('false');
  });

  it('stays open on click for multiselect', () => {
    const { getByText, getByRole } = render(
      <Combobox defaultOpen multiselect>
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Combobox>,
    );

    fireEvent.click(getByText('Green'));

    expect(getByRole('listbox')).not.toBeNull();
  });

  it('should respect value over selected options', () => {
    const { getByRole } = render(
      <Combobox value="foo" selectedOptions={['Green']}>
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Combobox>,
    );

    expect((getByRole('combobox') as HTMLInputElement).value).toEqual('foo');
  });

  it('should change defaultValue on select', () => {
    const { getByRole, getByText } = render(
      <Combobox defaultValue="foo" defaultOpen>
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Combobox>,
    );

    fireEvent.click(getByText('Green'));

    expect((getByRole('combobox') as HTMLInputElement).value).toEqual('Green');
  });

  it('should not change value on select', () => {
    const { getByRole, getByText } = render(
      <Combobox value="Red" defaultOpen>
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Combobox>,
    );

    fireEvent.click(getByText('Green'));

    expect((getByRole('combobox') as HTMLInputElement).value).toEqual('Red');
  });

  /* Active option */
  it('should set active option on click', () => {
    const { getByTestId } = render(
      <Combobox open data-testid="combobox">
        <Option>Red</Option>
        <Option data-testid="clicked">Green</Option>
        <Option>Blue</Option>
      </Combobox>,
    );

    const option = getByTestId('clicked');
    fireEvent.click(option);

    expect(getByTestId('combobox').getAttribute('aria-activedescendant')).toEqual(option.id);
  });

  it('should move active option with arrow down', () => {
    const { getByTestId, getByText } = render(
      <Combobox defaultOpen data-testid="combobox">
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Combobox>,
    );

    const combobox = getByTestId('combobox');

    fireEvent.keyDown(combobox, { key: 'ArrowDown' });
    expect(combobox.getAttribute('aria-activedescendant')).toEqual(getByText('Green').id);
  });

  it('should move active option with arrow up', () => {
    const { getByTestId, getByText } = render(
      <Combobox open data-testid="combobox">
        <Option>Red</Option>
        <Option>Green</Option>
        <Option>Blue</Option>
      </Combobox>,
    );

    const combobox = getByTestId('combobox');

    fireEvent.click(getByText('Blue'));

    fireEvent.keyDown(combobox, { key: 'ArrowUp' });
    expect(combobox.getAttribute('aria-activedescendant')).toEqual(getByText('Green').id);
  });
});
