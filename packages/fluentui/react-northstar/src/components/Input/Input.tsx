import { Accessibility, inputBehavior, InputBehaviorProps } from '@fluentui/accessibility';
import { handleRef, Ref } from '@fluentui/react-component-ref';
import * as customPropTypes from '@fluentui/react-proptypes';
import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as _ from 'lodash';

import {
  partitionHTMLProps,
  UIComponentProps,
  ChildrenComponentProps,
  commonPropTypes,
  createShorthandFactory,
  ShorthandFactory,
  createShorthand,
  getOrGenerateIdFromShorthand,
} from '../../utils';
import { SupportedIntrinsicInputProps } from '../../utils/htmlPropsUtils';
import { ShorthandValue, ComponentEventHandler } from '../../types';
import { Box, BoxProps } from '../Box/Box';
import {
  useAutoControlled,
  getElementType,
  useUnhandledProps,
  useTelemetry,
  useFluentContext,
  useStyles,
  useAccessibility,
  compose,
  ComponentWithAs,
} from '@fluentui/react-bindings';
import { ExclamationCircleIcon, CheckmarkCircleIcon, CloseIcon } from '@fluentui/react-icons-northstar';
import { InputLabel, InputLabelProps, LabelPosition } from './InputLabel';
import { FormFieldBaseContext } from '../Form/utils/formFieldBaseContext';

export interface InputProps extends UIComponentProps, ChildrenComponentProps, SupportedIntrinsicInputProps {
  /**
   * Accessibility behavior if overridden by the user.
   */
  accessibility?: Accessibility<InputBehaviorProps>;

  /** A property that will change the icon on the input and clear the input on click on Cancel. */
  clearable?: boolean;

  /** The default value of the input. */
  defaultValue?: string | string[];

  /** An Input can be disabled. */
  disabled?: boolean;

  /** An input can take the width of its container. */
  fluid?: boolean;

  /** Optional Icon to display inside the Input. */
  icon?: ShorthandValue<BoxProps>;

  /** An Input with icon can format the icon to appear at the start or at the end of the input field. */
  iconPosition?: 'start' | 'end';

  /** An input can be used inline with text. */
  inline?: boolean;

  /** Shorthand for the input component. */
  input?: ShorthandValue<BoxProps>;

  /** An input can have inverted colors. */
  inverted?: boolean;

  /**
   * Called on change.
   *
   * @param event - React's original SyntheticEvent.
   * @param data - All props and proposed value.
   */
  onChange?: ComponentEventHandler<InputProps & { value: string }>;

  /** The HTML input type. */
  type?: string;

  /** (DEPRECATED) Ref for input DOM node. */
  inputRef?: React.Ref<HTMLElement>;

  /** The value of the input. */
  value?: string | number;

  /** A label for the input. */
  label?: ShorthandValue<InputLabelProps>;

  /** Poisition for the label */
  labelPosition?: LabelPosition;

  /** Shorthand for the wrapper component. */
  wrapper?: ShorthandValue<BoxProps>;

  /** Input can be required to be valid. */
  required?: boolean;

  /** Input can have error state */
  error?: boolean;

  /** Input can have error indicator when error is true */
  errorIndicator?: ShorthandValue<BoxProps>;

  /** Optional Icon to display inside the Input if required and fulfilled. */
  successIndicator?: ShorthandValue<BoxProps>;

  /** Indicates whether the successIndicator should be visible. */
  showSuccessIndicator?: boolean;
}

export interface InputSlotClassNames {
  input: string;
  icon: string;
}

export const inputClassName = 'ui-input';

export type InputStylesProps = Required<
  Pick<
    InputProps,
    'fluid' | 'inverted' | 'inline' | 'disabled' | 'clearable' | 'iconPosition' | 'error' | 'labelPosition'
  > & {
    hasIcon: boolean;
    hasValue: boolean;
    requiredAndSuccessful: boolean;
  }
>;

export const inputSlotClassNames: InputSlotClassNames = {
  input: `${inputClassName}__input`,
  icon: `${inputClassName}__icon`,
};

/**
 * An Input is a field used to elicit an input from a user.
 *
 * @accessibility
 * For good screen reader experience set `aria-label` or `aria-labelledby` attribute for input.
 */
export const Input = compose<'input', InputProps, InputStylesProps, {}, {}>(
  (props, ref, composeOptions) => {
    const context = useFluentContext();
    const { setStart, setEnd } = useTelemetry(composeOptions.displayName, context.telemetry);
    setStart();
    const {
      className,
      input,
      type,
      wrapper,
      disabled,
      fluid,
      inverted,
      inline,
      clearable,
      icon,
      iconPosition,
      design,
      styles,
      variables,
      required,
      successIndicator,
      error,
      errorIndicator,
      showSuccessIndicator,
      label,
      labelPosition,
    } = props;

    const inputRef = React.useRef<HTMLInputElement>();

    const { labelId } = React.useContext(FormFieldBaseContext);
    const inputId = React.useRef<string>();
    inputId.current = props.id || getOrGenerateIdFromShorthand('ui-input-', '', inputId.current);

    const ElementType = getElementType(props);
    const unhandledProps = useUnhandledProps(composeOptions.handledProps, props);

    const [htmlInputProps, restProps] = partitionHTMLProps(unhandledProps);
    const [value, setValue] = useAutoControlled({
      defaultValue: props.defaultValue,
      value: props.value as string,
      initialValue: '',
    });
    const hasValue: boolean = !!value && (value as string)?.length !== 0;

    const isShowSuccessIndicatorUndefined = typeof showSuccessIndicator === 'undefined';

    const requiredAndSuccessful = isShowSuccessIndicatorUndefined
      ? ((required && hasValue) || showSuccessIndicator) && !error
      : showSuccessIndicator;

    const hasIcon = !!icon || showSuccessIndicator || (required && isShowSuccessIndicatorUndefined) || !_.isNil(error);

    const { classes, styles: resolvedStyles } = useStyles<InputStylesProps>(composeOptions.displayName, {
      className: inputClassName,
      mapPropsToStyles: () => ({
        fluid,
        inverted,
        inline,
        disabled,
        clearable,
        hasIcon,
        requiredAndSuccessful,
        iconPosition,
        hasValue,
        labelPosition,
        error,
      }),
      mapPropsToInlineStyles: () => ({
        className,
        design,
        styles,
        variables,
      }),
      rtl: context.rtl,
      composeOptions,
      unstable_props: props,
    });

    const getA11yProps = useAccessibility<InputBehaviorProps>(props.accessibility, {
      debugName: composeOptions.displayName,
      actionHandlers: {
        clear: e => {
          if (clearable && value !== '') {
            e.stopPropagation();
            e.nativeEvent && e.nativeEvent.stopPropagation();
            handleOnClear(e);
          }
        },
      },
      mapPropsToBehavior: () => ({
        disabled,
        required,
        error,
      }),
      rtl: context.rtl,
    });

    const handleIconOverrides = predefinedProps => ({
      onClick: (e: React.MouseEvent) => {
        if (!disabled) {
          handleOnClear(e);
          inputRef.current.focus();
        }

        _.invoke(predefinedProps, 'onClick', e, props);
      },
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) {
        return;
      }

      const newValue = _.get(e, 'target.value');

      _.invoke(props, 'onChange', e, { ...props, value: newValue });

      setValue(newValue);
    };

    const handleOnClear = (e: React.MouseEvent | React.KeyboardEvent) => {
      if (clearable) {
        _.invoke(props, 'onChange', e, { ...props, value: '' });
        setValue('');
      }
    };

    const computeIcon = (): ShorthandValue<BoxProps> => {
      if (clearable && (value as string)?.length !== 0) {
        return <CloseIcon outline />;
      }
      if (requiredAndSuccessful) {
        return successIndicator;
      }
      if (error) {
        return errorIndicator;
      }
      return icon || null;
    };

    const labelElement = createShorthand(composeOptions.slots.label, label, {
      defaultProps: () => ({
        labelPosition,
        label,
        required,
        htmlFor: inputId.current,
        hasValue,
        id: labelId,
      }),
    });

    const inputElement = Box.create(
      {},
      {
        defaultProps: () => ({
          children: (
            <>
              <Ref
                innerRef={(inputElement: HTMLElement) => {
                  handleRef(inputRef, inputElement);
                  handleRef(props.inputRef, inputElement);
                  handleRef(ref, inputElement);
                }}
              >
                {createShorthand(composeOptions.slots.control, input || type, {
                  defaultProps: () =>
                    getA11yProps('input', {
                      ...htmlInputProps,
                      as: 'input',
                      disabled,
                      type,
                      required,
                      value: value || '',
                      id: inputId.current,
                      className: inputSlotClassNames.input,
                      styles: resolvedStyles.input,
                      onChange: handleChange,
                    }),
                })}
              </Ref>
              {createShorthand(composeOptions.slots.icon, computeIcon(), {
                defaultProps: () =>
                  getA11yProps('icon', {
                    className: inputSlotClassNames.icon,
                    styles: resolvedStyles.icon,
                  }),
                overrideProps: handleIconOverrides,
              })}
            </>
          ),
          styles: resolvedStyles.inputContainer,
        }),
      },
    );

    const element = Box.create(wrapper, {
      defaultProps: () =>
        getA11yProps('root', {
          className: classes.root,
          children: (
            <>
              {labelElement}
              {inputElement}
            </>
          ),
          styles: resolvedStyles.root,
          ...restProps,
        }),
      overrideProps: {
        as: (wrapper && (wrapper as any).as) || ElementType,
      },
    });
    setEnd();
    return element;
  },
  {
    className: inputClassName,
    displayName: 'Input',
    slots: {
      control: Box,
      icon: Box,
      label: InputLabel,
    },
    handledProps: [
      'accessibility',
      'as',
      'children',
      'className',
      'design',
      'styles',
      'variables',
      'clearable',
      'defaultValue',
      'disabled',
      'fluid',
      'icon',
      'iconPosition',
      'input',
      'inputRef',
      'inline',
      'inverted',
      'onChange',
      'type',
      'value',
      'wrapper',
      'required',
      'successIndicator',
      'error',
      'errorIndicator',
      'showSuccessIndicator',
      'label',
      'labelPosition',
    ],
  },
) as ComponentWithAs<'input', InputProps> & {
  create: ShorthandFactory<InputProps>;
  Label: typeof InputLabel;
};

Input.propTypes = {
  ...commonPropTypes.createCommon({
    content: false,
  }),
  clearable: PropTypes.bool,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  disabled: PropTypes.bool,
  fluid: PropTypes.bool,
  label: customPropTypes.itemShorthand,
  labelPosition: PropTypes.oneOf<LabelPosition>(['inline', 'above', 'inside']),
  icon: customPropTypes.shorthandAllowingChildren,
  iconPosition: PropTypes.oneOf(['start', 'end']),
  input: customPropTypes.itemShorthand,
  inputRef: customPropTypes.ref,
  inline: PropTypes.bool,
  inverted: PropTypes.bool,
  onChange: PropTypes.func,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  wrapper: customPropTypes.wrapperShorthand,
  required: PropTypes.bool,
  successIndicator: customPropTypes.shorthandAllowingChildren,
  error: PropTypes.bool,
  errorIndicator: customPropTypes.shorthandAllowingChildren,
  showSuccessIndicator: PropTypes.bool,
};

Input.defaultProps = {
  accessibility: inputBehavior,
  type: 'text',
  wrapper: {},
  iconPosition: 'end',
  errorIndicator: <ExclamationCircleIcon />,
  successIndicator: <CheckmarkCircleIcon outline />,
};

Input.Label = InputLabel;

Input.create = createShorthandFactory({ Component: Input });
