import { Accessibility } from '@fluentui/accessibility';
import { compose, RendererRenderRule, StylesContextValue, useAccessibility, useStyles, useUnhandledProps } from '@fluentui/react-bindings';
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

const baseBehavior: Accessibility = props => ({
  attributes: {
    root: props
  }
});

type BaseComponentProps = { accessibility?: Accessibility; color?: string; label?: string } & React.HTMLAttributes<HTMLParagraphElement>;

const BaseComponent: React.FC<BaseComponentProps> = props => {
  const { accessibility = baseBehavior, color, label } = props;

  const getA11yProps = useAccessibility(accessibility, {
    mapPropsToBehavior: () => ({
      'aria-label': label
    })
  });
  const { classes } = useStyles('BaseComponent', {
    className: 'ui-base',
    mapPropsToStyles: () => ({ color })
  });
  const unhandledProps = useUnhandledProps(['className', 'color', 'label'], props);

  return <p {...getA11yProps('root', { ...unhandledProps, className: classes.root })} />;
};

type ComposedComponentProps = {
  visible?: boolean;
};

const ComposedComponent = compose<ComposedComponentProps, any, any, BaseComponentProps>(BaseComponent, {
  className: 'ui-composed',
  displayName: 'ComposedComponent',

  mapPropsToBehavior: () => ({ 'aria-label': 'Foo' }),
  mapPropsToStyles: props => ({ visible: props.visible }),
  handledProps: ['hidden', 'visible']
});

const MultipleComposedComponent = compose<{}, any, any, BaseComponentProps & ComposedComponentProps>(ComposedComponent, {
  displayName: 'MultipleComposedComponent',

  mapPropsToBehavior: () => ({ 'aria-describedby': 'id' }),
  mapPropsToStyles: props => ({ hidden: props.hidden, visible: undefined })
});

describe('useCompose', () => {
  it('applies props on base component', () => {
    const wrapper = mount(<BaseComponent label="Base component" color="red" />, {
      wrappingComponent: TestProvider
    });

    expect(wrapper.find('p').prop('aria-label')).toBe('Base component');

    expect(wrapper.find('p').prop('className')).toContain('ui-base');
    expect(wrapper.find('p').prop('className')).toContain('color-red');
  });

  it('applies props on composed component', () => {
    const wrapper = mount(<ComposedComponent hidden color="red" visible />, {
      wrappingComponent: TestProvider
    });

    expect(wrapper.find('p').prop('aria-label')).toBe('Foo');

    expect(wrapper.find('p').prop('hidden')).toBeUndefined();
    expect(wrapper.find('p').prop('visible')).toBeUndefined();

    expect(wrapper.find('p').prop('className')).toContain('ui-composed');
    expect(wrapper.find('p').prop('className')).toContain('color-red');
    expect(wrapper.find('p').prop('className')).toContain('visible-true');
  });

  it('applies props on multiple times composed component', () => {
    const wrapper = mount(<MultipleComposedComponent hidden color="red" visible />, {
      wrappingComponent: TestProvider
    });

    expect(wrapper.find('p').prop('aria-label')).toBe('Foo');
    expect(wrapper.find('p').prop('aria-describedby')).toBe('id');

    expect(wrapper.find('p').prop('hidden')).toBeUndefined();
    expect(wrapper.find('p').prop('visible')).toBeUndefined();

    expect(wrapper.find('p').prop('className')).toContain('ui-composed');
    expect(wrapper.find('p').prop('className')).toContain('color-red');
    expect(wrapper.find('p').prop('className')).toContain('hidden-true');
    expect(wrapper.find('p').prop('className')).not.toContain('visible-true');
  });
});
