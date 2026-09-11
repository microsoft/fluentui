import * as React from 'react';
import { act, render } from '@testing-library/react';

import { FluentProvider } from '../components/FluentProvider/FluentProvider';
import { invalidateCssVars } from './cssVarInvalidation';
import { useCssVarValue } from './useCssVarValue';
import type { UseCssVarValueOptions } from './useCssVarValue';

const VAR = '--probe';

/** Reads its OWN rendered div — the shape a real consumer has. */
const OwnConsumer: React.FC<{
  name?: string;
  options?: UseCssVarValueOptions;
  vars?: React.CSSProperties;
  testId?: string;
}> = ({ name = VAR, options, vars, testId = 'consumer' }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const value = useCssVarValue(name, ref, options);

  return <div ref={ref} data-testid={testId} style={vars} data-value={value ?? 'none'} />;
};

/**
 * Reads an element owned by the TEST, so the same element can outlive a mount and be moved
 * between providers — neither is expressible when the consumer renders its own element.
 */
const ExternalConsumer: React.FC<{
  elementRef: React.RefObject<HTMLElement | null>;
  name?: string;
  options?: UseCssVarValueOptions;
  testId?: string;
}> = ({ elementRef, name = VAR, options, testId = 'external' }) => {
  const value = useCssVarValue(name, elementRef, options);

  return <span data-testid={testId} data-value={value ?? 'none'} />;
};

const RecordConsumer: React.FC<{
  names: Record<string, string>;
  options?: UseCssVarValueOptions;
  vars?: React.CSSProperties;
  onRender?: () => void;
}> = ({ names, options, vars, onRender }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const values = useCssVarValue(names, ref, options);

  onRender?.();

  return <div ref={ref} data-testid="record" style={vars} data-json={JSON.stringify(values)} />;
};

/** Builds its record INLINE, so the object identity is fresh on every render. */
const InlineRecordConsumer: React.FC<{ vars?: React.CSSProperties }> = ({ vars }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const values = useCssVarValue({ first: '--one', second: '--two' }, ref);

  return <div ref={ref} data-testid="inline" style={vars} data-json={JSON.stringify(values)} />;
};

function makeElement(cssText = ''): HTMLElement {
  const element = document.createElement('div');

  if (cssText) {
    element.setAttribute('style', cssText);
  }

  document.body.appendChild(element);

  return element;
}

describe('useCssVarValue', () => {
  let computedStyleSpy: jest.SpyInstance;

  beforeEach(() => {
    computedStyleSpy = jest.spyOn(window, 'getComputedStyle');
  });

  afterEach(async () => {
    computedStyleSpy.mockRestore();
    document.body.innerHTML = '';

    // The root reset is itself an observed mutation, and this hook runs while the test's tree
    // is still mounted, so it has to be flushed like any other invalidation.
    await act(async () => {
      document.documentElement.removeAttribute('style');
    });
  });

  const readsAt = (element: Element): number => computedStyleSpy.mock.calls.filter(call => call[0] === element).length;

  const valueOf = (element: Element): string | null => element.getAttribute('data-value');

  describe('ported behaviour', () => {
    it('T1 reads the computed value at the element after mount', () => {
      const { getByTestId } = render(<OwnConsumer vars={{ [VAR]: 'read-me' } as React.CSSProperties} />);

      expect(valueOf(getByTestId('consumer'))).toBe('read-me');
    });

    it('T2 returns the fallback when the element is absent and when the variable is undefined', () => {
      const absentRef = { current: null };
      const { getByTestId } = render(
        <>
          <ExternalConsumer elementRef={absentRef} options={{ fallback: 'fb' }} testId="absent" />
          <OwnConsumer options={{ fallback: 'fb' }} testId="undefined-var" />
        </>,
      );

      expect(valueOf(getByTestId('absent'))).toBe('fb');
      expect(valueOf(getByTestId('undefined-var'))).toBe('fb');
    });

    it('T3 returns undefined when the variable is undefined and no fallback is given', () => {
      const { getByTestId } = render(<OwnConsumer />);

      expect(valueOf(getByTestId('consumer'))).toBe('none');
    });

    it('T4 trims the raw computed value', () => {
      const element = makeElement();
      const elementRef = { current: element };

      // No reachable environment exercises the trim: jsdom AND Chromium both hand back the
      // computed custom property already trimmed — inline, from a stylesheet, and for the
      // unregistered tokens this theme declares. The normalisation is retained ported
      // behaviour covering engines that return the value with its leading whitespace intact,
      // so the read is stubbed with what such an engine returns.
      computedStyleSpy.mockImplementation(
        () => ({ getPropertyValue: () => '   padded   ' }) as unknown as CSSStyleDeclaration,
      );

      const { getByTestId } = render(<ExternalConsumer elementRef={elementRef} />);

      expect(valueOf(getByTestId('external'))).toBe('padded');
    });

    it('T5 re-reads when the variable NAME changes', () => {
      const element = makeElement('--one: first; --two: second');
      const elementRef = { current: element };

      const { getByTestId, rerender } = render(<ExternalConsumer elementRef={elementRef} name="--one" />);

      expect(valueOf(getByTestId('external'))).toBe('first');

      rerender(<ExternalConsumer elementRef={elementRef} name="--two" />);

      expect(valueOf(getByTestId('external'))).toBe('second');
    });

    it('T6 memoizes per (element, variable): a remount at the same element skips getComputedStyle', () => {
      const element = makeElement(`${VAR}: memoized`);
      const elementRef = { current: element };

      const first = render(<ExternalConsumer elementRef={elementRef} />);

      expect(valueOf(first.getByTestId('external'))).toBe('memoized');
      first.unmount();

      computedStyleSpy.mockClear();

      const second = render(<ExternalConsumer elementRef={elementRef} />);

      expect(readsAt(element)).toBe(0);
      expect(valueOf(second.getByTestId('external'))).toBe('memoized');
    });
  });

  describe('R1 — provider class/style auto-invalidation', () => {
    it('T7 re-reads when the provider className changes', async () => {
      const { getByTestId } = render(
        <FluentProvider data-testid="provider">
          <OwnConsumer />
        </FluentProvider>,
      );

      const consumer = getByTestId('consumer');

      computedStyleSpy.mockClear();

      await act(async () => {
        getByTestId('provider').classList.add('mutated');
      });

      expect(readsAt(consumer)).toBe(1);
    });

    it('T8 re-reads when the provider style is set through setProperty', async () => {
      const { getByTestId } = render(
        <FluentProvider data-testid="provider">
          <OwnConsumer />
        </FluentProvider>,
      );

      const consumer = getByTestId('consumer');

      computedStyleSpy.mockClear();

      await act(async () => {
        getByTestId('provider').style.setProperty('--injected', 'x');
      });

      expect(readsAt(consumer)).toBe(1);
    });

    it('T9 re-reads when the provider style is set through setAttribute', async () => {
      const { getByTestId } = render(
        <FluentProvider data-testid="provider">
          <OwnConsumer />
        </FluentProvider>,
      );

      const consumer = getByTestId('consumer');

      computedStyleSpy.mockClear();

      await act(async () => {
        getByTestId('provider').setAttribute('style', '--injected: x');
      });

      expect(readsAt(consumer)).toBe(1);
    });

    it('T10 does NOT re-read for an unrelated attribute on the provider', async () => {
      const { getByTestId } = render(
        <FluentProvider data-testid="provider">
          <OwnConsumer />
        </FluentProvider>,
      );

      const consumer = getByTestId('consumer');

      computedStyleSpy.mockClear();

      await act(async () => {
        getByTestId('provider').setAttribute('data-unrelated', 'x');
      });

      expect(readsAt(consumer)).toBe(0);
    });

    it('T34 a provider PROP change costs two reads per consumer, an external mutation one', async () => {
      const tree = (theme: string) => (
        <FluentProvider theme={theme} data-testid="provider">
          <OwnConsumer />
        </FluentProvider>
      );

      const { getByTestId, rerender } = render(tree('fui-theme-web-light'));
      const consumer = getByTestId('consumer');

      computedStyleSpy.mockClear();

      rerender(tree('fui-theme-web-dark'));

      // Flushes the observer's microtask, so the count covers BOTH paths.
      await act(async () => undefined);

      // One read from the render-time half, in the commit that writes the class; one more from
      // the observer reporting that same write a microtask later. The two paths cannot be told
      // apart at the observer, so the redundant read is kept rather than risk suppressing a
      // real external change.
      expect(readsAt(consumer)).toBe(2);

      computedStyleSpy.mockClear();

      await act(async () => {
        getByTestId('provider').classList.add('externally-mutated');
      });

      expect(readsAt(consumer)).toBe(1);
    });
  });

  describe('R2 — force on render', () => {
    it('T11 re-reads on every render when forceOnRender is set', () => {
      const element = makeElement(`${VAR}: forced`);
      const elementRef = { current: element };
      const tree = (key: string) => (
        <ExternalConsumer elementRef={elementRef} options={{ forceOnRender: true }} name={key} />
      );

      const { rerender } = render(tree(VAR));

      computedStyleSpy.mockClear();

      rerender(tree(VAR));
      rerender(tree(VAR));

      expect(readsAt(element)).toBe(2);
    });

    it('T12 does not re-read on a plain re-render by default', () => {
      const element = makeElement(`${VAR}: cached`);
      const elementRef = { current: element };

      const { rerender } = render(<ExternalConsumer elementRef={elementRef} />);

      computedStyleSpy.mockClear();

      rerender(<ExternalConsumer elementRef={elementRef} />);
      rerender(<ExternalConsumer elementRef={elementRef} />);

      expect(readsAt(element)).toBe(0);
    });
  });

  describe('R3 — external trigger', () => {
    it('T13 re-reads on a documentElement style mutation', async () => {
      const { getByTestId } = render(<OwnConsumer />);
      const consumer = getByTestId('consumer');

      computedStyleSpy.mockClear();

      await act(async () => {
        document.documentElement.style.setProperty('--zoom', '2');
      });

      expect(readsAt(consumer)).toBe(1);
    });

    it('T14 re-reads when invalidateCssVars() is called', async () => {
      const { getByTestId } = render(<OwnConsumer />);
      const consumer = getByTestId('consumer');

      computedStyleSpy.mockClear();

      await act(async () => {
        invalidateCssVars();
      });

      expect(readsAt(consumer)).toBe(1);
    });

    it('T15 PINS a root font-size change as a no-change for an unregistered token', async () => {
      const { getByTestId } = render(
        <OwnConsumer vars={{ [VAR]: 'calc(14px * calc(1rem / 16px))' } as React.CSSProperties} />,
      );
      const consumer = getByTestId('consumer');

      expect(valueOf(consumer)).toBe('calc(14px * calc(1rem / 16px))');

      computedStyleSpy.mockClear();

      await act(async () => {
        document.documentElement.style.fontSize = '20px';
      });

      // The invalidation FIRES — the token is simply invariant, because the theme leaves its
      // knobs unregistered so calc() is never evaluated in the computed value.
      expect(readsAt(consumer)).toBe(1);
      expect(valueOf(consumer)).toBe('calc(14px * calc(1rem / 16px))');
    });
  });

  describe('R4 — scoped invalidation', () => {
    const nested = (
      <FluentProvider data-testid="outer">
        <OwnConsumer testId="outer-consumer" />
        <FluentProvider data-testid="inner">
          <OwnConsumer testId="inner-consumer" />
        </FluentProvider>
      </FluentProvider>
    );

    it('T16 inner provider change: the inner consumer re-reads, the outer does NOT', async () => {
      const { getByTestId } = render(nested);
      const outer = getByTestId('outer-consumer');
      const inner = getByTestId('inner-consumer');

      computedStyleSpy.mockClear();

      await act(async () => {
        getByTestId('inner').classList.add('mutated');
      });

      expect(readsAt(outer)).toBe(0);
      expect(readsAt(inner)).toBe(1);
    });

    it('T17 outer provider change: both consumers re-read', async () => {
      const { getByTestId } = render(nested);
      const outer = getByTestId('outer-consumer');
      const inner = getByTestId('inner-consumer');

      computedStyleSpy.mockClear();

      await act(async () => {
        getByTestId('outer').classList.add('mutated');
      });

      expect(readsAt(outer)).toBe(1);
      expect(readsAt(inner)).toBe(1);
    });

    it('T18 a sibling provider change reaches neither sibling subtree', async () => {
      const { getByTestId } = render(
        <>
          <FluentProvider data-testid="left">
            <OwnConsumer testId="left-consumer" />
          </FluentProvider>
          <FluentProvider data-testid="right">
            <OwnConsumer testId="right-consumer" />
          </FluentProvider>
        </>,
      );

      const left = getByTestId('left-consumer');
      const right = getByTestId('right-consumer');

      computedStyleSpy.mockClear();

      await act(async () => {
        getByTestId('left').classList.add('mutated');
      });

      expect(readsAt(left)).toBe(1);
      expect(readsAt(right)).toBe(0);
    });
  });

  describe('R5 — input polymorphism', () => {
    it('T19 a single name returns a single value', () => {
      const { getByTestId } = render(<OwnConsumer vars={{ [VAR]: 'single' } as React.CSSProperties} />);

      expect(valueOf(getByTestId('consumer'))).toBe('single');
    });

    it('T20 a record returns a mirrored record with the same keys', () => {
      const { getByTestId } = render(
        <RecordConsumer
          names={{ first: '--one', second: '--two' }}
          vars={{ '--one': 'a', '--two': 'b' } as React.CSSProperties}
        />,
      );

      expect(JSON.parse(getByTestId('record').getAttribute('data-json') as string)).toEqual({
        first: 'a',
        second: 'b',
      });
    });

    it('T21 a record entry whose variable is undefined gets the fallback in its slot', () => {
      const { getByTestId } = render(
        <RecordConsumer
          names={{ first: '--one', missing: '--nope' }}
          options={{ fallback: 'fb' }}
          vars={{ '--one': 'a' } as React.CSSProperties}
        />,
      );

      expect(JSON.parse(getByTestId('record').getAttribute('data-json') as string)).toEqual({
        first: 'a',
        missing: 'fb',
      });
    });

    it('T22 an inline record literal causes no re-read across renders', () => {
      const { getByTestId, rerender } = render(
        <InlineRecordConsumer vars={{ '--one': 'a', '--two': 'b' } as React.CSSProperties} />,
      );

      const inline = getByTestId('inline');

      computedStyleSpy.mockClear();

      rerender(<InlineRecordConsumer vars={{ '--one': 'a', '--two': 'b' } as React.CSSProperties} />);
      rerender(<InlineRecordConsumer vars={{ '--one': 'a', '--two': 'b' } as React.CSSProperties} />);

      expect(readsAt(inline)).toBe(0);
    });
  });

  describe('review corrections', () => {
    it('T29 the record form SETTLES at a bounded render count', () => {
      const onRender = jest.fn();

      expect(() =>
        render(
          <RecordConsumer
            names={{ first: '--one', second: '--two' }}
            vars={{ '--one': 'a', '--two': 'b' } as React.CSSProperties}
            onRender={onRender}
          />,
        ),
      ).not.toThrow();

      // Bounded, not merely finite: without the per-slot equality bailout this diverges
      // (measured at 53 setState calls before React throws).
      expect(onRender).toHaveBeenCalledTimes(3);
    });

    it('T30 the same element under two providers publishing equal versions gets each provider own value', () => {
      const element = makeElement(`${VAR}: first`);
      const elementRef = { current: element };

      const first = render(
        <FluentProvider theme="fui-theme-web-light">
          <ExternalConsumer elementRef={elementRef} />
        </FluentProvider>,
      );

      expect(valueOf(first.getByTestId('external'))).toBe('first');
      first.unmount();

      element.setAttribute('style', `${VAR}: second`);

      const second = render(
        <FluentProvider theme="fui-theme-web-light">
          <ExternalConsumer elementRef={elementRef} />
        </FluentProvider>,
      );

      expect(valueOf(second.getByTestId('external'))).toBe('second');
    });

    it('T31 a provider className PROP change yields the new value in the SAME commit', async () => {
      const tree = (themeClass: string, value: string) => (
        <FluentProvider theme={themeClass}>
          <OwnConsumer vars={{ [VAR]: value } as React.CSSProperties} />
        </FluentProvider>
      );

      const { getByTestId, rerender } = render(tree('fui-theme-web-light', 'before'));

      expect(valueOf(getByTestId('consumer'))).toBe('before');

      // No await: the MutationObserver callback is a microtask, so anything visible here came
      // from the render-time signature, not from the observer.
      rerender(tree('fui-theme-web-dark', 'after'));

      expect(valueOf(getByTestId('consumer'))).toBe('after');

      // Flushed after the assertion, so the observer's follow-on report of the same write lands
      // inside act rather than after the test body.
      await act(async () => undefined);
    });

    it('T32 a forceOnRender consumer refreshes the shared entry for a plain peer', () => {
      const element = makeElement(`${VAR}: v1`);
      const elementRef = { current: element };
      // Built fresh per render: React bails out of a rerender with an identical element ref.
      const tree = () => (
        <>
          <ExternalConsumer elementRef={elementRef} options={{ forceOnRender: true }} testId="forced" />
          <ExternalConsumer elementRef={elementRef} testId="plain" />
        </>
      );

      const { getByTestId, rerender } = render(tree());

      expect(valueOf(getByTestId('forced'))).toBe('v1');
      expect(valueOf(getByTestId('plain'))).toBe('v1');

      // Silent: no provider mutation, no root mutation, no invalidateCssVars().
      element.setAttribute('style', `${VAR}: v2`);

      rerender(tree());

      expect(valueOf(getByTestId('forced'))).toBe('v2');
      expect(valueOf(getByTestId('plain'))).toBe('v2');
    });

    it('T33 typing pin: a generic record wrapper indexes with no assertion, the string half assigns', () => {
      const { getByTestId } = render(<GenericWrappers vars={{ '--one': 'generic' } as React.CSSProperties} />);

      expect(getByTestId('generic').getAttribute('data-record')).toBe('generic');
      expect(getByTestId('generic').getAttribute('data-string')).toBe('generic');
    });
  });
});

/**
 * T33's compile-time half. The overloaded signature resolves eagerly inside a generic body, so
 * the record result is indexable with no assertion at the wrapper boundary; the string half is
 * assignable to `string | undefined` for the same reason.
 */
function useGenericRecord<T extends Record<string, string>>(
  names: T,
  elementRef: React.RefObject<HTMLElement | null>,
): string | undefined {
  const values = useCssVarValue(names, elementRef);

  return values[Object.keys(names)[0] as keyof T];
}

function useGenericString<T extends string>(
  name: T,
  elementRef: React.RefObject<HTMLElement | null>,
): string | undefined {
  const value: string | undefined = useCssVarValue(name, elementRef);

  return value;
}

const GenericWrappers: React.FC<{ vars?: React.CSSProperties }> = ({ vars }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const fromRecord = useGenericRecord({ only: '--one' }, ref);
  const fromString = useGenericString('--one', ref);

  return (
    <div
      ref={ref}
      data-testid="generic"
      style={vars}
      data-record={fromRecord ?? 'none'}
      data-string={fromString ?? 'none'}
    />
  );
};
