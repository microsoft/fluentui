import * as React from 'react';
import { render } from '@testing-library/react';
import * as path from 'path';
import { isConformant } from '../../common/isConformant';

import { Announced } from './Announced';

describe('Announced', () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  it('does not initially render message', () => {
    const { container } = render(<Announced message="hello" />);
    expect(container).toMatchSnapshot();
  });

  it('renders message after delay', () => {
    jest.useFakeTimers();
    const { container } = render(<Announced message="hello" />);
    jest.runAllTimers();
    expect(container).toMatchSnapshot();
  });

  isConformant({
    Component: Announced,
    displayName: 'Announced',
    componentPath: path.join(__dirname, 'Announced.ts'),
    // Problem: Ref isn't passed.
    // Solution: Ref should be added and passed onto the root.
    disabledTests: ['component-handles-ref', 'component-has-root-ref'],
  });

  it('renders with default settings', () => {
    const { getByRole } = render(<Announced message="hello" />);
    const component = getByRole('status');

    expect(component.tagName).toBe('DIV');
    expect(component.getAttribute('aria-live')).toBe('polite');
  });

  it('delay renders message', () => {
    jest.useFakeTimers();
    const { getByRole } = render(<Announced message="hello" />);
    const component = getByRole('status');
    expect(component.textContent).toBeFalsy();

    jest.runAllTimers();
    expect(component.textContent).toBe('hello');
  });

  it('renders as custom tag', () => {
    jest.useFakeTimers();
    const { getByRole } = render(<Announced as="span" message="hello" />);
    const component = getByRole('status');

    expect(component.tagName).toBe('SPAN');

    jest.runAllTimers();
    expect(component.textContent).toBe('hello'); // still renders children
  });

  it('can change aria-live', () => {
    const { getByRole } = render(<Announced aria-live="assertive" message="hello" />);
    const component = getByRole('status');

    expect(component.getAttribute('aria-live')).toBe('assertive');
  });

  it('can change styles', () => {
    jest.useFakeTimers();
    const { getByRole } = render(
      <Announced
        message="hello"
        className="rootclass1"
        styles={{
          root: 'rootclass2',
          screenReaderText: 'textclass',
        }}
      />,
    );
    jest.runAllTimers();

    const component = getByRole('status');
    expect(component.className).toContain('rootclass1');
    expect(component.className).toContain('rootclass2');
    expect(component.firstElementChild!.className).toContain('textclass');
  });
});
