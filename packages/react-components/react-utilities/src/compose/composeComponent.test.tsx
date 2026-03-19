/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import * as React from 'react';
import { render } from '@testing-library/react';

import { composeComponent } from './composeComponent';
import * as slot from './slot';
import { ComponentProps, ComponentState, Slot } from './types';
import { assertSlots } from './assertSlots';

describe('composeComponent', () => {
  it('sets displayName on the returned component', () => {
    const Comp = composeComponent({
      displayName: 'TestComp',
      useState: () => ({}),
      render: () => null,
    });

    expect(Comp.displayName).toBe('TestComp');
  });

  it('calls useState with props and the forwarded ref', () => {
    const ref = React.createRef<HTMLSpanElement>();
    const mockUseState = jest.fn((_props: { id?: string }, _ref: React.Ref<HTMLSpanElement>) => ({}));

    const Comp = composeComponent<HTMLSpanElement, { id?: string }, {}>({
      displayName: 'Comp',
      useState: mockUseState,
      render: () => null,
    });

    // ForwardRefComponent<{}> infers ref type as never via InferredElementRefType,
    // so we bypass the JSX type-check with createElement + cast.
    render(React.createElement(Comp as React.ComponentType<any>, { id: 'test', ref }));

    expect(mockUseState).toHaveBeenCalledTimes(1);
    expect(mockUseState).toHaveBeenCalledWith({ id: 'test' }, ref);
  });

  it('passes state returned by useState to render', () => {
    const state = { tag: 'sentinel' };
    const mockRender = jest.fn(() => null);

    const Comp = composeComponent({
      displayName: 'Comp',
      useState: () => state,
      render: mockRender,
    });

    render(<Comp />);

    expect(mockRender).toHaveBeenCalledWith(state, expect.anything());
  });

  it('forwards ref to the root DOM element', () => {
    const ref = React.createRef<HTMLSpanElement>();

    const Comp = composeComponent<HTMLSpanElement, {}, { elRef: React.Ref<HTMLSpanElement> }>({
      displayName: 'Comp',
      useState: (_props, _ref) => ({ elRef: _ref }),
      render: state => React.createElement('span', { ref: state.elRef }),
    });

    render(React.createElement(Comp as React.ComponentType<any>, { ref }));

    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });

  // -------------------------------------------------------------------------
  // useStyles
  // -------------------------------------------------------------------------

  describe('useStyles', () => {
    it('calls useStyles with state after useState', () => {
      const state = { tag: 'sentinel' };
      const mockUseStyles = jest.fn();

      const Comp = composeComponent({
        displayName: 'Comp',
        useState: () => state,
        useStyles: mockUseStyles,
        render: () => null,
      });

      render(<Comp />);

      expect(mockUseStyles).toHaveBeenCalledTimes(1);
      expect(mockUseStyles).toHaveBeenCalledWith(state);
    });

    it('calls useStyles again on every re-render with the latest state', () => {
      const mockUseStyles = jest.fn();

      const Comp = composeComponent<HTMLElement, { value: string }, { value: string }>({
        displayName: 'Comp',
        useState: props => ({ value: props.value }),
        useStyles: mockUseStyles,
        render: () => null,
      });

      const { rerender } = render(<Comp value="first" />);

      expect(mockUseStyles).toHaveBeenCalledTimes(1);
      expect(mockUseStyles).toHaveBeenLastCalledWith({ value: 'first' });

      rerender(<Comp value="second" />);

      expect(mockUseStyles).toHaveBeenCalledTimes(2);
      expect(mockUseStyles).toHaveBeenLastCalledWith({ value: 'second' });
    });

    it('state mutations from useStyles are visible in the render output', () => {
      type State = { className: string };

      const Comp = composeComponent<HTMLSpanElement, {}, State>({
        displayName: 'Comp',
        useState: () => ({ className: '' }),
        useStyles: state => {
          state.className = 'applied';
        },
        render: state => React.createElement('span', { 'data-testid': 'el', className: state.className }),
      });

      const { getByTestId } = render(<Comp />);

      expect((getByTestId('el') as HTMLElement).getAttribute('class')).toBe('applied');
    });

    it('does not crash when useStyles is omitted', () => {
      const Comp = composeComponent({
        displayName: 'Comp',
        useState: () => ({}),
        render: () => React.createElement('span', { 'data-testid': 'el' }),
      });

      const { getByTestId } = render(<Comp />);

      expect(getByTestId('el')).toBeTruthy();
    });
  });

  // -------------------------------------------------------------------------
  // useContextValues
  // -------------------------------------------------------------------------

  describe('useContextValues', () => {
    // Shared fixture: a minimal Menu that exposes `open` via React context.
    const Ctx = React.createContext({ open: false });

    type MenuProps = { open: boolean; children?: React.ReactNode };
    type MenuState = { open: boolean; children?: React.ReactNode };

    const Menu = composeComponent<HTMLDivElement, MenuProps, MenuState, { menu: { open: boolean } }>({
      displayName: 'Menu',
      useState: props => ({ open: props.open, children: props.children }),
      useContextValues: state => ({ menu: { open: state.open } }),
      render: (state, contextValues) =>
        React.createElement(Ctx.Provider, { value: contextValues!.menu }, state.children),
    });

    // React.createElement avoids native JSX in this file, which uses @fluentui/react-jsx-runtime
    // that does not declare JSX.IntrinsicElements.
    const Consumer: React.FC = () => {
      const { open } = React.useContext(Ctx);
      return React.createElement('span', { 'data-testid': 'consumer' }, open ? 'open' : 'closed');
    };

    it('passes context values returned by useContextValues to render', () => {
      const contextValues = { flag: true };
      const mockRender = jest.fn(() => null);

      const Comp = composeComponent<HTMLElement, {}, {}, { flag: boolean }>({
        displayName: 'Comp',
        useState: () => ({}),
        useContextValues: () => contextValues,
        render: mockRender,
      });

      render(<Comp />);

      expect(mockRender).toHaveBeenCalledWith({}, contextValues);
    });

    it('makes context values derived from state available to child consumers', () => {
      const { getByTestId } = render(
        <Menu open={true}>
          <Consumer />
        </Menu>,
      );

      expect(getByTestId('consumer').textContent).toBe('open');
    });

    it('re-derives context values when props change', () => {
      const { getByTestId, rerender } = render(
        <Menu open={false}>
          <Consumer />
        </Menu>,
      );

      expect(getByTestId('consumer').textContent).toBe('closed');

      rerender(
        <Menu open={true}>
          <Consumer />
        </Menu>,
      );

      expect(getByTestId('consumer').textContent).toBe('open');
    });

    it('passes an empty object to render when useContextValues is omitted', () => {
      const mockRender = jest.fn(() => null);

      const Comp = composeComponent({
        displayName: 'Comp',
        useState: () => ({}),
        render: mockRender,
      });

      render(<Comp />);

      expect(mockRender).toHaveBeenCalledWith({}, {});
    });
  });

  // -------------------------------------------------------------------------
  // Generic type parameters
  // -------------------------------------------------------------------------

  describe('generic type parameters', () => {
    it('accepts explicit Element, Props, and State type parameters', () => {
      type Props = { label: string };
      type State = { text: string };

      // Exercises the internal `props as Props` and `ref as React.Ref<Element>` casts.
      const Comp = composeComponent<HTMLSpanElement, Props, State>({
        displayName: 'TypedComp',
        useState: props => ({ text: props.label }),
        render: state => React.createElement('span', { 'data-testid': 'el' }, state.text),
      });

      const { getByTestId } = render(<Comp label="hello" />);

      expect(getByTestId('el').textContent).toBe('hello');
    });

    it('sets displayName when generic type parameters are explicit', () => {
      const Comp = composeComponent<HTMLSpanElement, { label: string }, { text: string }>({
        displayName: 'TypedComp',
        useState: props => ({ text: props.label }),
        render: () => null,
      });

      expect(Comp.displayName).toBe('TypedComp');
    });

    it('forwards the ref when generic element type is explicit', () => {
      const ref = React.createRef<HTMLSpanElement>();

      const Comp = composeComponent<HTMLSpanElement, {}, { elRef: React.Ref<HTMLSpanElement> }>({
        displayName: 'TypedComp',
        useState: (_props, _ref) => ({ elRef: _ref }),
        render: state => React.createElement('span', { ref: state.elRef }),
      });

      render(React.createElement(Comp as React.ComponentType<any>, { ref }));

      expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    });

    it('supports generic component props by casting the return value', () => {
      type ListProps<T> = { items: T[]; renderItem: (item: T, index: number) => React.ReactElement };
      type ListState<T> = Pick<ListProps<T>, 'items' | 'renderItem'>;

      const List = composeComponent<HTMLUListElement, ListProps<unknown>, ListState<unknown>>({
        displayName: 'List',
        useState: ({ items = [], renderItem }) => ({ items, renderItem }),
        render: state => React.createElement('ul', { 'data-testid': 'list' }, state.items.map(state.renderItem)),
      }) as <T>(props: ListProps<T> & React.RefAttributes<HTMLUListElement>) => React.ReactElement | null;

      const { getByTestId } = render(
        <List<string> items={['a', 'b', 'c']} renderItem={(item, i) => React.createElement('li', { key: i }, item)} />,
      );

      expect(getByTestId('list').children).toHaveLength(3);
    });
  });

  // -------------------------------------------------------------------------
  // Integration: styled and unstyled component variants
  //
  // Demonstrates the primary use-case of composeComponent: sharing the same
  // useState + render between a styled variant (with useStyles) and an unstyled
  // variant (without useStyles), mirroring the real Fluent UI component pattern.
  // -------------------------------------------------------------------------

  describe('styled and unstyled component variants', () => {
    type BadgeSlots = { root: NonNullable<Slot<'span'>> };
    type BadgeBaseProps = ComponentProps<BadgeSlots>;
    type BadgeProps = BadgeBaseProps & { variant?: 'primary' | 'secondary' };
    type BadgeBaseState = ComponentState<BadgeSlots>;
    type BadgeState = BadgeBaseState & Required<Pick<BadgeProps, 'variant'>>;

    /**
     * Base state hook, provides state slots and ARIA attributes, but no styles.
     */
    const useBadgeBase = (props: BadgeBaseProps, ref: React.Ref<HTMLSpanElement>): BadgeBaseState => {
      return {
        components: { root: 'span' },
        root: slot.always<React.ComponentProps<'span'>>(props, {
          defaultProps: { ref },
          elementType: 'span',
        }),
      };
    };

    /**
     * State hook for the styled variant, adds style-related props to the base state.
     */
    const useBadge = (props: BadgeProps, ref: React.Ref<HTMLSpanElement>): BadgeState => {
      const { variant = 'primary', ...rest } = props;
      return {
        ...useBadgeBase(rest, ref),
        variant,
      };
    };

    /**
     * Style hook that applies a className based on the variant
     */
    const useBadgeStyles = (state: BadgeState) => {
      state.root.className = `Fui-Badge Fui-Badge--${state.variant}`;
    };

    /**
     * Render function shared by both styled and unstyled variants, asserts the presence of slots and renders the root slot as a span.
     */
    const renderBadge = (state: BadgeBaseState) => {
      assertSlots<BadgeSlots>(state);
      return <state.root />;
    };

    /**
     * Styled component variant that uses the full state and styles.
     */
    const Badge = composeComponent({
      displayName: 'Badge',
      useState: useBadge,
      useStyles: useBadgeStyles,
      render: renderBadge,
    });

    /**
     * Unstyled component variant that uses the base state without styles.
     */
    const BadgeUnstyled = composeComponent({
      displayName: 'BadgeUnstyled',
      useState: useBadgeBase,
      render: renderBadge,
    });

    it('styled variant applies className via useStyles', () => {
      const { container } = render(<Badge variant="secondary">Label</Badge>);
      const el = container.firstChild as HTMLElement;

      expect(el.tagName).toBe('SPAN');
      expect(el.getAttribute('class')).toBe('Fui-Badge Fui-Badge--secondary');
    });

    it('styled variant uses the default prop value when variant is omitted', () => {
      const { container } = render(<Badge>Label</Badge>);

      expect((container.firstChild as HTMLElement).getAttribute('class')).toBe('Fui-Badge Fui-Badge--primary');
    });

    it('unstyled variant renders the same structure without any className', () => {
      const { container } = render(<BadgeUnstyled>Label</BadgeUnstyled>);
      const el = container.firstChild as HTMLElement;

      expect(el.tagName).toBe('SPAN');
      expect(el.getAttribute('class')).toBeNull();
    });
  });
});
