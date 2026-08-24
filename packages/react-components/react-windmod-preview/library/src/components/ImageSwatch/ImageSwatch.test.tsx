import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';

import { SwatchPicker as HeadlessSwatchPicker } from '@fluentui/react-headless-components-preview/swatch-picker';

import { isConformant } from '../../testing/isConformant';
import { SwatchPicker } from '../SwatchPicker/SwatchPicker';
import { ImageSwatch } from './ImageSwatch';
import type { ImageSwatchState } from './ImageSwatch.types';
import { imageSwatchClassNames, useImageSwatchStyles } from './useImageSwatchStyles';

import styles from './ImageSwatch.module.css';

// Frozen-state guard: freezes the headless hook's return so any in-place write anywhere in the
// pipeline throws instead of succeeding silently — see testing/freezeState.ts.
jest.mock('@fluentui/react-headless-components-preview/swatch-picker', () => {
  const actual = jest.requireActual('@fluentui/react-headless-components-preview/swatch-picker');
  const { deepFreezeState } = require('../../testing/freezeState');

  return {
    ...actual,
    useImageSwatch: (...args: Parameters<typeof actual.useImageSwatch>) =>
      deepFreezeState(actual.useImageSwatch(...args)),
  };
});

const stampsOf = (root: object): Record<string, string | undefined> => root as Record<string, string | undefined>;

describe('ImageSwatch', () => {
  isConformant({
    Component: ImageSwatch,
    displayName: 'ImageSwatch',
    requiredProps: { value: 'a', src: 'x.png' },
  });

  it('stamps its marker pair and module class, slash-free first', () => {
    const { getByTestId } = render(<ImageSwatch data-testid="root" value="a" src="x.png" />);

    const root = getByTestId('root');

    expect(root).toHaveClass('fui-image-swatch');
    expect(root).toHaveClass('group/fui-image-swatch');
    expect(root).toHaveClass(styles.root);
    expect(root.classList[0]).toBe('fui-image-swatch');
    expect(imageSwatchClassNames.root).toBe('fui-image-swatch group/fui-image-swatch');
  });

  it('stamps the context size and shape, defaulting to medium and square', () => {
    const { getByTestId } = render(
      <>
        <ImageSwatch data-testid="standalone" value="a" src="x.png" />
        <SwatchPicker size="large" shape="circular">
          <ImageSwatch data-testid="inherited" value="b" src="x.png" />
        </SwatchPicker>
      </>,
    );

    expect(getByTestId('standalone').getAttribute('data-size')).toBe('medium');
    expect(getByTestId('standalone').getAttribute('data-shape')).toBe('square');
    expect(getByTestId('inherited').getAttribute('data-size')).toBe('large');
    expect(getByTestId('inherited').getAttribute('data-shape')).toBe('circular');
  });

  it('has no size or shape prop of its own', () => {
    // Both libraries ignore a per-swatch override here — the props are not on the windmod
    // surface at all, and the context value is what reaches the DOM.
    const { getByTestId } = render(
      <SwatchPicker size="large">
        {/* @ts-expect-error ImageSwatch takes no size prop on either library */}
        <ImageSwatch data-testid="root" value="a" src="x.png" size="small" />
      </SwatchPicker>,
    );

    expect(getByTestId('root').getAttribute('data-size')).toBe('large');
  });

  it('falls back to medium and square inside a headless picker, which publishes neither', () => {
    // Standalone, the context's own default value already supplies both; the `?? 'medium'` and
    // `?? 'square'` guards are reachable only here, where a provider IS present but publishes
    // undefined for all three look props.
    const { getByTestId } = render(
      <HeadlessSwatchPicker>
        <ImageSwatch data-testid="root" value="a" src="x.png" />
      </HeadlessSwatchPicker>,
    );

    expect(getByTestId('root').getAttribute('data-size')).toBe('medium');
    expect(getByTestId('root').getAttribute('data-shape')).toBe('square');
  });

  it('leaves the per-instance background image exactly as the headless hook wrote it', () => {
    const { getByTestId } = render(<ImageSwatch data-testid="root" value="a" src="x.png" style={{ margin: '2px' }} />);

    // Declaration ORDER is the assertion: the headless background-image first, the consumer's
    // own style last. Whitespace and url() quoting are jsdom's serialization, not the
    // component's.
    expect(getByTestId('root').getAttribute('style')!.replace(/\s+/g, '').replace(/;$/, '')).toBe(
      'background-image:url("x.png");margin:2px',
    );
  });

  it('keeps the headless selection stamp', () => {
    const { getByTestId } = render(
      <SwatchPicker defaultSelectedValue="a">
        <ImageSwatch data-testid="a" value="a" src="x.png" />
        <ImageSwatch data-testid="b" value="b" src="y.png" />
      </SwatchPicker>,
    );

    // The headless package spells its own stamp as a presence attribute; windmod adds none of
    // its own here and duplicates none of these.
    expect(getByTestId('a').getAttribute('data-selected')).toBe('');
    expect(getByTestId('a').getAttribute('aria-checked')).toBe('true');
    expect(getByTestId('b').getAttribute('data-selected')).toBeNull();
  });

  it('passes consumer props through to the root', () => {
    const ref = React.createRef<HTMLButtonElement>();
    const onClick = jest.fn();
    const { getByTestId } = render(
      <ImageSwatch
        ref={ref}
        data-testid="root"
        value="a"
        src="x.png"
        id="is"
        aria-label="img"
        className="consumer"
        onClick={onClick}
      />,
    );

    const root = getByTestId('root');

    expect(ref.current).toBe(root);
    expect(root.id).toBe('is');
    expect(root.getAttribute('aria-label')).toBe('img');
    expect(root).toHaveClass('consumer');

    fireEvent.click(root);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('does not mutate the state it is given', () => {
    const state = {
      components: { root: 'button' },
      root: { className: 'consumer' },
      size: 'small',
      shape: 'rounded',
    } as unknown as ImageSwatchState;

    const styled = useImageSwatchStyles(state);

    expect(styled).not.toBe(state);
    expect(state.root.className).toBe('consumer');
    expect(state.root).not.toHaveProperty('data-size');
    expect(stampsOf(styled.root)['data-size']).toBe('small');
    expect(stampsOf(styled.root)['data-shape']).toBe('rounded');
    expect(styled.root.className).toContain('consumer');
  });
});
