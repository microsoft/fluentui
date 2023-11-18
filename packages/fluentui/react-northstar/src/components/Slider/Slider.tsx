import { Accessibility, sliderBehavior, SliderBehaviorProps } from '@fluentui/accessibility';
import {
  getElementType,
  useUnhandledProps,
  useAccessibility,
  useStateManager,
  useFluentContext,
  useStyles,
  useTelemetry,
  ForwardRefWithAs,
} from '@fluentui/react-bindings';
import { handleRef, Ref } from '@fluentui/react-component-ref';
import * as customPropTypes from '@fluentui/react-proptypes';
import { createSliderManager } from '@fluentui/state';
import cx from 'classnames';
import * as _ from 'lodash';
import * as PropTypes from 'prop-types';
import * as React from 'react';

import {
  ChildrenComponentProps,
  commonPropTypes,
  partitionHTMLProps,
  UIComponentProps,
  setWhatInputSource,
  createShorthandFactory,
} from '../../utils';
import { ComponentEventHandler, ShorthandValue, FluentComponentStaticProps } from '../../types';
import { SupportedIntrinsicInputProps } from '../../utils/htmlPropsUtils';
import { Box, BoxProps } from '../Box/Box';

const processInputValues = (
  p: Pick<SliderProps, 'min' | 'max'> & { value: string },
): { min: number; max: number; value: number; valueAsPercentage: string } => {
  let min = _.toNumber(p.min);
  let max = _.toNumber(p.max);
  let value = _.toNumber(p.value);

  if (isNaN(min)) min = Number(Slider.defaultProps.min);
  if (isNaN(max)) max = Number(Slider.defaultProps.max);
  value = isNaN(value) ? min + (max - min) / 2 : Math.min(max, Math.max(min, value));
  const valueAsPercentage = `${(100 * (value - min)) / (max - min)}%`;

  return { min, max, value, valueAsPercentage };
};

export interface SliderSlotClassNames {
  input: string;
  inputWrapper: string;
  rail: string;
  thumb: string;
  track: string;
}

export interface SliderProps
  extends UIComponentProps,
    ChildrenComponentProps,
    Omit<SupportedIntrinsicInputProps, 'defaultValue'> {
  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility<SliderBehaviorProps>;

  /** The default value of the slider. */
  defaultValue?: string | number;

  /** A slider can be read-only and unable to change states. */
  disabled?: SupportedIntrinsicInputProps['disabled'];

  /** A slider can take the width of its container. */
  fluid?: boolean;

  /**
   * Callback that creates custom accessibility message a screen reader narrates when the value changes.
   * @param props - Slider props.
   */
  getA11yValueMessageOnChange?: (props: SliderProps) => string;

  /** Shorthand for the input component. */
  input?: ShorthandValue<BoxProps>;

  /** Ref for input DOM node. */
  inputRef?: React.Ref<HTMLElement>;

  /** The maximum value of the slider. */
  max?: SupportedIntrinsicInputProps['max'];

  /** The minimum value of the slider. */
  min?: SupportedIntrinsicInputProps['min'];

  /**
   * Called after item checked state is changed.
   * @param event - React's original SyntheticEvent.
   * @param data - All props.
   */
  onChange?: ComponentEventHandler<SliderProps & { value: string }>;

  /**
   * A number that specifies the granularity that the value must adhere to, or the special value 'any'.
   * A string value of any means that no stepping is implied, and any value is allowed
   * (barring other constraints, such as min and max).
   */
  step?: SupportedIntrinsicInputProps['step'];

  /** The value of the slider. */
  value?: string | number;

  /** A slider can be displayed vertically. */
  vertical?: boolean;
}

export type SliderStylesProps = Pick<SliderProps, 'fluid' | 'disabled' | 'vertical'>;
export const sliderClassName = 'ui-slider';
export const sliderSlotClassNames: SliderSlotClassNames = {
  input: `${sliderClassName}__input`,
  inputWrapper: `${sliderClassName}__input-wrapper`,
  rail: `${sliderClassName}__rail`,
  thumb: `${sliderClassName}__thumb`,
  track: `${sliderClassName}__track`,
};

/**
 * A Slider represents an input that allows user to choose a value from within a specific range.
 *
 * @accessibility
 * Implements [ARIA Slider](https://www.w3.org/TR/wai-aria-practices-1.1/#slider) design pattern.
 * @accessibilityIssues
 * [Slider - JAWS narrates slider value twice when using PageUp / PageDown](https://github.com/FreedomScientific/VFO-standards-support/issues/220)
 * [Slider - JAWS narrates current and new value in vertical slider](https://github.com/FreedomScientific/VFO-standards-support/issues/219)
 */
export const Slider = React.forwardRef<HTMLInputElement, SliderProps>((props, ref) => {
  const context = useFluentContext();
  const { setStart, setEnd } = useTelemetry(Slider.displayName, context.telemetry);
  setStart();

  const {
    accessibility,
    min,
    max,
    value,
    getA11yValueMessageOnChange,
    defaultValue,
    input,
    inputRef: userInputRef,
    step,
    className,
    styles,
    variables,
    design,
    fluid,
    vertical,
    disabled,
  } = props;
  const inputRef = React.useRef<HTMLElement>();

  const { state, actions } = useStateManager(createSliderManager, {
    mapPropsToInitialState: () => ({
      value: defaultValue as string,
    }),
    mapPropsToState: () => ({
      value: value as string,
    }),
  });
  const {
    min: numericMin,
    max: numericMax,
    value: numericValue,
    valueAsPercentage,
  } = processInputValues({
    min,
    max,
    value: state.value || '',
  });

  const getA11Props = useAccessibility(accessibility, {
    debugName: Slider.displayName,
    rtl: context.rtl,
    mapPropsToBehavior: () => ({
      disabled,
      getA11yValueMessageOnChange,
      max: numericMax,
      min: numericMax,
      value: numericValue,
      vertical,
    }),
  });
  const { classes, styles: resolvedStyles } = useStyles<SliderStylesProps>(Slider.displayName, {
    className: sliderClassName,
    mapPropsToStyles: () => ({
      fluid,
      vertical,
      disabled,
    }),
    mapPropsToInlineStyles: () => ({
      className,
      styles,
      variables,
      design,
    }),
    rtl: context.rtl,
  });

  const handleInputOverrides = () => ({
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = _.get(e, 'target.value');
      _.invoke(props, 'onChange', e, { ...props, value });
      actions.change(value);
    },
    onMouseDown: (e: React.MouseEvent<HTMLInputElement>) => {
      setWhatInputSource(context.target, 'mouse');
      _.invoke(props, 'onMouseDown', e, props);
    },
  });

  const ElementType = getElementType(props);
  const unhandledProps = useUnhandledProps(Slider.handledProps, props);
  const [htmlInputProps, restProps] = partitionHTMLProps(unhandledProps);
  const type = 'range';

  // we need 2 wrappers around the slider rail, track, input and thumb slots to achieve correct component sizes

  const inputElement = Box.create(input || type, {
    defaultProps: () =>
      getA11Props('input', {
        ...htmlInputProps,
        as: 'input',
        className: sliderSlotClassNames.input,
        min: numericMin,
        max: numericMax,
        step,
        styles: resolvedStyles.input,
        type,
        value: numericValue,
      }),
    overrideProps: handleInputOverrides,
  });

  const element = (
    <ElementType {...getA11Props('root', { className: classes.root, ref, ...restProps })}>
      <div
        {...getA11Props('inputWrapper', {
          className: cx(sliderSlotClassNames.inputWrapper, classes.inputWrapper),
        })}
      >
        <span {...getA11Props('rail', { className: cx(sliderSlotClassNames.rail, classes.rail) })} />
        <span
          {...getA11Props('track', { className: cx(sliderSlotClassNames.track, classes.track) })}
          style={{ width: valueAsPercentage }}
        />
        <Ref
          innerRef={(inputElement: HTMLElement) => {
            handleRef(inputRef, inputElement);
            handleRef(userInputRef, inputElement);
          }}
        >
          {inputElement}
        </Ref>
        {/* the thumb slot needs to appear after the input slot */}
        <span
          {...getA11Props('thumb', { className: cx(sliderSlotClassNames.thumb, classes.thumb) })}
          style={{ [context.rtl ? 'right' : 'left']: valueAsPercentage }}
        />
      </div>
    </ElementType>
  );
  setEnd();

  return element;
}) as unknown as ForwardRefWithAs<'input', HTMLInputElement, SliderProps> & FluentComponentStaticProps;

Slider.displayName = 'Slider';

Slider.defaultProps = {
  accessibility: sliderBehavior,
  getA11yValueMessageOnChange: ({ value }) => String(value),
  max: 100,
  min: 0,
  step: 1,
};
Slider.propTypes = {
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
};
Slider.handledProps = Object.keys(Slider.propTypes) as any;

Slider.create = createShorthandFactory({ Component: Slider, mappedProp: 'value' });
