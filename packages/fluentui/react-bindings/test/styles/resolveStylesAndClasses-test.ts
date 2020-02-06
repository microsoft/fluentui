import {
  ComponentSlotStylesPrepared,
  ComponentStyleFunctionParam,
  emptyTheme,
  ICSSInJSStyle,
} from '@fluentui/styles'
import resolveStylesAndClasses from '../../src/styles/resolveStylesAndClasses'

const styleParam: ComponentStyleFunctionParam = {
  disableAnimations: false,
  displayName: 'Test',
  props: {},
  rtl: false,
  theme: emptyTheme,
  variables: {
    color: 'red',
  },
}

const componentStyles: ComponentSlotStylesPrepared<{}, { color: string }> = {
  root: ({ variables: v }): ICSSInJSStyle => ({
    color: v.color,
  }),
}

describe('resolveStylesAndClasses', () => {
  test('resolves styles', () => {
    const { resolvedStyles } = resolveStylesAndClasses(componentStyles, styleParam, () => '')

    expect(resolvedStyles.root).toMatchObject({ color: 'red' })
  })

  test('caches resolved styles', () => {
    spyOn(componentStyles, 'root').and.callThrough()
    const { resolvedStyles } = resolveStylesAndClasses(componentStyles, styleParam, () => '')

    expect(resolvedStyles.root).toMatchObject({ color: 'red' })
    expect(componentStyles.root).toHaveBeenCalledTimes(1)
    expect(resolvedStyles.root).toMatchObject({ color: 'red' })
    expect(componentStyles.root).toHaveBeenCalledTimes(1)
  })

  test('does not render classes if not fetched', () => {
    const renderStyles = jest.fn()
    const { resolvedStyles } = resolveStylesAndClasses(componentStyles, styleParam, renderStyles)

    expect(resolvedStyles.root).toMatchObject({ color: 'red' })
    expect(renderStyles).not.toBeCalled()
  })

  test('renders classes when slot classes getter is accessed', () => {
    const renderStyles = jest.fn().mockReturnValue('a')
    const { classes } = resolveStylesAndClasses(componentStyles, styleParam, renderStyles)

    expect(classes.root).toBeDefined()
    expect(renderStyles).toHaveBeenCalledWith({ color: 'red' })
  })

  test('caches rendered classes', () => {
    const renderStyles = jest.fn().mockReturnValue('a')
    const { classes } = resolveStylesAndClasses(componentStyles, styleParam, renderStyles)

    expect(classes.root).toBeDefined()
    expect(renderStyles).toHaveBeenCalledWith({ color: 'red' })
    expect(classes.root).toBeDefined()
    expect(renderStyles).toHaveBeenCalledTimes(1)
  })
})
