import { Accessibility } from '@fluentui/accessibility';
import { RendererRenderRule, StylesContextValue, useAccessibility, useStyles, useUnhandledProps } from '@fluentui/react-bindings';
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

        return cx(props.color && `color-${props.color}`);
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

type BaseComponentProps = { accessibility?: Accessibility; color?: string } & React.HTMLAttributes<HTMLParagraphElement>;

const BaseComponent: React.FC<BaseComponentProps> = props => {
  const { accessibility = baseBehavior, color } = props;

  const getA11yProps = useAccessibility(accessibility, {
    mapPropsToBehavior: () => ({
      'aria-label': props['aria-label']
    })
  });
  const { classes } = useStyles('BaseComponent', {
    className: 'ui-base',
    mapPropsToStyles: () => ({ color })
  });
  const unhandledProps = useUnhandledProps(['className', 'color'], props);

  return <p {...getA11yProps('root', { ...unhandledProps, className: classes.root })} />;
};

describe('useCompose', () => {
  it('applies props on base component', () => {
    const wrapper = mount(<BaseComponent aria-label="Base component" color="red" />, {
      wrappingComponent: TestProvider
    });

    expect(wrapper.find('p').prop('aria-label')).toContain('Base component');

    expect(wrapper.find('p').prop('className')).toContain('ui-base');
    expect(wrapper.find('p').prop('className')).toContain('color-red');
  });
});
