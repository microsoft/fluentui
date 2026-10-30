import * as React from 'react';
import { render } from '@testing-library/react';

import { CardPreview } from './CardPreview';
import { isConformant } from '../../testing/isConformant';
import { cardPreviewClassNames, useCardPreviewStyles } from './useCardPreviewStyles';

import styles from './CardPreview.module.css';

// Frozen-state guard — see testing/freezeState.ts.
jest.mock('@fluentui/react-headless-components-preview/card', () => {
  const actual = jest.requireActual('@fluentui/react-headless-components-preview/card');
  const { deepFreezeState } = require('../../testing/freezeState');

  return {
    ...actual,
    useCardPreview: (...args: Parameters<typeof actual.useCardPreview>) =>
      deepFreezeState(actual.useCardPreview(...args)),
  };
});

describe('CardPreview', () => {
  isConformant({
    Component: CardPreview,
    displayName: 'CardPreview',
    requiredProps: { children: <span>media</span> },
  });

  it('stamps the marker class', () => {
    const { getByTestId } = render(
      <CardPreview data-testid="root">
        <span>media</span>
      </CardPreview>,
    );

    const root = getByTestId('root');

    expect(root).toHaveClass('fui-card-preview');
    expect(root).toHaveClass('group/fui-card-preview');
    expect(root.classList[0]).toBe('fui-card-preview');
    expect(cardPreviewClassNames.root).toBe('fui-card-preview group/fui-card-preview');
  });

  it('carries the root style class and the consumer className', () => {
    const { getByTestId } = render(
      <CardPreview data-testid="root" className="consumer">
        <span>media</span>
      </CardPreview>,
    );

    const root = getByTestId('root');

    expect(root).toHaveClass(styles.root);
    expect(root).toHaveClass('consumer');
  });

  it('decorates the logo slot and keeps its consumer className', () => {
    const { getByTestId } = render(
      <CardPreview data-testid="root" logo={{ children: <i>Logo</i>, className: 'consumer-logo', id: 'slot-logo' }}>
        <span>media</span>
      </CardPreview>,
    );

    const logo = getByTestId('root').querySelector('.consumer-logo');

    expect(logo).toHaveClass(styles.logo);
    // Content and the slot-level id separate a decorated slot from one rebuilt as a bare
    // className holder: dropping the slot's state spread keeps the class and loses the rest.
    expect(logo).toHaveTextContent('Logo');
    expect(logo).toHaveAttribute('id', 'slot-logo');
  });

  it('renders no logo slot when none is given', () => {
    const { getByTestId } = render(
      <CardPreview data-testid="root">
        <span>media</span>
      </CardPreview>,
    );

    expect(getByTestId('root').querySelector(`.${styles.logo}`)).toBeNull();
  });

  it('passes consumer props straight through to the root', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { getByTestId } = render(
      <CardPreview data-testid="root" id="my-preview" style={{ zIndex: 7 }} ref={ref}>
        <span>media</span>
      </CardPreview>,
    );

    const root = getByTestId('root');

    expect(root.id).toBe('my-preview');
    expect(root.style.zIndex).toBe('7');
    expect(ref.current).toBe(root);
  });

  it('returns a new state and mutates nothing', () => {
    const state = {
      root: { className: 'kept' },
      logo: { className: 'kept-logo' },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any;
    const rootBefore = state.root;
    const classNamesBefore = [state.root.className, state.logo.className];

    const styled = useCardPreviewStyles(state);

    expect(styled).not.toBe(state);
    expect(styled.root).not.toBe(rootBefore);
    expect([state.root.className, state.logo.className]).toEqual(classNamesBefore);
  });
});
