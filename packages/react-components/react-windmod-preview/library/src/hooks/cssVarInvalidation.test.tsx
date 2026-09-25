import * as fs from 'fs';
import * as path from 'path';

import * as React from 'react';
import { act, render } from '@testing-library/react';

import { FluentProvider } from '../components/FluentProvider/FluentProvider';
import * as subpathBarrel from '../use-css-var-value';
import { useCssVarInvalidationScope } from './cssVarInvalidation';
import { useCssVarValue } from './useCssVarValue';

const RealMutationObserver = window.MutationObserver;

let constructed = 0;
let disconnected = 0;

class CountingMutationObserver extends RealMutationObserver {
  constructor(callback: MutationCallback) {
    super(callback);
    constructed += 1;
  }

  public disconnect(): void {
    disconnected += 1;
    super.disconnect();
  }
}

/** Calls the provider-side hook directly, so an absent element is expressible. */
const ScopeProbe: React.FC<{ elementRef: React.RefObject<HTMLElement | null> }> = ({ elementRef }) => {
  const scope = useCssVarInvalidationScope(elementRef, 'probe-class', undefined);

  return <span data-testid="scope" data-version={scope.version} />;
};

const AbsentConsumer: React.FC = () => {
  const elementRef = React.useRef<HTMLElement | null>(null);
  const value = useCssVarValue('--probe', elementRef, { fallback: 'fb' });

  return <span data-testid="absent" data-value={value ?? 'none'} />;
};

const RootConsumer: React.FC = () => {
  const ref = React.useRef<HTMLDivElement>(null);
  const value = useCssVarValue('--probe', ref);

  return <div ref={ref} data-testid="root-consumer" data-value={value ?? 'none'} />;
};

describe('cssVarInvalidation', () => {
  beforeEach(() => {
    constructed = 0;
    disconnected = 0;
    window.MutationObserver = CountingMutationObserver as unknown as typeof MutationObserver;
  });

  afterEach(() => {
    window.MutationObserver = RealMutationObserver;
    document.body.innerHTML = '';
    document.documentElement.removeAttribute('style');
  });

  it('T23 an absent element yields the fallback and installs no observer', () => {
    const computedStyleSpy = jest.spyOn(window, 'getComputedStyle');
    const absentRef = { current: null };

    const { getByTestId } = render(
      <>
        <ScopeProbe elementRef={absentRef} />
        <AbsentConsumer />
      </>,
    );

    expect(getByTestId('scope')).toHaveAttribute('data-version', '0');
    expect(getByTestId('absent')).toHaveAttribute('data-value', 'fb');

    // Both the scope hook and the document registration return before constructing anything:
    // with no element there is neither a node to observe nor a document to reach it through.
    expect(constructed).toBe(0);
    expect(computedStyleSpy).not.toHaveBeenCalled();

    computedStyleSpy.mockRestore();
  });

  it('T24 unmounting the provider disconnects its observer and warns nothing', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => undefined);

    const { unmount, getByTestId } = render(
      <FluentProvider data-testid="provider">
        <RootConsumer />
      </FluentProvider>,
    );

    // One observer on the provider element, one on documentElement for the root store.
    expect(constructed).toBe(2);

    const provider = getByTestId('provider');

    unmount();

    expect(disconnected).toBe(2);

    await act(async () => {
      provider.classList.add('after-unmount');
    });

    expect(consoleErrorSpy).not.toHaveBeenCalled();

    consoleErrorSpy.mockRestore();
  });

  it('T25 the root observer installs on the first subscriber and disconnects after the last', () => {
    const first = render(<RootConsumer />);

    expect(constructed).toBe(1);

    const second = render(<RootConsumer />);

    // Refcounted: a second subscriber in the same document reuses the one observer.
    expect(constructed).toBe(1);
    expect(disconnected).toBe(0);

    first.unmount();

    expect(disconnected).toBe(0);

    second.unmount();

    expect(disconnected).toBe(1);
  });

  it('T25b leaves no observer alive across three subscribe/unsubscribe cycles', () => {
    for (let cycle = 0; cycle < 3; cycle += 1) {
      render(<RootConsumer />).unmount();
    }

    expect(constructed).toBe(3);
    expect(constructed - disconnected).toBe(0);
  });

  it('T26 ./use-css-var-value has an export-map entry and a top-level barrel', () => {
    const packageJsonPath = path.join(__dirname, '..', '..', 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

    expect(packageJson.exports['./use-css-var-value']).toEqual({
      import: {
        types: './dist/use-css-var-value.d.ts',
        default: './lib/use-css-var-value.js',
      },
      require: {
        types: './dist/use-css-var-value.d.cts',
        default: './lib-commonjs/use-css-var-value.cjs',
      },
    });

    expect(typeof subpathBarrel.useCssVarValue).toBe('function');
    expect(typeof subpathBarrel.invalidateCssVars).toBe('function');
  });
});
