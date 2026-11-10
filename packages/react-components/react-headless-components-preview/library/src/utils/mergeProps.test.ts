import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { mergeProps } from './mergeProps';

describe('mergeProps', () => {
  it('returns defaults unchanged without overrides', () => {
    const defaults = { className: 'default' };
    expect(mergeProps(defaults)).toBe(defaults);
  });

  it('appends consumer classes and merges styles without mutating the defaults', () => {
    const defaults: React.ComponentProps<'div'> = {
      className: 'default',
      style: { display: 'grid', position: 'relative' },
    };
    const result = mergeProps(defaults, {
      className: 'custom',
      style: { display: 'flex' },
    });

    expect(result.className).toBe('default custom');
    expect(result.style).toEqual({ display: 'flex', position: 'relative' });
    expect(defaults.className).toBe('default');
    expect(defaults.style?.display).toBe('grid');
  });

  it('composes callback and object refs on attachment and detachment', () => {
    const internalRef = jest.fn();
    const consumerRef = React.createRef<HTMLDivElement>();
    const result = mergeProps({ ref: internalRef }, { ref: consumerRef });
    const { container, unmount } = render(React.createElement('div', { ref: result.ref }));

    expect(internalRef).toHaveBeenLastCalledWith(container.firstChild);
    expect(consumerRef.current).toBe(container.firstChild);
    unmount();
    expect(internalRef).toHaveBeenLastCalledWith(null);
    expect(consumerRef.current).toBeNull();
  });

  it('does not remove an internal ref when the override ref is undefined', () => {
    const ref = jest.fn();
    expect(mergeProps({ ref }, { ref: undefined }).ref).toBe(ref);
  });

  it('composes object refs without replacing either ref on attachment or detachment', () => {
    const defaultRef = React.createRef<HTMLDivElement>();
    const overrideRef = React.createRef<HTMLDivElement>();
    const props = mergeProps({ ref: defaultRef }, { ref: overrideRef });
    const { container, unmount } = render(React.createElement('div', props));

    expect(defaultRef.current).toBe(container.firstChild);
    expect(overrideRef.current).toBe(defaultRef.current);
    unmount();
    expect(defaultRef.current).toBeNull();
    expect(overrideRef.current).toBeNull();
  });

  it('keeps the consumer ref unchanged when there is no default ref', () => {
    const ref = React.createRef<HTMLDivElement>();
    expect(mergeProps({}, { ref }).ref).toBe(ref);
  });

  it('calls consumer and default handlers in order unless the consumer cancels', () => {
    const defaultClick = jest.fn();
    const overrideClick = jest.fn();
    const { getByRole, rerender } = render(
      React.createElement('button', mergeProps({ onClick: defaultClick }, { onClick: overrideClick }), 'Run'),
    );

    fireEvent.click(getByRole('button'));
    expect(overrideClick).toHaveBeenCalledTimes(1);
    expect(defaultClick).toHaveBeenCalledTimes(1);

    const cancelClick = jest.fn((event: React.MouseEvent<HTMLButtonElement>) => event.preventDefault());
    rerender(React.createElement('button', mergeProps({ onClick: defaultClick }, { onClick: cancelClick }), 'Run'));
    fireEvent.click(getByRole('button'));
    expect(cancelClick).toHaveBeenCalledTimes(1);
    expect(defaultClick).toHaveBeenCalledTimes(1);
  });

  it('lets consumer attributes override defaults without mutating either input', () => {
    const defaults = {
      role: 'gridcell',
      tabIndex: 0,
      'aria-disabled': true,
      'aria-selected': true,
      'data-selected': '',
      focusgroupstart: '',
    };
    const overrides = {
      role: 'link',
      tabIndex: -1,
      'aria-disabled': false,
      'aria-selected': false,
      'data-selected': 'custom',
      focusgroupstart: undefined,
    };

    expect(mergeProps<HTMLDivElement, React.ComponentProps<'div'>>(defaults, overrides)).toEqual({
      ...overrides,
      focusgroupstart: '',
    });
    expect(defaults).toEqual({
      role: 'gridcell',
      tabIndex: 0,
      'aria-disabled': true,
      'aria-selected': true,
      'data-selected': '',
      focusgroupstart: '',
    });
    expect(overrides.focusgroupstart).toBeUndefined();
  });

  it('treats undefined overrides as omitted but preserves explicit null content', () => {
    const defaults: React.ComponentProps<'div'> = {
      children: 'Default',
      className: 'default',
      title: 'Default',
    };
    expect(mergeProps(defaults, { children: undefined, className: undefined, title: undefined })).toEqual(defaults);
    expect(mergeProps(defaults, { children: null }).children).toBeNull();
  });
});
