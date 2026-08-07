import * as React from 'react';
import { render } from '@testing-library/react';
import { useCssVarValue } from './useCssVarValue';
import type { UseCssVarValueOptions } from './useCssVarValue';

/**
 * jsdom limitation, and why every test sets the variable as an INLINE style: jsdom's
 * `getComputedStyle` resolves custom properties declared on the element's own `style`, but
 * does not cascade/inherit them from stylesheets or ancestors. The hook's mechanics (read
 * timing, fallback path, non-reactivity) are fully testable this way; resolution through the
 * real cascade is exercised in a browser (see the DataGrid `--base-scale` consumption and the
 * hook's jsdom NOTE).
 */
const TestComponent: React.FC<{
  variableName: string;
  options?: UseCssVarValueOptions;
  variableValue?: string;
  onValue: (value: string | undefined) => void;
}> = ({ variableName, options, variableValue, onValue }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const value = useCssVarValue(variableName, ref, options);

  onValue(value);

  return (
    <div
      ref={ref}
      style={variableValue !== undefined ? ({ [variableName]: variableValue } as React.CSSProperties) : undefined}
    />
  );
};

describe('useCssVarValue', () => {
  it('reads the computed value of the variable at the element after mount', () => {
    const onValue = jest.fn();

    render(<TestComponent variableName="--test-var" variableValue="1.5" onValue={onValue} />);

    expect(onValue).toHaveBeenLastCalledWith('1.5');
  });

  it('returns the fallback before mount and keeps it when the variable is not defined', () => {
    const onValue = jest.fn();

    render(<TestComponent variableName="--not-defined" options={{ fallback: 'fallback-value' }} onValue={onValue} />);

    // First render (pre-effect) and the settled state both report the fallback.
    expect(onValue).toHaveBeenNthCalledWith(1, 'fallback-value');
    expect(onValue).toHaveBeenLastCalledWith('fallback-value');
  });

  it('returns undefined when the variable is not defined and no fallback is given', () => {
    const onValue = jest.fn();

    render(<TestComponent variableName="--not-defined" onValue={onValue} />);

    expect(onValue).toHaveBeenLastCalledWith(undefined);
  });

  it('reads once per mount: does not track later changes to the variable', () => {
    const onValue = jest.fn();

    const { rerender } = render(<TestComponent variableName="--test-var" variableValue="1.5" onValue={onValue} />);

    rerender(<TestComponent variableName="--test-var" variableValue="2" onValue={onValue} />);

    // Documented staleness semantics: the value was read in the mount layout effect and a
    // subsequent change to the underlying variable is intentionally not observed.
    expect(onValue).toHaveBeenLastCalledWith('1.5');
  });

  it('re-reads when the variable name changes', () => {
    const onValue = jest.fn();

    const Component: React.FC<{ variableName: string; onValue: (value: string | undefined) => void }> = props => {
      const ref = React.useRef<HTMLDivElement>(null);
      const value = useCssVarValue(props.variableName, ref, {});

      props.onValue(value);

      return <div ref={ref} style={{ '--var-a': 'a-value', '--var-b': 'b-value' } as React.CSSProperties} />;
    };

    const { rerender } = render(<Component variableName="--var-a" onValue={onValue} />);
    expect(onValue).toHaveBeenLastCalledWith('a-value');

    rerender(<Component variableName="--var-b" onValue={onValue} />);
    expect(onValue).toHaveBeenLastCalledWith('b-value');
  });

  it('trims the raw computed value', () => {
    const onValue = jest.fn();

    render(<TestComponent variableName="--test-var" variableValue=" 1.25 " onValue={onValue} />);

    expect(onValue).toHaveBeenLastCalledWith('1.25');
  });

  it('re-reads when a `deps` entry changes (the explicit staleness trigger)', () => {
    const onValue = jest.fn();

    const { rerender } = render(
      <TestComponent variableName="--test-var" variableValue="1.5" options={{ deps: ['light'] }} onValue={onValue} />,
    );
    expect(onValue).toHaveBeenLastCalledWith('1.5');

    // Variable changes AND the dep changes -> exactly this triggers a fresh DOM read.
    rerender(
      <TestComponent variableName="--test-var" variableValue="2" options={{ deps: ['dark'] }} onValue={onValue} />,
    );
    expect(onValue).toHaveBeenLastCalledWith('2');
  });

  it('falls back when a deps-triggered re-read finds the variable undefined', () => {
    const onValue = jest.fn();

    const { rerender } = render(
      <TestComponent
        variableName="--test-var"
        variableValue="1.5"
        options={{ deps: [1], fallback: 'fb' }}
        onValue={onValue}
      />,
    );
    expect(onValue).toHaveBeenLastCalledWith('1.5');

    rerender(<TestComponent variableName="--test-var" options={{ deps: [2], fallback: 'fb' }} onValue={onValue} />);
    expect(onValue).toHaveBeenLastCalledWith('fb');
  });

  it('memoizes per (element, variable): a remount at the same element skips getComputedStyle', () => {
    const host = document.createElement('div');
    host.style.setProperty('--memo-var', '42');
    document.body.appendChild(host);

    const hostRef = { current: host };
    const getComputedStyleSpy = jest.spyOn(window, 'getComputedStyle');

    const Reader: React.FC = () => {
      useCssVarValue('--memo-var', hostRef);
      return null;
    };

    const first = render(<Reader />);
    first.unmount();
    const second = render(<Reader />);

    const readsForVar = getComputedStyleSpy.mock.calls.filter(call => call[0] === host).length;
    expect(readsForVar).toBe(1);

    second.unmount();
    getComputedStyleSpy.mockRestore();
    host.remove();
  });

  it('does NOT use the cross-mount cache when `deps` is provided (fresh read per mount)', () => {
    const host = document.createElement('div');
    host.style.setProperty('--memo-var-deps', 'a');
    document.body.appendChild(host);

    const hostRef = { current: host };
    const onValue = jest.fn();

    const Reader: React.FC = () => {
      onValue(useCssVarValue('--memo-var-deps', hostRef, { deps: ['x'] }));
      return null;
    };

    render(<Reader />).unmount();
    expect(onValue).toHaveBeenLastCalledWith('a');

    // Value changes while unmounted; a cached hit would be stale.
    host.style.setProperty('--memo-var-deps', 'b');
    render(<Reader />);
    expect(onValue).toHaveBeenLastCalledWith('b');

    host.remove();
  });
});
