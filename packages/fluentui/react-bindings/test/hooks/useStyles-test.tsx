import { useStyles, Unstable_FluentContextProvider } from '@fluentui/react-bindings';
import { ComponentSlotStyle, ComponentVariablesInput, ThemeInput } from '@fluentui/styles';
import { mount, shallow } from 'enzyme';
import * as React from 'react';

type TestComponentProps = {
  className?: string;
  color?: string;

  styles?: ComponentSlotStyle<TestComponentProps>;
  variables?: ComponentVariablesInput;
};

const TestComponent: React.FunctionComponent<TestComponentProps> = props => {
  const { className, color, styles, variables } = props;

  const { classes } = useStyles('Test', {
    className: 'ui-test',
    mapPropsToStyles: () => ({ color }),
    mapPropsToInlineStyles: () => ({ className, styles, variables }),
  });

  return <div className={classes.root} />;
};

const createTheme = (styles: jest.Mock): ThemeInput => ({
  componentStyles: {
    Test: { root: styles },
  },
  componentVariables: {},
});

describe('useStyles', () => {
  describe('className', () => {
    it('applies "className" from options', () => {
      const wrapper = shallow(<TestComponent />);

      expect(wrapper.find('div').prop('className')).toContain('ui-test');
    });

    it('applies "className" from props', () => {
      const wrapper = shallow(<TestComponent className="foo" />);

      expect(wrapper.find('div').prop('className')).toContain('foo');
    });
  });

  describe('styles', () => {
    it('passes props mapped via "mapPropsToStyles" to styles functions', () => {
      const styles = jest.fn();
      mount(<TestComponent color="green" />, {
        wrappingComponent: Unstable_FluentContextProvider,
        wrappingComponentProps: { value: { performance: {}, theme: createTheme(styles) } },
      });

      expect(styles).toBeCalledWith(
        expect.objectContaining({
          props: { color: 'green' },
        }),
      );
    });
  });
});
