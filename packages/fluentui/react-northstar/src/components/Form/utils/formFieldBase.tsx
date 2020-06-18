import { Accessibility, FormFieldBehaviorProps, formFieldBehavior } from '@fluentui/accessibility';
import * as customPropTypes from '@fluentui/react-proptypes';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import {
  UIComponentProps,
  ChildrenComponentProps,
  commonPropTypes,
  getOrGenerateIdFromShorthand,
  createShorthand,
} from '../../../utils';
import { ShorthandValue, ProviderContextPrepared } from '../../../types';
import Box, { BoxProps } from '../../Box/Box';
import { getElementType, useUnhandledProps, useTelemetry, useAccessibility, compose } from '@fluentui/react-bindings';
import FormLabel, { FormLabelProps } from '../FormLabel';
import FormMessage, { FormMessageProps } from '../FormMessage';
// @ts-ignore
import { ThemeContext } from 'react-fela';

export interface FormFieldBaseProps extends UIComponentProps, ChildrenComponentProps {
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

export const formFieldClassName = 'ui-form__field__base';

const _FormFieldBase = compose<'div', FormFieldBaseProps, {}, {}, {}>(
  (props, ref, composeOptions) => {
    const context: ProviderContextPrepared = React.useContext(ThemeContext);
    const { setStart, setEnd } = useTelemetry(composeOptions.displayName, context.telemetry);
    setStart();

    const { message, inline, errorMessage, id, control, label } = props;

    const slotProps = composeOptions.resolveSlotProps<FormFieldBaseProps>(props);
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

    const element = (
      <ElementType
        {...getA11yProps('root', {
          className: formFieldClassName,
          ref,
        })}
      >
        {
          <>
            {createShorthand(composeOptions.slots.label, label, {
              defaultProps: () =>
                getA11yProps('label', {
                  htmlFor: id,
                  id: labelId.current,
                  inline,
                  ...slotProps.label,
                }),
            })}
            {createShorthand(composeOptions.slots.message, errorMessage || message, {
              defaultProps: () =>
                getA11yProps('message', {
                  id: messageId.current,
                  ...slotProps.message,
                }),
            })}
            {createShorthand(composeOptions.slots.control, control || {}, {
              defaultProps: () =>
                getA11yProps('control', {
                  error: !!errorMessage || null,
                  ...unhandledProps,
                  ...slotProps.control,
                }),
            })}
          </>
        }
      </ElementType>
    );
    setEnd();
    return element;
  },
  {
    className: formFieldClassName,
    displayName: 'FormFieldBase',
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

_FormFieldBase.propTypes = {
  ...commonPropTypes.createCommon({
    content: false,
  }),
  control: customPropTypes.shorthandAllowingChildren,
  id: PropTypes.string,
  inline: PropTypes.bool,
  message: customPropTypes.itemShorthand,
  errorMessage: customPropTypes.shorthandAllowingChildren,
};

_FormFieldBase.defaultProps = {
  accessibility: formFieldBehavior,
};

/**
 * A FormFiedBase represents a Form element containing a label and an input.
 */
export default _FormFieldBase;
