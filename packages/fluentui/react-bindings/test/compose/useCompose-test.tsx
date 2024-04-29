import {
  compose,
  ProviderContextPrepared,
  useStyles,
  useUnhandledProps,
  Unstable_FluentContextProvider,
} from '@fluentui/react-bindings';
import { noopRenderer } from '@fluentui/react-northstar-styles-renderer';
import { ComponentSlotStylesPrepared, emptyTheme, ThemeInput } from '@fluentui/styles';
import cx from 'classnames';
import { mount, shallow } from 'enzyme';
import * as React from 'react';

const TestProvider: React.FC<{ theme: ThemeInput }> = props => {
  const value: ProviderContextPrepared = {
    disableAnimations: false,
    renderer: {
      ...noopRenderer,
      renderRule: (props: any) => {
        return cx(
          props.color && `color-${props.color}`,
          props.hidden && `hidden-${props.hidden}`,
          props.visible && `visible-${props.visible}`,
        );
      },
    },
    performance: {
      enableStylesCaching: false,
      enableVariablesCaching: false,
      enableSanitizeCssPlugin: false,
      enableBooleanVariablesCaching: false,
    },
    rtl: false,
    telemetry: undefined,
    target: undefined,
    theme: {
      ...emptyTheme,
      // Noop to pass all props as styles to `renderRule()`
      componentStyles: new Proxy({}, { get: (): ComponentSlotStylesPrepared => ({ root: ({ props }) => props }) }),
    },
  };

  return <Unstable_FluentContextProvider value={value}>{props.children}</Unstable_FluentContextProvider>;
};

type BaseComponentProps = { color?: string } & React.HTMLAttributes<HTMLButtonElement>;
type BaseComponentStylesProps = { color: string | undefined; open: boolean };

const BaseComponent: React.FC<BaseComponentProps> = compose<
  'button',
  BaseComponentProps,
  BaseComponentStylesProps,
  {},
  {}
>(
  (props, ref, composeOptions) => {
    const { color } = props;

    const [open, setOpen] = React.useState(false);
    const { classes } = useStyles<BaseComponentStylesProps>(composeOptions.displayName, {
      className: composeOptions.className,
      composeOptions,
      mapPropsToStyles: () => ({ color, open }),
      unstable_props: props,
    });
    const unhandledProps = useUnhandledProps(composeOptions.handledProps, props);

    return (
      <button
        className={classes.root}
        data-display-name={(composeOptions.slots.__self as typeof BaseComponent).displayName}
        onClick={() => setOpen(!open)}
        ref={ref}
        {...unhandledProps}
      />
    );
  },
  {
    className: 'ui-base',
    displayName: 'BaseComponent',
    handledProps: ['className', 'color'],
  },
);

type ComposedComponentProps = { hidden?: boolean; visible?: boolean };
type ComposedComponentStylesProps = { visible: boolean | undefined };

const ComposedComponent = compose<
  'button',
  ComposedComponentProps,
  ComposedComponentStylesProps,
  BaseComponentProps,
  BaseComponentStylesProps
>(BaseComponent, {
  className: 'ui-composed',
  displayName: 'ComposedComponent',
  mapPropsToStylesProps: props => ({ visible: props.open && props.visible }),
  handledProps: ['hidden', 'visible'],
});

const MultipleComposedComponent = compose<
  'button',
  ComposedComponentProps,
  ComposedComponentStylesProps,
  BaseComponentProps & ComposedComponentProps,
  BaseComponentStylesProps & ComposedComponentStylesProps
>(ComposedComponent, {
  displayName: 'MultipleComposedComponent',
  mapPropsToStylesProps: props => ({ hidden: props.hidden, visible: undefined }),
});

type BaseComponentWithSlotsProps = {
  'data-start'?: boolean;
  'data-main'?: boolean;
  'data-end'?: boolean;
} & React.HTMLAttributes<HTMLButtonElement>;
type BaseComponentWithSlotsStylesProps = {};

const BaseComponentWithSlots: React.FC<BaseComponentProps> = compose<
  'button',
  BaseComponentWithSlotsProps,
  BaseComponentWithSlotsStylesProps,
  {},
  {}
>(
  (props, ref, composeOptions) => {
    const { classes } = useStyles<BaseComponentStylesProps>(composeOptions.displayName, {
      className: composeOptions.className,
      composeOptions,
      unstable_props: props,
    });
    const unhandledProps = useUnhandledProps(composeOptions.handledProps, props);

    const Start = composeOptions.slots.start;
    const Main = composeOptions.slots.main;
    const End = composeOptions.slots.end;

    const slotProps = composeOptions.resolveSlotProps(props);

    return (
      <button className={classes.root} {...unhandledProps} ref={ref}>
        <Start className={classes.root} id="start" {...slotProps.start} />
        <Main className={classes.root} id="main" {...slotProps.main} />
        <End className={classes.root} id="end" {...slotProps.end} />
      </button>
    );
  },
  {
    className: 'ui-base-with-slots',
    displayName: 'BaseComponentWithSlots',
    handledProps: ['className', 'data-start', 'data-end', 'data-main'],
    slots: {
      start: 'span',
      main: 'b',
      end: 'i',
    },
    slotProps: props => ({
      start: {
        'data-attr': props['data-start'],
      },
      main: {
        'data-attr': props['data-main'],
      },
      end: {
        'data-attr': props['data-end'],
      },
    }),
  },
);

describe('useCompose', () => {
  it('applies props on base component', () => {
    const wrapper = mount(<BaseComponent color="red" />, { wrappingComponent: TestProvider });

    expect(wrapper.find('button').prop('className')).toContain('ui-base');
    expect(wrapper.find('button').prop('className')).toContain('color-red');
  });

  it('applies props on composed component', () => {
    const wrapper = mount(<ComposedComponent hidden color="red" visible />, { wrappingComponent: TestProvider });

    expect(wrapper.find('button').prop('hidden')).toBeUndefined();
    expect(wrapper.find('button').prop('visible')).toBeUndefined();

    expect(wrapper.find('button').prop('className')).toContain('ui-composed');
    expect(wrapper.find('button').prop('className')).toContain('color-red');
    expect(wrapper.find('button').prop('className')).not.toContain('visible-true');

    wrapper.find('button').simulate('click');
    expect(wrapper.find('button').prop('className')).toContain('visible-true');
  });

  it('applies props on multiple times composed component', () => {
    const wrapper = mount(<MultipleComposedComponent hidden color="red" visible />, {
      wrappingComponent: TestProvider,
    });

    expect(wrapper.find('button').prop('hidden')).toBeUndefined();
    expect(wrapper.find('button').prop('visible')).toBeUndefined();

    expect(wrapper.find('button').prop('className')).toContain('ui-composed');
    expect(wrapper.find('button').prop('className')).toContain('color-red');
    expect(wrapper.find('button').prop('className')).toContain('hidden-true');
    expect(wrapper.find('button').prop('className')).not.toContain('visible-true');
  });

  it('applies correct slots in the structure', () => {
    const wrapper = shallow(<BaseComponentWithSlots />);

    expect(wrapper.find('#start').name()).toEqual('span');
    expect(wrapper.find('#main').name()).toEqual('b');
    expect(wrapper.find('#end').name()).toEqual('i');
  });

  it('passes component definition as "__self"', () => {
    const wrapper = shallow(<BaseComponent />);

    expect(wrapper.find('button').prop('data-display-name')).toEqual('BaseComponent');
  });

  it('applies mapped props to correct slots', () => {
    const wrapper = shallow(<BaseComponentWithSlots data-main={true} data-end={false} />);

    const startDataAttr = wrapper.find('#start').prop('data-attr');
    expect(startDataAttr).toEqual(undefined);

    const mainDataAttr = wrapper.find('#main').prop('data-attr');
    expect(mainDataAttr).toEqual(true);

    const endDataAttr = wrapper.find('#end').prop('data-attr');
    expect(endDataAttr).toEqual(false);
  });

  it('merges mapped props to slot props along the chain', () => {
    const ComposedComponentWithSlots = compose<
      'button',
      BaseComponentProps & { 'data-main-composed'?: boolean },
      {},
      BaseComponentWithSlotsProps,
      {}
    >(BaseComponentWithSlots, {
      className: 'ui-composed-with-slots',
      displayName: 'ComposedComponentWithSlots',
      slotProps: props => ({
        start: { 'data-attr': false },
        main: { 'data-main-composed': props['data-main-composed'] },
      }),
      handledProps: ['data-main-composed'],
    });

    const wrapper = shallow(
      <ComposedComponentWithSlots data-start={true} data-main={true} data-main-composed={true} />,
    );

    const startDataAttr = wrapper.find('#start').prop('data-attr');
    expect(startDataAttr).toEqual(false);

    const mainComposedDataAttr = wrapper.find('#main').prop('data-main-composed');
    expect(mainComposedDataAttr).toEqual(true);

    const mainDataAttr = wrapper.find('#main').prop('data-attr');
    expect(mainDataAttr).toEqual(true);
  });
});
