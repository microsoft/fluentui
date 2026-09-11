import * as React from 'react';
import { render } from '@testing-library/react';

import { CardFooter } from './CardFooter';
import { isConformant } from '../../testing/isConformant';
import { cardFooterClassNames, useCardFooterStyles } from './useCardFooterStyles';

import styles from './CardFooter.module.css';

// Frozen-state guard — see testing/freezeState.ts.
jest.mock('@fluentui/react-headless-components-preview/card', () => {
  const actual = jest.requireActual('@fluentui/react-headless-components-preview/card');
  const { deepFreezeState } = require('../../testing/freezeState');

  return {
    ...actual,
    useCardFooter: (...args: Parameters<typeof actual.useCardFooter>) => deepFreezeState(actual.useCardFooter(...args)),
  };
});

describe('CardFooter', () => {
  isConformant({
    Component: CardFooter,
    displayName: 'CardFooter',
    requiredProps: { children: 'Footer' },
  });

  it('stamps the marker class', () => {
    const { getByTestId } = render(<CardFooter data-testid="root">Footer</CardFooter>);

    const root = getByTestId('root');

    expect(root).toHaveClass('fui-card-footer');
    expect(root).toHaveClass('group/fui-card-footer');
    expect(root.classList[0]).toBe('fui-card-footer');
    expect(cardFooterClassNames.root).toBe('fui-card-footer group/fui-card-footer');
  });

  it('carries the root style class and the consumer className', () => {
    const { getByTestId } = render(
      <CardFooter data-testid="root" className="consumer">
        Footer
      </CardFooter>,
    );

    const root = getByTestId('root');

    expect(root).toHaveClass(styles.root);
    expect(root).toHaveClass('consumer');
  });

  it('decorates the action slot and keeps its consumer className', () => {
    const { getByTestId } = render(
      <CardFooter
        data-testid="root"
        action={{ children: <button>Action</button>, className: 'consumer-action', id: 'slot-action' }}
      >
        Footer
      </CardFooter>,
    );

    const action = getByTestId('root').querySelector('.consumer-action');

    expect(action).toHaveClass(styles.action);
    // Content and the slot-level id separate a decorated slot from one rebuilt as a bare
    // className holder: dropping the slot's state spread keeps the class and loses the rest.
    expect(action).toHaveTextContent('Action');
    expect(action).toHaveAttribute('id', 'slot-action');
  });

  it('renders no action slot when none is given', () => {
    const { getByTestId } = render(<CardFooter data-testid="root">Footer</CardFooter>);

    expect(getByTestId('root').querySelector(`.${styles.action}`)).toBeNull();
  });

  it('passes consumer props straight through to the root', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { getByTestId } = render(
      <CardFooter data-testid="root" id="my-footer" style={{ zIndex: 7 }} ref={ref}>
        Footer
      </CardFooter>,
    );

    const root = getByTestId('root');

    expect(root.id).toBe('my-footer');
    expect(root.style.zIndex).toBe('7');
    expect(ref.current).toBe(root);
  });

  it('returns a new state and mutates nothing', () => {
    const state = {
      root: { className: 'kept' },
      action: { className: 'kept-action' },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any;
    const rootBefore = state.root;
    const classNamesBefore = [state.root.className, state.action.className];

    const styled = useCardFooterStyles(state);

    expect(styled).not.toBe(state);
    expect(styled.root).not.toBe(rootBefore);
    expect([state.root.className, state.action.className]).toEqual(classNamesBefore);
  });
});
