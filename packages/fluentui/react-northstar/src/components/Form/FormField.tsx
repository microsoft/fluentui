import { Accessibility, FormFieldBehaviorProps, formFieldBehavior } from '@fluentui/accessibility';
import * as customPropTypes from '@fluentui/react-proptypes';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import {
  childrenExist,
  createShorthandFactory,
  UIComponentProps,
  ChildrenComponentProps,
  commonPropTypes,
  getOrGenerateIdFromShorthand,
  ShorthandFactory,
  createShorthand,
} from '../../utils';
import { ShorthandValue, withSafeTypeForAs, ProviderContextPrepared } from '../../types';
import { TextProps } from '../Text/Text';
import Input from '../Input/Input';
import Box, { BoxProps } from '../Box/Box';
import {
  getElementType,
  useUnhandledProps,
  useTelemetry,
  useStyles,
  useAccessibility,
  compose,
  ComponentWithAs,
  ShorthandConfig,
} from '@fluentui/react-bindings';
// @ts-ignore
import { ThemeContext } from 'react-fela';
import FormLabel from './FormLabel';
import FormMessage from './FormMessage';

export interface FormFieldProps extends UIComponentProps, ChildrenComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   */
  accessibility?: Accessibility<FormFieldBehaviorProps>;

  /** A control for the form field. */
  control?: ShorthandValue<BoxProps>;

  /** The HTML input id. This will be set on the control element and will be use for linking it with the label for correct accessibility. */
  id?: string;

  /** A field can have its label next to instead of above it. */
  inline?: boolean;

  /** A label for the form field. */
  label?: ShorthandValue<TextProps>;

  /** Text message that will be displayed below the control (can be used for error, warning, success messages). */
  message?: ShorthandValue<TextProps>;

  /** The HTML input name. */
  name?: string;

  /** A field can show that input is mandatory. */
  required?: boolean;

  /** The HTML input type. */
  type?: string;

  /** Message to be shown when input has error */
  errorMessage?: ShorthandValue<TextProps>;

  /** Indicator to be shown together with error message */
  errorIndicator?: ShorthandValue<BoxProps>;

  /** Indicator to be shown when field is required and non-empty */
  successIndicator?: ShorthandValue<BoxProps>;
}

export const formFieldClassName = 'ui-form__field';
export const formFieldMessageClassName = 'ui-form__field__message';

export type FormFieldStylesProps = Required<Pick<FormFieldProps, 'type' | 'inline' | 'required'>> & {
  hasErrorMessage: boolean;
};

const FormField = compose<'div', FormFieldProps, FormFieldStylesProps, {}, {}>(
  (props, ref, composeOptions) => {
    const context: ProviderContextPrepared = React.useContext(ThemeContext);
    const { setStart, setEnd } = useTelemetry(FormField.displayName, context.telemetry);
    setStart();

    const {
      children,
      control,
      id,
      label,
      message,
      name,
      required,
      type,
      className,
      design,
      styles,
      variables,
      inline,
      errorMessage,
    } = props;

    const slotProps = composeOptions.resolveSlotProps<FormFieldProps>(props);
    const ElementType = getElementType(props);
    const unhandledProps = useUnhandledProps(composeOptions.handledProps, props);
    const messageId = React.useRef<string>();
    messageId.current = getOrGenerateIdFromShorthand('error-message-', message || errorMessage, messageId.current);
    const labelId = React.useRef<string>();
    labelId.current = getOrGenerateIdFromShorthand('form-label-', id, labelId.current);

    const getA11yProps = useAccessibility<FormFieldBehaviorProps>(props.accessibility, {
      debugName: composeOptions.displayName,
      mapPropsToBehavior: () => ({
        hasErrorMessage: !!errorMessage,
        messageId: messageId.current,
        labelId: labelId.current,
      }),
      rtl: context.rtl,
    });

    const { classes, styles: resolvedStyles } = useStyles<FormFieldStylesProps>(FormField.displayName, {
      className: composeOptions.className,
      composeOptions,
      mapPropsToStyles: () => ({
        type,
        inline,
        required,
        hasErrorMessage: !!errorMessage,
      }),
      mapPropsToInlineStyles: () => ({
        className,
        design,
        styles,
        variables,
      }),
      rtl: context.rtl,
    });

    const labelElement = createShorthand(composeOptions.slots.label, label, {
      defaultProps: () =>
        getA11yProps('label', {
          as: 'label',
          htmlFor: id,
          id: labelId.current,
          styles: resolvedStyles.label,
          required,
          inline,
          type,
          ...slotProps.label,
        }),
    });

    const messageElement = createShorthand(composeOptions.slots.message, errorMessage || message, {
      defaultProps: () =>
        getA11yProps('message', {
          className: formFieldMessageClassName,
          id: messageId.current,
          styles: resolvedStyles.message,
          ...slotProps.message,
        }),
    });

    const controlElement = createShorthand(composeOptions.slots.control, control || {}, {
      defaultProps: () =>
        getA11yProps('control', {
          required,
          name,
          type,
          error: !!errorMessage || null,
          styles: resolvedStyles.control,
          ...slotProps.control,
        }),
    });

    const shouldControlAppearFirst = () => {
      return type && (type === 'checkbox' || type === 'radio');
    };

    const content = (
      <>
        {shouldControlAppearFirst() && controlElement}
        {labelElement}
        {!shouldControlAppearFirst() && controlElement}
        {messageElement}
      </>
    );

    const element = (
      <ElementType
        {...getA11yProps('root', {
          className: classes.root,
          ref,
          ...unhandledProps,
        })}
      >
        {childrenExist(children) ? children : content}
      </ElementType>
    );
    setEnd();
    return element;
  },
  {
    className: formFieldClassName,
    displayName: 'FormField',
    slots: {
      label: FormLabel,
      message: FormMessage,
      control: Box,
    },
    handledProps: [
      'accessibility',
      'control',
      'inline',
      'as',
      'children',
      'className',
      'control',
      'design',
      'design',
      'errorIndicator',
      'errorMessage',
      'id',
      'label',
      'message',
      'name',
      'variables',
      'type',
      'successIndicator',
      'styles',
      'required',
    ],
    shorthandConfig: {
      mappedProp: 'label',
    },
  },
) as ComponentWithAs<'div', FormFieldProps> & {
  create: ShorthandFactory<FormFieldProps>;
  shorthandConfig: ShorthandConfig<FormFieldProps>;
};

FormField.propTypes = {
  ...commonPropTypes.createCommon({
    content: false,
  }),
  control: customPropTypes.shorthandAllowingChildren,
  id: PropTypes.string,
  inline: PropTypes.bool,
  label: customPropTypes.itemShorthand,
  message: customPropTypes.itemShorthand,
  name: PropTypes.string,
  required: PropTypes.bool,
  type: PropTypes.string,
  errorMessage: customPropTypes.shorthandAllowingChildren,
};

FormField.defaultProps = {
  accessibility: formFieldBehavior,
  as: 'div',
  control: { as: Input },
};

FormField.create = createShorthandFactory({ Component: FormField, mappedProp: 'label' });

/**
 * A FormField represents a Form element containing a label and an input.
 */
export default withSafeTypeForAs<typeof FormField, FormFieldProps>(FormField);
