import { Accessibility, sliderBehavior } from '@fluentui/accessibility'
import * as React from 'react'
import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as customPropTypes from '@fluentui/react-proptypes'
import { handleRef, Ref } from '@fluentui/react-component-ref'
import cx from 'classnames'

import {
  applyAccessibilityKeyHandlers,
  AutoControlledComponent,
  ChildrenComponentProps,
  commonPropTypes,
  partitionHTMLProps,
  UIComponentProps,
  RenderResultConfig,
  setWhatInputSource,
} from '../../utils'
import {
  ComponentEventHandler,
  ShorthandValue,
  WithAsProp,
  withSafeTypeForAs,
  Omit,
} from '../../types'
import { SupportedIntrinsicInputProps } from '../../utils/htmlPropsUtils'
import Box, { BoxProps } from '../Box/Box'

const processInputValues = (
  p: Pick<SliderProps, 'min' | 'max'> & Pick<SliderState, 'value'>,
): { min: number; max: number; value: number; valueAsPercentage: string } => {
  let min = _.toNumber(p.min)
  let max = _.toNumber(p.max)
  let value = _.toNumber(p.value)

  if (isNaN(min)) min = Number(Slider.defaultProps.min)
  if (isNaN(max)) max = Number(Slider.defaultProps.max)
  value = isNaN(value) ? min + (max - min) / 2 : Math.min(max, Math.max(min, value))
  const valueAsPercentage = `${(100 * (value - min)) / (max - min)}%`

  return { min, max, value, valueAsPercentage }
}

export interface SliderSlotClassNames {
  input: string
  inputWrapper: string
  rail: string
  thumb: string
  track: string
}

export interface SliderProps
  extends UIComponentProps,
    ChildrenComponentProps,
    Omit<SupportedIntrinsicInputProps, 'defaultValue'> {
  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility

  /** The default value of the slider. */
  defaultValue?: string | number

  /** A slider can be read-only and unable to change states. */
  disabled?: SupportedIntrinsicInputProps['disabled']

  /** A slider can take the width of its container. */
  fluid?: boolean

  /**
   * Callback that creates custom accessibility message a screen reader narrates when the value changes.
   * @param props - Slider props.
   */
  getA11yValueMessageOnChange?: (props: SliderProps) => string

  /** Shorthand for the input component. */
  input?: ShorthandValue<BoxProps>

  /** Ref for input DOM node. */
  inputRef?: React.Ref<HTMLElement>

  /** The maximum value of the slider. */
  max?: SupportedIntrinsicInputProps['max']

  /** The minimum value of the slider. */
  min?: SupportedIntrinsicInputProps['min']

  /**
   * Called after item checked state is changed.
   * @param event - React's original SyntheticEvent.
   * @param data - All props.
   */
  onChange?: ComponentEventHandler<SliderProps & { value: string }>

  /**
   * A number that specifies the granularity that the value must adhere to, or the special value 'any'.
   * A string value of any means that no stepping is implied, and any value is allowed
   * (barring other constraints, such as min and max).
   */
  step?: SupportedIntrinsicInputProps['step']

  /** The value of the slider. */
  value?: string | number

  /** A slider can be displayed vertically. */
  vertical?: boolean
}

export interface SliderState {
  value: SliderProps['value']
}

class Slider extends AutoControlledComponent<WithAsProp<SliderProps>, SliderState> {
  inputRef = React.createRef<HTMLElement>()

  static displayName = 'Slider'

  static className = 'ui-slider'

  static slotClassNames: SliderSlotClassNames

  static propTypes = {
    ...commonPropTypes.createCommon({ content: false }),
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    fluid: PropTypes.bool,
    getA11yValueMessageOnChange: PropTypes.func,
    input: customPropTypes.itemShorthand,
    inputRef: customPropTypes.ref,
    max: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    min: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func,
    step: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    vertical: PropTypes.bool,
  }

  static defaultProps: SliderProps = {
    accessibility: sliderBehavior,
    getA11yValueMessageOnChange: ({ value }) => String(value),
    max: 100,
    min: 0,
    step: 1,
  }

  static autoControlledProps = ['value']

  getInitialAutoControlledState(): Partial<SliderState> {
    return { value: 50 }
  }

  handleInputOverrides = () => ({
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = _.get(e, 'target.value')
      _.invoke(this.props, 'onChange', e, { ...this.props, value })
      this.setState({ value })
    },
    onMouseDown: (e: React.MouseEvent<HTMLInputElement>) => {
      setWhatInputSource('mouse')
      _.invoke(this.props, 'onMouseDown', e, this.props)
    },
  })

  renderComponent({
    ElementType,
    classes,
    accessibility,
    rtl,
    styles,
    unhandledProps,
  }: RenderResultConfig<SliderProps>) {
    const { input, inputRef, step } = this.props
    const [htmlInputProps, restProps] = partitionHTMLProps(unhandledProps)
    const type = 'range'

    const { min, max, value, valueAsPercentage } = processInputValues({
      min: this.props.min,
      max: this.props.max,
      value: this.state.value || '',
    })

    // we need 2 wrappers around the slider rail, track, input and thumb slots to achieve correct component sizes
    return (
      <ElementType className={classes.root} {...accessibility.attributes.root} {...restProps}>
        <div className={cx(Slider.slotClassNames.inputWrapper, classes.inputWrapper)}>
          <span className={cx(Slider.slotClassNames.rail, classes.rail)} />
          <span
            className={cx(Slider.slotClassNames.track, classes.track)}
            style={{ width: valueAsPercentage }}
          />
          <Ref
            innerRef={(inputElement: HTMLElement) => {
              handleRef(this.inputRef, inputElement)
              handleRef(inputRef, inputElement)
            }}
          >
            {Box.create(input || type, {
              defaultProps: () => ({
                ...htmlInputProps,
                ...accessibility.attributes.input,
                className: Slider.slotClassNames.input,
                as: 'input',
                min,
                max,
                step,
                type,
                value,
                styles: styles.input,
                ...applyAccessibilityKeyHandlers(accessibility.keyHandlers.input, htmlInputProps),
              }),
              overrideProps: this.handleInputOverrides,
            })}
          </Ref>
          {/* the thumb slot needs to appear after the input slot */}
          <span
            className={cx(Slider.slotClassNames.thumb, classes.thumb)}
            style={{ [rtl ? 'right' : 'left']: valueAsPercentage }}
          />
        </div>
      </ElementType>
    )
  }
}

Slider.slotClassNames = {
  input: `${Slider.className}__input`,
  inputWrapper: `${Slider.className}__input-wrapper`,
  rail: `${Slider.className}__rail`,
  thumb: `${Slider.className}__thumb`,
  track: `${Slider.className}__track`,
}

/**
 * A Slider represents an input that allows user to choose a value from within a specific range.
 *
 * @accessibility
 * Implements [ARIA Slider](https://www.w3.org/TR/wai-aria-practices-1.1/#slider) design pattern.
 * @accessibilityIssues
 * [Slider - JAWS narrates slider value twice when using PageUp / PageDown](https://github.com/FreedomScientific/VFO-standards-support/issues/220)
 * [Slider - JAWS narrates current and new value in vertical slider](https://github.com/FreedomScientific/VFO-standards-support/issues/219)
 */
export default withSafeTypeForAs<typeof Slider, SliderProps, 'input'>(Slider)
