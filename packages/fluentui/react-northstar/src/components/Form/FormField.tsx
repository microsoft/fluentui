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
} from '../../utils';
import { ShorthandValue, FluentComponentStaticProps } from '../../types';
import { Text, TextProps } from '../Text/Text';
import { Input } from '../Input/Input';
import { Box, BoxProps } from '../Box/Box';
import {
  getElementType,
  useUnhandledProps,
  useFluentContext,
  useTelemetry,
  useStyles,
  useAccessibility,
  ForwardRefWithAs,
} from '@fluentui/react-bindings';

export interface FormFieldProps extends UIComponentProps, ChildrenComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   */
  accessibility?: Accessibility<FormFieldBehaviorProps>;

  /**
   * @deprecated
   * A control for the form field.
   */
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
}

export const formFieldClassName = 'ui-form__field';
export const formFieldMessageClassName = 'ui-form__field__message';

export type FormFieldStylesProps = Required<Pick<FormFieldProps, 'type' | 'inline' | 'required'>> & {
  hasErrorMessage: boolean;
};

/**
 * A FormField represents a Form element containing a label and an input.
 */
export const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>((props, ref) => {
  const context = useFluentContext();
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

  const ElementType = getElementType(props);
  const unhandledProps = useUnhandledProps(FormField.handledProps, props);
  const messageId = React.useRef<string>();
  messageId.current = getOrGenerateIdFromShorthand('error-message-', message || errorMessage, messageId.current);
  const labelId = React.useRef<string>();
  labelId.current = getOrGenerateIdFromShorthand('form-label-', id, labelId.current);

  const getA11yProps = useAccessibility<FormFieldBehaviorProps>(props.accessibility, {
    debugName: FormField.displayName,
    mapPropsToBehavior: () => ({
      hasErrorMessage: !!errorMessage,
      messageId: messageId.current,
      labelId: labelId.current,
    }),
    rtl: context.rtl,
  });

  const { classes, styles: resolvedStyles } = useStyles<FormFieldStylesProps>(FormField.displayName, {
    className: formFieldClassName,
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

  const labelElement = Text.create(label, {
    defaultProps: () =>
      getA11yProps('label', {
        as: 'label',
        htmlFor: id,
        id: labelId.current,
        styles: resolvedStyles.label,
      }),
  });

  const messageElement = Text.create(errorMessage || message, {
    defaultProps: () =>
      getA11yProps('message', {
        className: formFieldMessageClassName,
        id: messageId.current,
        styles: resolvedStyles.message,
      }),
  });

  const controlElement = Box.create(control || {}, {
    defaultProps: () =>
      getA11yProps('control', {
        required,
        name,
        id,
        type,
        error: !!errorMessage || null,
        styles: resolvedStyles.control,
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
}) as unknown as ForwardRefWithAs<'div', HTMLDivElement, FormFieldProps> & FluentComponentStaticProps<FormFieldProps>;

FormField.displayName = 'FormField';

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

FormField.handledProps = Object.keys(FormField.propTypes) as any;

FormField.defaultProps = {
  accessibility: formFieldBehavior,
  control: { as: Input },
};

FormField.create = createShorthandFactory({ Component: FormField, mappedProp: 'label' });
