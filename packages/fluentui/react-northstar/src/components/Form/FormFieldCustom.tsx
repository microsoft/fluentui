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
import Box from '../Box/Box';
import {
  getElementType,
  // useUnhandledProps,
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

export interface FormFieldCustomProps extends UIComponentProps, ChildrenComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   */
  accessibility?: Accessibility<FormFieldBehaviorProps>;

  /** A field can have its label next to instead of above it. */
  inline?: boolean;

  /** The HTML input id. This will be set on the control element and will be use for linking it with the label for correct accessibility. */
  id?: string;

  /** A label for the form field. */
  label?: ShorthandValue<TextProps>;

  /** Text message that will be displayed below the control (can be used for error, warning, success messages). */
  message?: ShorthandValue<TextProps>;

  /** Message to be shown when input has error */
  errorMessage?: ShorthandValue<TextProps>;
}

export const formFieldClassName = 'ui-form__field';
export const formFieldMessageClassName = 'ui-form__field__message';

export type FormFieldCustomStylesProps = Required<Pick<FormFieldCustomProps, 'inline'>> & {
  hasErrorMessage: boolean;
};

const FormFieldCustom = compose<'div', FormFieldCustomProps, FormFieldCustomStylesProps, {}, {}>(
  (props, ref, composeOptions) => {
    const context: ProviderContextPrepared = React.useContext(ThemeContext);
    const { setStart, setEnd } = useTelemetry(composeOptions.displayName, context.telemetry);
    setStart();

    const slotProps = composeOptions.resolveSlotProps<FormFieldCustomProps>(props);
    const { children, message, className, design, styles, variables, inline, errorMessage, id, label } = props;
    const ElementType = getElementType(props);
    // const unhandledProps = useUnhandledProps(composeOptions.handledProps, props);
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
          as: 'label',
          htmlFor: id,
          id: labelId.current,
          styles: resolvedStyles.label,
          inline,
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

    const content = (
      <>
        {labelElement}
        {(slotProps.root as any).children}
        {messageElement}
      </>
    );

    const element = (
      <ElementType
        {...getA11yProps('root', {
          className: classes.root,
          ref,
          ...slotProps.root,
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
      'design',
      'design',
      'errorMessage',
      'message',
      'variables',
      'styles',
    ],
    shorthandConfig: {},
  },
) as ComponentWithAs<'div', FormFieldCustomProps> & {
  create: ShorthandFactory<FormFieldCustomProps>;
  shorthandConfig: ShorthandConfig<FormFieldCustomProps>;
};

FormFieldCustom.propTypes = {
  ...commonPropTypes.createCommon({
    content: false,
  }),
  // control: customPropTypes.shorthandAllowingChildren,
  id: PropTypes.string,
  inline: PropTypes.bool,
  message: customPropTypes.itemShorthand,
  errorMessage: customPropTypes.shorthandAllowingChildren,
};

FormFieldCustom.defaultProps = {
  accessibility: formFieldBehavior,
};

FormFieldCustom.create = createShorthandFactory({ Component: FormFieldCustom });

/**
 * A FormFieldCustom represents a Form element containing a label and an input.
 */
export default withSafeTypeForAs<typeof FormFieldCustom, FormFieldCustomProps>(FormFieldCustom);
