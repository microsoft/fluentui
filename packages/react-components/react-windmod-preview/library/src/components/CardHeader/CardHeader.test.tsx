import * as React from 'react';
import { render } from '@testing-library/react';

import { CardHeader } from './CardHeader';
import { isConformant } from '../../testing/isConformant';
import { cardHeaderClassNames, useCardHeaderStyles } from './useCardHeaderStyles';

import styles from './CardHeader.module.css';

// Frozen-state guard: freezes the headless hook's return so any in-place write anywhere in the
// pipeline throws instead of succeeding silently — see testing/freezeState.ts.
jest.mock('@fluentui/react-headless-components-preview/card', () => {
  const actual = jest.requireActual('@fluentui/react-headless-components-preview/card');
  const { deepFreezeState } = require('../../testing/freezeState');

  return {
    ...actual,
    useCardHeader: (...args: Parameters<typeof actual.useCardHeader>) => deepFreezeState(actual.useCardHeader(...args)),
  };
});

const slots = (root: HTMLElement) => ({
  image: root.querySelector(`.${styles.image}`),
  header: root.querySelector(`.${styles.header}`),
  description: root.querySelector(`.${styles.description}`),
  action: root.querySelector(`.${styles.action}`),
});

describe('CardHeader', () => {
  isConformant({
    Component: CardHeader,
    displayName: 'CardHeader',
    requiredProps: { header: 'Header' },
  });

  it('stamps the marker class', () => {
    const { getByTestId } = render(<CardHeader data-testid="root" header="Header" />);

    const root = getByTestId('root');

    expect(root).toHaveClass('fui-card-header');
    expect(root).toHaveClass('group/fui-card-header');
    expect(root.classList[0]).toBe('fui-card-header');
    expect(cardHeaderClassNames.root).toBe('fui-card-header group/fui-card-header');
  });

  it('carries the root style class and the consumer className', () => {
    const { getByTestId } = render(<CardHeader data-testid="root" className="consumer" header="Header" />);

    const root = getByTestId('root');

    expect(root).toHaveClass(styles.root);
    expect(root).toHaveClass('consumer');
  });

  it('stamps data-description only when the slot exists', () => {
    const { getByTestId } = render(
      <>
        <CardHeader data-testid="plain" header="Header" />
        <CardHeader data-testid="described" header="Header" description="Description" />
      </>,
    );

    expect(getByTestId('plain').hasAttribute('data-description')).toBe(false);
    expect(getByTestId('described').getAttribute('data-description')).toBe('true');
  });

  it('decorates every slot it renders and carries its content through', () => {
    const { getByTestId } = render(
      <CardHeader
        data-testid="root"
        image={{ children: <i>Image</i> }}
        header="Header"
        description="Description"
        action={{ children: <button>Action</button> }}
      />,
    );

    const found = slots(getByTestId('root'));

    // The content assertions are what separate a decorated slot from one rebuilt as a bare
    // className holder: dropping a slot's state spread keeps the class and loses the children.
    expect(found.image).toHaveTextContent('Image');
    expect(found.header).toHaveTextContent('Header');
    expect(found.description).toHaveTextContent('Description');
    expect(found.action).toHaveTextContent('Action');
  });

  it('keeps each slot’s consumer className and slot-level props', () => {
    const { getByTestId } = render(
      <CardHeader
        data-testid="root"
        image={{ children: <i />, className: 'consumer-image', id: 'slot-image' }}
        header={{ children: 'Header', className: 'consumer-header', id: 'slot-header' }}
        description={{ children: 'Description', className: 'consumer-description', id: 'slot-description' }}
        action={{ children: <button>A</button>, className: 'consumer-action', id: 'slot-action' }}
      />,
    );

    const root = getByTestId('root');

    expect(root.querySelector('.consumer-image')).toHaveClass(styles.image);
    expect(root.querySelector('.consumer-header')).toHaveClass(styles.header);
    expect(root.querySelector('.consumer-description')).toHaveClass(styles.description);
    expect(root.querySelector('.consumer-action')).toHaveClass(styles.action);

    // A slot carries more than its className; the id stands in for every other slot-level prop.
    expect(root.querySelector('.consumer-image')).toHaveAttribute('id', 'slot-image');
    expect(root.querySelector('.consumer-header')).toHaveAttribute('id', 'slot-header');
    expect(root.querySelector('.consumer-description')).toHaveAttribute('id', 'slot-description');
    expect(root.querySelector('.consumer-action')).toHaveAttribute('id', 'slot-action');
  });

  it('passes consumer props straight through to the root', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { getByTestId } = render(
      <CardHeader data-testid="root" id="my-header" style={{ zIndex: 7 }} header="Header" ref={ref} />,
    );

    const root = getByTestId('root');

    expect(root.id).toBe('my-header');
    expect(root.style.zIndex).toBe('7');
    expect(ref.current).toBe(root);
  });

  it('returns a new state and mutates nothing', () => {
    const state = {
      root: { className: 'kept' },
      image: { className: 'kept-image' },
      header: { className: 'kept-header' },
      description: { className: 'kept-description' },
      action: { className: 'kept-action' },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any;
    const rootBefore = state.root;
    const classNamesBefore = [
      state.root.className,
      state.image.className,
      state.header.className,
      state.description.className,
      state.action.className,
    ];

    const styled = useCardHeaderStyles(state);

    expect(styled).not.toBe(state);
    expect(styled.root).not.toBe(rootBefore);
    expect([
      state.root.className,
      state.image.className,
      state.header.className,
      state.description.className,
      state.action.className,
    ]).toEqual(classNamesBefore);
  });
});
