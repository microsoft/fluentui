import * as React from 'react'
import { ReactWrapper } from 'enzyme'
import { mountWithProvider } from 'test/utils'
import { Props, PropsOf, InstanceOf } from 'src/types'

export type ShorthandTestOptions<TProps = any> = {
  mapsValueToProp: keyof (TProps & React.HTMLProps<HTMLElement>) | false
  requiredProps?: Props
  requiredShorthandProps?: Props
}

export const DefaultShorthandTestOptions: ShorthandTestOptions = {
  mapsValueToProp: 'content',
}

export type ShorthandPropTestsRunner<TComponent> = <
  TShorthandComponent extends React.ComponentType
>(
  shorthandProp: keyof PropsOf<InstanceOf<TComponent>>,
  ShorthandComponent: TShorthandComponent,
  options?: ShorthandTestOptions<PropsOf<TShorthandComponent>>,
) => any

export type ShorthandPropTestsFactory = <TComponent extends React.ComponentType>(
  Component: TComponent,
) => ShorthandPropTestsRunner<TComponent>

export default ((Component: React.ComponentType) => {
  return function implementsShorthandProp(
    shorthandProp: string,
    ShorthandComponent: React.ComponentType,
    options: ShorthandTestOptions = DefaultShorthandTestOptions,
  ) {
    const mapsValueToProp = options.mapsValueToProp as string
    const { displayName } = ShorthandComponent

    const checkPropsMatch = (props: Props, matchedProps: Props) =>
      Object.keys(matchedProps).every(propName => matchedProps[propName] === props[propName])

    const expectContainsSingleShorthandElement = (wrapper: ReactWrapper, withProps: Props) =>
      expect(
        wrapper
          .find(ShorthandComponent)
          .filterWhere(node => checkPropsMatch(node.props(), withProps)).length,
      ).toEqual(1)

    const expectShorthandPropsAreHandled = (withProps: Props | string) => {
      const props = { ...options.requiredProps, [shorthandProp]: withProps }
      const matchedProps =
        typeof withProps === 'string' ? { [mapsValueToProp]: withProps } : withProps

      expectContainsSingleShorthandElement(
        mountWithProvider(<Component {...props} />),
        matchedProps,
      )
    }

    describe(`shorthand property '${shorthandProp}' with default value of '${displayName}' component`, () => {
      test(`is defined`, () => {
        expect(Component.propTypes[shorthandProp]).toBeTruthy()
      })

      if (options.mapsValueToProp) {
        test(`string value is handled as ${displayName}'s ${mapsValueToProp}`, () => {
          expectShorthandPropsAreHandled('shorthand prop value')
        })
      }

      test(`object value is spread as ${displayName}'s props`, () => {
        expectShorthandPropsAreHandled({
          ...options.requiredShorthandProps,
          foo: 'foo value',
          bar: 'bar value',
        })
      })
    })
  }
}) as ShorthandPropTestsFactory
