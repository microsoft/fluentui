import { useStyles } from '@fluentui/react-bindings'
import { ComponentSlotStyle, ComponentVariablesInput, ThemeInput } from '@fluentui/styles'
import { mount, shallow } from 'enzyme'
import * as React from 'react'
// @ts-ignore
import { ThemeContext } from 'react-fela'

type TestComponentProps = {
  className?: string
  color?: string

  styles?: ComponentSlotStyle<TestComponentProps>
  variables?: ComponentVariablesInput
}

const TestComponent: React.FunctionComponent<TestComponentProps> = props => {
  const { className, color, styles, variables } = props

  const { classes } = useStyles('Test', {
    className: 'ui-test',
    mapPropsToStyles: () => ({ color }),
    mapPropsToInlineStyles: () => ({ className, styles, variables }),
  })

  return <div className={classes.root} />
}

const createTheme = (styles: jest.Mock): ThemeInput => ({
  componentStyles: {
    Test: { root: styles },
  },
  componentVariables: {},
})

const TestProvider: React.FC<{ theme: ThemeInput }> = props => {
  const { children, theme } = props

  return (
    <ThemeContext.Provider
      value={{
        theme,
        _internal_resolvedComponentVariables: {},
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

describe('useStyles', () => {
  describe('className', () => {
    it('applies "className" from options', () => {
      const wrapper = shallow(<TestComponent />)

      expect(wrapper.find('div').prop('className')).toContain('ui-test')
    })

    it('applies "className" from props', () => {
      const wrapper = shallow(<TestComponent className="foo" />)

      expect(wrapper.find('div').prop('className')).toContain('foo')
    })
  })

  describe('styles', () => {
    it('passes "displayName" to styles functions', () => {
      const styles = jest.fn()
      mount(<TestComponent />, {
        // @ts-ignore typings are outdated
        wrappingComponent: TestProvider,
        wrappingComponentProps: { theme: createTheme(styles) },
      })

      expect(styles).toBeCalledWith(
        expect.objectContaining({
          displayName: 'Test',
        }),
      )
    })

    it('passes props mapped via "mapPropsToStyles" to styles functions', () => {
      const styles = jest.fn()
      mount(<TestComponent color="green" />, {
        // @ts-ignore typings are outdated
        wrappingComponent: TestProvider,
        wrappingComponentProps: { theme: createTheme(styles) },
      })

      expect(styles).toBeCalledWith(
        expect.objectContaining({
          displayName: 'Test',
          props: { color: 'green' },
        }),
      )
    })
  })
})
