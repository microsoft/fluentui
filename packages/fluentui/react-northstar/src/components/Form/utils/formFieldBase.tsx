import { Accessibility, FormFieldBehaviorProps, formFieldBehavior } from '@fluentui/accessibility';
import * as customPropTypes from '@fluentui/react-proptypes';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import { UIComponentProps, commonPropTypes, getOrGenerateIdFromShorthand, createShorthand } from '../../../utils';
import { ShorthandValue } from '../../../types';
import { Box, BoxProps } from '../../Box/Box';
import {
  getElementType,
  useUnhandledProps,
  useTelemetry,
  useAccessibility,
  useFluentContext,
  compose,
  useStyles,
} from '@fluentui/react-bindings';
import { FormLabel, FormLabelProps } from '../FormLabel';
import { FormMessage, FormMessageProps } from '../FormMessage';
import { FormFieldBaseValue, FormFieldBaseProvider } from './formFieldBaseContext';

export interface FormFieldBaseProps extends UIComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   */
  accessibility?: Accessibility<FormFieldBehaviorProps>;

  /** A field can have its label next to instead of above it. */
  inline?: boolean;

  /** A control for the form field. */
  control?: ShorthandValue<BoxProps>;

  /** A label for the form field. */
  label?: ShorthandValue<FormLabelProps>;

  /** Text message that will be displayed below the control (can be used for error, warning, success messages). */
  message?: ShorthandValue<FormMessageProps>;

  /** Message to be shown when input has error */
  errorMessage?: ShorthandValue<FormMessageProps>;
}

export const formFieldBaseClassName = 'ui-form__field__base';
export type FormFieldBaseStylesProps = never;

/**
 * A FormFiedBase represents a Form element containing a label and an input.
 */
export const _FormFieldBase = compose<'div', FormFieldBaseProps, {}, {}, {}>(
  (props, ref, composeOptions) => {
    const context = useFluentContext();
    const { setStart, setEnd } = useTelemetry(composeOptions.displayName, context.telemetry);
    setStart();

    const { message, inline, errorMessage, control, label, className, design, styles, variables } = props;

    const slotProps = composeOptions.resolveSlotProps<FormFieldBaseProps>(props);
    const ElementType = getElementType(props);
    const unhandledProps = useUnhandledProps(composeOptions.handledProps, props);
    const messageId = React.useRef<string>();
    messageId.current = getOrGenerateIdFromShorthand('error-message-', errorMessage || message, messageId.current);
    const labelId = React.useRef<string>();
    labelId.current = getOrGenerateIdFromShorthand('form-label-', label, labelId.current);

    const { classes } = useStyles<FormFieldBaseStylesProps>(_FormFieldBase.displayName, {
      className: composeOptions.className,
      composeOptions,
      mapPropsToInlineStyles: () => ({
        className,
        design,
        styles,
        variables,
      }),
      rtl: context.rtl,
      unstable_props: props,
    });

    const getA11yProps = useAccessibility<FormFieldBehaviorProps>(props.accessibility, {
      debugName: composeOptions.displayName,
      mapPropsToBehavior: () => ({
        hasErrorMessage: !!errorMessage,
        messageId: messageId.current,
        labelId: labelId.current,
      }),
      rtl: context.rtl,
    });

    const childProps: FormFieldBaseValue = React.useMemo(
      () => ({
        labelId: labelId.current,
      }),
      // TODO: create hooks for id to avoid disbaling esling for accessing the value of refs
      // eslint-disable-next-line
      [labelId.current],
    );

    const element = (
      <ElementType
        {...getA11yProps('root', {
          className: classes.root,
        })}
      >
        {createShorthand(composeOptions.slots.label, label, {
          defaultProps: () =>
            getA11yProps('label', {
              id: labelId.current,
              inline,
              ...slotProps.label,
            }),
        })}
        {/**
         * When there's a message for the input the labelId and messageId should be consistent in the
         * aria-labelledby attribute (aria-labelledby="labelID messageID") therefore we need to pass it down
         * for components like input that are generating its own label internally
         */}
        <FormFieldBaseProvider value={childProps}>
          {createShorthand(composeOptions.slots.control, control || {}, {
            defaultProps: () =>
              getA11yProps('control', {
                error: !!errorMessage || null,
                ref,
                ...unhandledProps,
                ...slotProps.control,
              }),
          })}
        </FormFieldBaseProvider>
        {createShorthand(composeOptions.slots.message, errorMessage || message, {
          defaultProps: () =>
            getA11yProps('message', {
              id: messageId.current,
              ...slotProps.message,
            }),
        })}
      </ElementType>
    );
    setEnd();
    return element;
  },
  {
    className: formFieldBaseClassName,
    displayName: 'FormFieldBase',
    slots: {
      label: FormLabel,
      message: FormMessage,
      control: Box,
    },
    handledProps: [
      'as',
      'accessibility',
      'className',
      'variables',
      'design',
      'styles',
      'inline',
      'errorMessage',
      'message',
    ],
    shorthandConfig: {
      mappedProp: 'control',
    },
  },
);

_FormFieldBase.propTypes = {
  ...commonPropTypes.createCommon({ children: false }),
  inline: PropTypes.bool,
  message: customPropTypes.itemShorthand,
  errorMessage: customPropTypes.itemShorthand,
};

_FormFieldBase.defaultProps = {
  accessibility: formFieldBehavior,
};
