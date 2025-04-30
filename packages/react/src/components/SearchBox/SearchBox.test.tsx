import '@testing-library/jest-dom';
import * as React from 'react';
import { create } from '@fluentui/test-utilities';
import { render, screen, fireEvent } from '@testing-library/react';
import { SearchBox } from './SearchBox';
import { resetIds } from '../../Utilities';
import { isConformant } from '../../common/isConformant';
import type { ReactTestRenderer } from 'react-test-renderer';

describe('SearchBox', () => {
  let component: ReactTestRenderer | undefined;

  beforeEach(() => {
    resetIds();
  });

  afterEach(() => {
    if (component) {
      component.unmount();
      component = undefined;
    }
  });

  isConformant({
    Component: SearchBox,
    displayName: 'SearchBox',
  });

  it('renders SearchBox correctly', () => {
    component = create(<SearchBox />);
    const tree = component?.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders SearchBox role on the container div', () => {
    render(<SearchBox role="search" />);
    expect(screen.getByRole('search')).toBeInTheDocument();
  });

  it('can execute an onClick on clear button', () => {
    let clickExecuted = false;
    render(
      <SearchBox
        clearButtonProps={{
          onClick: () => (clickExecuted = true),
        }}
      />,
    );

    const input = screen.getByRole('searchbox');
    expect(input).toHaveValue('');

    fireEvent.change(input, { target: { value: 'New value' } });
    expect(input).toHaveValue('New value');

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(clickExecuted).toBe(true);
    expect(input).toHaveValue('');
  });

  it('renders SearchBox without animation correctly', () => {
    component = create(<SearchBox disableAnimation={true} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('can execute search when SearchBox is empty', () => {
    let searchExecuted = false;
    render(<SearchBox onSearch={() => (searchExecuted = true)} />);

    fireEvent.keyDown(screen.getByRole('searchbox'), { key: 'Enter', code: 'Enter', charCode: 13, keyCode: 13 });
    expect(searchExecuted).toEqual(true);
  });

  it('has a default icon with empty iconProps', () => {
    render(<SearchBox iconProps={{}} />);
    const searchIcon = '';
    expect(screen.getByText(searchIcon)).toBeInTheDocument();
  });

  it('supports overriding the icon iconName', () => {
    render(
      <SearchBox
        iconProps={{
          iconName: 'Filter',
        }}
      />,
    );

    const filterIcon = '';
    expect(screen.getByText(filterIcon)).toBeInTheDocument();
  });

  it('supports native props on inner input', () => {
    render(<SearchBox autoComplete="on" />);
    const inputEl = screen.getByRole('searchbox');
    const autocompleteVal = inputEl.getAttribute('autocomplete');

    expect(autocompleteVal).toBe('on');
  });

  it('supports setting a placeholder value', () => {
    const placeholder = 'Search';
    render(<SearchBox placeholder={placeholder} />);
    const inputEl = screen.getByRole('searchbox');
    const placeholderVal = inputEl.getAttribute('placeholder');

    expect(placeholderVal).toBe(placeholder);
  });

  it('supports setting id on input', () => {
    render(<SearchBox id="foo" />);
    expect(screen.getByRole('searchbox').id).toBe('foo');
  });

  it('generates id for input if none passed in', () => {
    render(<SearchBox />);
    expect(screen.getByRole('searchbox').id).toBeTruthy();
  });

  it('only invokes onFocus callback once per focus event', () => {
    const onFocus = jest.fn();
    render(<SearchBox onFocus={onFocus} />);
    fireEvent.focus(screen.getByRole('searchbox'));

    expect(onFocus).toHaveBeenCalledTimes(1);
  });

  it('can be disabled via props', () => {
    render(<SearchBox disabled />);
    const inputEl = screen.getByRole('searchbox');
    const disabledVal = inputEl.getAttribute('disabled');

    expect(disabledVal).toBe('');
  });

  it('is not disabled by default', () => {
    render(<SearchBox />);
    const inputEl = screen.getByRole('searchbox');
    const disabledVal = inputEl.getAttribute('disabled');

    expect(disabledVal).toBeFalsy();
  });

  it('handles setting value', () => {
    render(<SearchBox value="test" />);
    expect(screen.getByRole('searchbox')).toHaveValue('test');
  });

  it('handles updating value to empty string', () => {
    const { rerender } = render(<SearchBox value="test" />);
    rerender(<SearchBox value="" />);
    expect(screen.getByRole('searchbox')).toHaveValue('');
  });

  it('handles setting null value', () => {
    // this is not allowed per typings, but users might do it anyway
    render(<SearchBox value={null as any} />);
    expect(screen.getByRole('searchbox')).toHaveValue('null');
  });

  it('handles rendering 0', () => {
    render(<SearchBox value={0 as any} />);
    // this is not allowed per typings, but users might do it anyway
    expect(screen.getByRole('searchbox').getAttribute('value')).toBe('0');
  });

  it('handles onChange', () => {
    const onChange = jest.fn();

    render(<SearchBox onChange={onChange} />);
    expect(onChange).toHaveBeenCalledTimes(0);

    fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'New value' } });

    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('handles onChanged', () => {
    const onChanged = jest.fn();

    render(
      <SearchBox
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        onChanged={onChanged}
      />,
    );
    expect(onChanged).toHaveBeenCalledTimes(0);

    fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'New value' } });

    expect(onChanged).toHaveBeenCalledTimes(1);
  });

  it('invokes onEscape callback on escape keydown', () => {
    const onEscape = jest.fn();

    render(<SearchBox onEscape={onEscape} />);

    expect(onEscape).toHaveBeenCalledTimes(0);

    fireEvent.keyDown(screen.getByRole('searchbox'), {
      key: 'Escape',
      code: 'Escape',
      charCode: 27,
      keyCode: 27,
    });

    expect(onEscape).toHaveBeenCalledTimes(1);
  });

  it('invokes onClear callback on escape keydown and clears the value, if it has a value', () => {
    const onClear = jest.fn();

    render(<SearchBox onClear={onClear} defaultValue="test" />);
    fireEvent.keyDown(screen.getByRole('searchbox'), { key: 'Escape', code: 'Escape', charCode: 27, keyCode: 27 });

    expect(onClear).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('searchbox')).toHaveValue('');
  });

  it('does not invoke onClear callback on escape keydown, if it does not have a value', () => {
    const onClear = jest.fn();

    render(<SearchBox onClear={onClear} />);
    fireEvent.keyDown(screen.getByRole('searchbox'), { key: 'Escape', code: 'Escape', charCode: 27, keyCode: 27 });

    expect(onClear).not.toHaveBeenCalled();
  });

  it('does not clear the value on escape keydown, if onClear calls preventDefault', () => {
    const onClear = jest.fn(ev => ev.preventDefault());

    render(<SearchBox onClear={onClear} defaultValue="test" />);
    fireEvent.keyDown(screen.getByRole('searchbox'), { key: 'Escape', code: 'Escape', charCode: 27, keyCode: 27 });

    expect(onClear).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('searchbox')).toHaveValue('test');
  });

  it('prevents escape keypress from bubbling, if and only if it has a value', () => {
    const onParentKeyDown = jest.fn();

    render(
      <div onKeyDown={onParentKeyDown}>
        <SearchBox defaultValue="test" />
      </div>,
    );

    // First escape clears the value and should not bubble
    fireEvent.keyDown(screen.getByRole('searchbox'), { key: 'Escape', code: 'Escape', charCode: 27, keyCode: 27 });
    expect(onParentKeyDown).not.toHaveBeenCalled();

    // Second escape should bubble
    fireEvent.keyDown(screen.getByRole('searchbox'), { key: 'Escape', code: 'Escape', charCode: 27, keyCode: 27 });
    expect(onParentKeyDown).toHaveBeenCalledTimes(1);
  });

  it('invokes onSearch callback on enter keydown', () => {
    const onSearch = jest.fn();

    render(<SearchBox onSearch={onSearch} />);
    fireEvent.keyDown(screen.getByRole('searchbox'), { key: 'Enter', code: 'Enter', charCode: 13, keyCode: 13 });

    expect(onSearch).toHaveBeenCalledTimes(1);
  });

  it('invokes onKeyDown callback on keydown', () => {
    const onKeyDown = jest.fn();

    render(<SearchBox onKeyDown={onKeyDown} />);
    fireEvent.keyDown(screen.getByRole('searchbox'));

    expect(onKeyDown).toHaveBeenCalledTimes(1);
  });
});
