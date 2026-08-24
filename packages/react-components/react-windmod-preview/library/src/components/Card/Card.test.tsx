import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';

import { Card } from './Card';
import { CardHeader } from '../CardHeader/CardHeader';
import { CardPreview } from '../CardPreview/CardPreview';
import { isConformant } from '../../testing/isConformant';
import { cardClassNames, useCardStyles } from './useCardStyles';

import styles from './Card.module.css';
import previewStyles from '../CardPreview/CardPreview.module.css';

const mockContextValue = jest.fn();

// Frozen-state guard: freezes the headless hook's return so any in-place write anywhere in the
// pipeline throws instead of succeeding silently — see testing/freezeState.ts. The context-value
// spy records the state the component actually feeds to renderCard.
jest.mock('@fluentui/react-headless-components-preview/card', () => {
  const actual = jest.requireActual('@fluentui/react-headless-components-preview/card');
  const { deepFreezeState } = require('../../testing/freezeState');

  return {
    ...actual,
    useCard: (...args: Parameters<typeof actual.useCard>) => deepFreezeState(actual.useCard(...args)),
    useCardContextValue: (...args: Parameters<typeof actual.useCardContextValue>) => {
      mockContextValue(...args);

      return actual.useCardContextValue(...args);
    },
  };
});

// `fuicm-root` is the same jest ident for all four modules in this family, so every root is
// identified by its marker class and every cross-component assertion goes through the DOM tree.
const cardRoot = (container: HTMLElement) => container.querySelector('.fui-card') as HTMLElement;

// The return annotation is load-bearing: an unannotated inline arrow inside an it.each table
// makes the table's own type circular (TS7023).
const noop = (): void => undefined;

describe('Card', () => {
  beforeEach(() => mockContextValue.mockClear());

  isConformant({
    Component: Card,
    displayName: 'Card',
    requiredProps: { children: 'Card' },
  });

  it('stamps the marker class', () => {
    const { getByTestId } = render(<Card data-testid="root">Card</Card>);

    const root = getByTestId('root');

    expect(root).toHaveClass('fui-card');
    expect(root).toHaveClass('group/fui-card');
    expect(root.classList[0]).toBe('fui-card');
    expect(cardClassNames.root).toBe('fui-card group/fui-card');
  });

  it('carries the root style class and the consumer className', () => {
    const { getByTestId } = render(
      <Card data-testid="root" className="consumer">
        Card
      </Card>,
    );

    const root = getByTestId('root');

    expect(root).toHaveClass(styles.root);
    expect(root).toHaveClass('consumer');
    expect(root).not.toHaveClass(previewStyles.logo);
  });

  it('defaults the three look props', () => {
    const { getByTestId } = render(<Card data-testid="root">Card</Card>);

    const root = getByTestId('root');

    expect(root.getAttribute('data-appearance')).toBe('filled');
    expect(root.getAttribute('data-orientation')).toBe('vertical');
    expect(root.getAttribute('data-size')).toBe('medium');
    expect(root.hasAttribute('data-interactive')).toBe(false);
  });

  it('stamps the three look props from props', () => {
    const { getByTestId } = render(
      <Card data-testid="root" appearance="outline" orientation="horizontal" size="large">
        Card
      </Card>,
    );

    const root = getByTestId('root');

    expect(root.getAttribute('data-appearance')).toBe('outline');
    expect(root.getAttribute('data-orientation')).toBe('horizontal');
    expect(root.getAttribute('data-size')).toBe('large');
  });

  it.each([
    ['onClick', { onClick: noop }, true],
    ['onDoubleClick', { onDoubleClick: noop }, true],
    ['onDragStart', { onDragStart: noop }, true],
    ['onFocus', { onFocus: noop }, false],
    ['selectable', { selected: false, onSelectionChange: noop }, true],
    ['onClick + disabled', { onClick: noop, disabled: true }, false],
    ['selected + disabled', { selected: true, onSelectionChange: noop, disabled: true }, false],
  ])('gates data-interactive on %s', (_label, props, expected) => {
    const { getByTestId } = render(
      <Card data-testid="root" {...props}>
        Card
      </Card>,
    );

    const root = getByTestId('root');

    expect(root.hasAttribute('data-interactive')).toBe(expected);
    // `|| undefined` keeps the attribute off entirely rather than stamping the string "false".
    expect(root.getAttribute('data-interactive')).toBe(expected ? 'true' : null);
  });

  it('does not stamp a floating-action attribute — the preview reaches it by sibling combinator', () => {
    const { getByTestId } = render(
      <Card data-testid="root" floatingAction={{ children: <button>A</button> }}>
        Card
      </Card>,
    );

    expect(getByTestId('root').hasAttribute('data-floating-action')).toBe(false);
  });

  it.each([
    ['default', {}, 'focused'],
    ['selectable at rest', { selected: false, onSelectionChange: noop }, 'none'],
    ['disabled', { disabled: true }, 'none'],
    ['disabled + selected', { selected: true, onSelectionChange: noop, disabled: true }, 'none'],
  ])('picks the focus class for %s', (_label, props, expected) => {
    const { getByTestId } = render(
      <Card data-testid="root" {...props}>
        Card
      </Card>,
    );

    const root = getByTestId('root');

    expect(root.classList.contains(styles.focused)).toBe(expected === 'focused');
    expect(root.classList.contains(styles.selectableFocused)).toBe(false);
  });

  it('swaps to the selectable focus class while the hidden checkbox holds focus', () => {
    const { container, getByTestId } = render(
      <Card data-testid="root" selected={false} onSelectionChange={noop}>
        Card
      </Card>,
    );

    const root = getByTestId('root');
    const checkbox = container.querySelector('input[type="checkbox"]') as HTMLInputElement;

    expect(root.classList.contains(styles.selectableFocused)).toBe(false);

    fireEvent.focus(checkbox);
    expect(root.classList.contains(styles.selectableFocused)).toBe(true);
    expect(root.classList.contains(styles.focused)).toBe(false);

    fireEvent.blur(checkbox);
    expect(root.classList.contains(styles.selectableFocused)).toBe(false);
  });

  it('decorates the floatingAction slot and keeps its consumer className', () => {
    const { container } = render(
      <Card floatingAction={{ children: <button>Action</button>, className: 'consumer-action', id: 'slot-action' }}>
        Card
      </Card>,
    );

    const action = cardRoot(container).firstElementChild as HTMLElement;

    expect(action).toHaveClass(styles.floatingAction);
    expect(action).toHaveClass('consumer-action');
    // Content and the slot-level id separate a decorated slot from one rebuilt as a bare
    // className holder: dropping the slot's state spread keeps the class and loses the rest.
    expect(action).toHaveTextContent('Action');
    expect(action).toHaveAttribute('id', 'slot-action');
  });

  it('decorates the checkbox slot and keeps its consumer className', () => {
    const { container } = render(
      <Card selected={false} onSelectionChange={noop} checkbox={{ className: 'consumer-checkbox' }}>
        Card
      </Card>,
    );

    const checkbox = container.querySelector('input[type="checkbox"]') as HTMLInputElement;

    expect(checkbox).toHaveClass(styles.checkbox);
    expect(checkbox).toHaveClass('consumer-checkbox');
  });

  it.each([
    ['selectable', { selected: false, onSelectionChange: noop }, true],
    [
      'selectable + floatingAction',
      { selected: false, onSelectionChange: noop, floatingAction: { children: <button>A</button> } },
      false,
    ],
    ['selectable + checkbox null', { selected: false, onSelectionChange: noop, checkbox: null }, false],
    ['not selectable', {}, false],
  ])('passes the headless checkbox gating through for %s', (_label, props, expected) => {
    const { container } = render(<Card {...props}>Card</Card>);

    expect(container.querySelector('input[type="checkbox"]') !== null).toBe(expected);
  });

  it('passes consumer props straight through to the root', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { getByTestId } = render(
      <Card data-testid="root" id="my-card" role="article" style={{ zIndex: 7 }} ref={ref}>
        Card
      </Card>,
    );

    const root = getByTestId('root');

    expect(root.id).toBe('my-card');
    expect(root.getAttribute('role')).toBe('article');
    expect(root.style.zIndex).toBe('7');
    expect(ref.current).toBe(root);
  });

  it('keeps the headless selection behaviour intact', () => {
    const onSelectionChange = jest.fn();
    const onClick = jest.fn();
    const { getByTestId } = render(
      <Card data-testid="root" selected={false} onSelectionChange={onSelectionChange} onClick={onClick}>
        Card
      </Card>,
    );

    const root = getByTestId('root');

    fireEvent.click(root);
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onSelectionChange).toHaveBeenCalledTimes(1);
    expect(onSelectionChange.mock.calls[0][1]).toEqual({ selected: true });

    fireEvent.keyDown(root, { key: 'Enter' });
    expect(onSelectionChange).toHaveBeenCalledTimes(2);
  });

  it('fires no selection handler on a disabled selectable card', () => {
    const onSelectionChange = jest.fn();
    const { getByTestId } = render(
      <Card data-testid="root" selected={false} onSelectionChange={onSelectionChange} disabled>
        Card
      </Card>,
    );

    fireEvent.click(getByTestId('root'));
    fireEvent.keyDown(getByTestId('root'), { key: 'Enter' });

    expect(onSelectionChange).not.toHaveBeenCalled();
  });

  it('builds the card context from the STYLED state', () => {
    render(<Card>Card</Card>);

    expect(mockContextValue).toHaveBeenCalled();

    const state = mockContextValue.mock.calls[0][0];

    expect(state.root.className).toContain(styles.root);
    expect(state.root.className).toContain('fui-card');
  });

  it('wires a CardHeader id into the checkbox aria-labelledby through the context', () => {
    const { container } = render(
      <Card selected={false} onSelectionChange={noop}>
        <CardHeader header="Header" />
      </Card>,
    );

    const checkbox = container.querySelector('input[type="checkbox"]') as HTMLInputElement;
    const header = container.querySelector('.fui-card-header') as HTMLElement;
    const labelledBy = checkbox.getAttribute('aria-labelledby');

    expect(labelledBy).toBeTruthy();
    expect(header.querySelector(`#${labelledBy}`)).not.toBeNull();
  });

  it('gives a CardHeader outside a Card no card-driven labelling', () => {
    const { container } = render(<CardHeader header="Header" />);

    // Control for the wiring test above. The header's id is supplied by the card context, so
    // outside a Card there is no id at all — asserting on the id is what makes this a control;
    // asserting that a CardHeader renders no checkbox would hold no matter what the wiring did.
    const header = container.querySelector('.fui-card-header')?.firstElementChild as HTMLElement;

    expect(header).toHaveTextContent('Header');
    expect(header.hasAttribute('id')).toBe(false);
  });

  it('keeps each component’s own root class inside one tree', () => {
    const { container } = render(
      <Card>
        <CardPreview>
          <span>media</span>
        </CardPreview>
      </Card>,
    );

    const root = cardRoot(container);
    const preview = container.querySelector('.fui-card-preview') as HTMLElement;

    expect(root).toHaveClass(styles.root);
    expect(preview).toHaveClass(previewStyles.root);
    expect(preview).not.toBe(root);
    expect(preview.parentElement).toBe(root);
  });

  it('returns a new state and mutates nothing', () => {
    const state = {
      appearance: 'filled',
      orientation: 'vertical',
      size: 'medium',
      root: { className: 'kept' },
      floatingAction: { className: 'kept-action' },
      checkbox: { className: 'kept-checkbox' },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any;
    const snapshot = {
      root: state.root,
      rootClassName: state.root.className,
      actionClassName: state.floatingAction.className,
      checkboxClassName: state.checkbox.className,
    };

    const styled = useCardStyles(state);

    expect(styled).not.toBe(state);
    expect(styled.root).not.toBe(snapshot.root);
    expect(state.root.className).toBe(snapshot.rootClassName);
    expect(state.floatingAction.className).toBe(snapshot.actionClassName);
    expect(state.checkbox.className).toBe(snapshot.checkboxClassName);
  });
});
