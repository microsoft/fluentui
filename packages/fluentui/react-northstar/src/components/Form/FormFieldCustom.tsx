import { Accessibility, FormFieldBehaviorProps, formFieldBehavior } from '@fluentui/accessibility';
import * as customPropTypes from '@fluentui/react-proptypes';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import {
  childrenExist,
  UIComponentProps,
  ChildrenComponentProps,
  commonPropTypes,
  getOrGenerateIdFromShorthand,
  createShorthand,
} from '../../utils';
import { ShorthandValue, ProviderContextPrepared } from '../../types';
import Box, { BoxProps } from '../Box/Box';
import {
  getElementType,
  useUnhandledProps,
  useTelemetry,
  useStyles,
  useAccessibility,
  compose,
} from '@fluentui/react-bindings';
import FormLabel, { FormLabelProps } from './FormLabel';
import FormMessage, { FormMessageProps } from './FormMessage';
// @ts-ignore
import { ThemeContext } from 'react-fela';

export interface FormFieldCustomProps extends UIComponentProps, ChildrenComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   */
  accessibility?: Accessibility<FormFieldBehaviorProps>;

  /** A field can have its label next to instead of above it. */
  inline?: boolean;

  /** A control for the form field. */
  control?: ShorthandValue<BoxProps>;

  /** The HTML input id. This will be set on the control element and will be use for linking it with the label for correct accessibility. */
  id?: string;

  /** A label for the form field. */
  label?: ShorthandValue<FormLabelProps>;

  /** Text message that will be displayed below the control (can be used for error, warning, success messages). */
  message?: ShorthandValue<FormMessageProps>;

  /** Message to be shown when input has error */
  errorMessage?: ShorthandValue<FormMessageProps>;
}

export const formFieldClassName = 'ui-form__field__custom';

export type FormFieldCustomStylesProps = Required<Pick<FormFieldCustomProps, 'inline'>> & {
  hasErrorMessage: boolean;
};

const FormFieldCustom = compose<'div', FormFieldCustomProps, FormFieldCustomStylesProps, {}, {}>(
  (props, ref, composeOptions) => {
    const context: ProviderContextPrepared = React.useContext(ThemeContext);
    const { setStart, setEnd } = useTelemetry(composeOptions.displayName, context.telemetry);
    setStart();

    const { children, message, className, design, styles, variables, inline, errorMessage, id, control, label } = props;

    const slotProps = composeOptions.resolveSlotProps<FormFieldCustomProps>(props);
    const ElementType = getElementType(props);
    const unhandledProps = useUnhandledProps(composeOptions.handledProps, props);
    const messageId = React.useRef<string>();
    messageId.current = getOrGenerateIdFromShorthand('error-message-', errorMessage || message, messageId.current);
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

    const { classes, styles: resolvedStyles } = useStyles<FormFieldCustomStylesProps>(FormFieldCustom.displayName, {
      className: composeOptions.className,
      composeOptions,
      mapPropsToStyles: () => ({
        inline,
        hasErrorMessage: !!errorMessage,
      }),
      mapPropsToInlineStyles: () => ({
        className,
        design,
        styles,
        variables,
      }),
      rtl: context.rtl,
      unstable_props: props,
    });

    const labelElement = createShorthand(composeOptions.slots.label, label, {
      defaultProps: () =>
        getA11yProps('label', {
          htmlFor: id,
          id: labelId.current,
          inline,
          ...slotProps.label,
        }),
    });

    const messageElement = createShorthand(composeOptions.slots.message, errorMessage || message, {
      defaultProps: () =>
        getA11yProps('message', {
          id: messageId.current,
          ...slotProps.message,
        }),
    });

    const controlElement = createShorthand(composeOptions.slots.control, control || {}, {
      defaultProps: () =>
        getA11yProps('control', {
          error: !!errorMessage || null,
          styles: resolvedStyles.control,
          ...unhandledProps,
          ...slotProps.control,
        }),
    });

    const content = (
      <>
        {labelElement}
        {controlElement}
        {messageElement}
      </>
    );

    const element = (
      <ElementType
        {...getA11yProps('root', {
          className: classes.root,
          ref,
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
    displayName: 'FormFieldCustom',
    overrideStyles: true,
    slots: {
      label: FormLabel,
      message: FormMessage,
      control: Box,
    },
    handledProps: [
      'accessibility',
      'inline',
      'as',
      'children',
      'className',
      'control',
      'design',
      'design',
      'errorMessage',
      'message',
      'variables',
      'styles',
    ],
    shorthandConfig: {
      mappedProp: 'control',
    },
  },
);

FormFieldCustom.propTypes = {
  ...commonPropTypes.createCommon({
    content: false,
  }),
  control: customPropTypes.shorthandAllowingChildren,
  id: PropTypes.string,
  inline: PropTypes.bool,
  message: customPropTypes.itemShorthand,
  errorMessage: customPropTypes.shorthandAllowingChildren,
};

FormFieldCustom.defaultProps = {
  accessibility: formFieldBehavior,
};

/**
 * A FormFieldCustom represents a Form element containing a label and an input.
 */
export default FormFieldCustom;
