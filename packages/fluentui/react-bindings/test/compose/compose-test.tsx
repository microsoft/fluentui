import {
  compose,
  RendererRenderRule,
  StylesContextValue,
  useStyles,
  useUnhandledProps,
} from '@fluentui/react-bindings';
import { ComponentSlotStylesPrepared, emptyTheme, ThemeInput } from '@fluentui/styles';
import cx from 'classnames';
import { mount } from 'enzyme';
import * as React from 'react';
// @ts-ignore
import { ThemeContext } from 'react-fela';

const TestProvider: React.FC<{ theme: ThemeInput }> = props => {
  const value: StylesContextValue<{ renderRule: RendererRenderRule }> = {
    disableAnimations: false,
    renderer: {
      renderRule: rule => {
        const props = rule();

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
    theme: {
      ...emptyTheme,
      // Noop to pass all props as styles to `renderRule()`
      componentStyles: new Proxy({}, { get: (): ComponentSlotStylesPrepared => ({ root: ({ props }) => props }) }),
    },
  };

  return <ThemeContext.Provider value={value}>{props.children}</ThemeContext.Provider>;
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

    // @ts-ignore
    return <button className={classes.root} onClick={() => setOpen(!open)} {...unhandledProps} ref={ref} />;
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
});
