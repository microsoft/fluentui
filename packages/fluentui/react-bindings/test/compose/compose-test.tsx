import { compose, RendererRenderRule, StylesContextValue, useStyles, useUnhandledProps } from '@fluentui/react-bindings';
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
          props.visible && `visible-${props.visible}`
        );
      }
    },
    performance: {
      enableStylesCaching: false,
      enableVariablesCaching: false,
      enableSanitizeCssPlugin: false,
      enableBooleanVariablesCaching: false
    },
    theme: {
      ...emptyTheme,
      // Noop to pass all props as styles to `renderRule()`
      componentStyles: new Proxy({}, { get: (): ComponentSlotStylesPrepared => ({ root: ({ props }) => props }) })
    }
  };

  return <ThemeContext.Provider value={value}>{props.children}</ThemeContext.Provider>;
};

type BaseComponentProps = { color?: string } & React.HTMLAttributes<HTMLParagraphElement>;

const BaseComponent: React.FC<BaseComponentProps> = props => {
  const { color } = props;

  const { classes } = useStyles('BaseComponent', {
    className: 'ui-base',
    mapPropsToStyles: () => ({ color })
  });
  const unhandledProps = useUnhandledProps(['className', 'color'], props);

  return <p className={classes.root} {...unhandledProps} />;
};

type ComposedComponentProps = {
  hidden?: boolean;
  visible?: boolean;
};

const ComposedComponent = compose<ComposedComponentProps, any, BaseComponentProps, any>(BaseComponent, {
  className: 'ui-composed',
  displayName: 'ComposedComponent',
  mapPropsToStylesProps: (props: any) => ({ visible: props.visible }),
  handledProps: ['hidden', 'visible']
});

const MultipleComposedComponent = compose<{}, any, BaseComponentProps & ComposedComponentProps, any>(ComposedComponent, {
  displayName: 'MultipleComposedComponent',
  mapPropsToStylesProps: (props: any) => ({ hidden: props.hidden, visible: undefined })
});

describe('useCompose', () => {
  it('applies props on base component', () => {
    const wrapper = mount(<BaseComponent color="red" />, { wrappingComponent: TestProvider });

    expect(wrapper.find('p').prop('className')).toContain('ui-base');
    expect(wrapper.find('p').prop('className')).toContain('color-red');
  });

  it('applies props on composed component', () => {
    const wrapper = mount(<ComposedComponent hidden color="red" visible />, { wrappingComponent: TestProvider });

    expect(wrapper.find('p').prop('hidden')).toBeUndefined();
    expect(wrapper.find('p').prop('visible')).toBeUndefined();

    expect(wrapper.find('p').prop('className')).toContain('ui-composed');
    expect(wrapper.find('p').prop('className')).toContain('color-red');
    expect(wrapper.find('p').prop('className')).toContain('visible-true');
  });

  it('applies props on multiple times composed component', () => {
    const wrapper = mount(<MultipleComposedComponent hidden color="red" visible />, { wrappingComponent: TestProvider });

    expect(wrapper.find('p').prop('hidden')).toBeUndefined();
    expect(wrapper.find('p').prop('visible')).toBeUndefined();

    expect(wrapper.find('p').prop('className')).toContain('ui-composed');
    expect(wrapper.find('p').prop('className')).toContain('color-red');
    expect(wrapper.find('p').prop('className')).toContain('hidden-true');
    expect(wrapper.find('p').prop('className')).not.toContain('visible-true');
  });
});
