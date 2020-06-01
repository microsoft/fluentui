import { Accessibility, FormFieldBehaviorProps, formFieldBehavior } from '@fluentui/accessibility';
import * as customPropTypes from '@fluentui/react-proptypes';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import { ExclamationCircleIcon } from '@fluentui/react-icons-northstar';
import {
  childrenExist,
  createShorthandFactory,
  UIComponentProps,
  ChildrenComponentProps,
  commonPropTypes,
} from '../../utils';
import {
  WithAsProp,
  ShorthandValue,
  withSafeTypeForAs,
  FluentComponentStaticProps,
  ProviderContextPrepared,
} from '../../types';
import Text, { TextProps } from '../Text/Text';
import Input from '../Input/Input';
import Box, { BoxProps } from '../Box/Box';
import { getElementType, useUnhandledProps, useTelemetry, useStyles, useAccessibility } from '@fluentui/react-bindings';
// @ts-ignore
import { ThemeContext } from 'react-fela';

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

  errorMessage?: ShorthandValue<TextProps>;

  errorIndicator?: ShorthandValue<BoxProps>;

  satisfactoryIndicator?: ShorthandValue<BoxProps>;
}

export const formFieldClassName = 'ui-form__field';

export type FormFieldStylesProps = Required<Pick<FormFieldProps, 'type' | 'inline' | 'required'>> & {
  hasErrorMessage: boolean;
};

const FormField: React.FC<WithAsProp<FormFieldProps>> & FluentComponentStaticProps<FormFieldProps> = props => {
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
    errorIndicator,
    satisfactoryIndicator,
  } = props;

  const ElementType = getElementType(props);
  const unhandledProps = useUnhandledProps(FormField.handledProps, props);

  const getA11yProps = useAccessibility<FormFieldBehaviorProps>(props.accessibility, {
    debugName: FormField.displayName,
    mapPropsToBehavior: () => ({
      hasErrorMessage: !!errorMessage,
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
    defaultProps: () => ({
      as: 'label',
      htmlFor: id,
      styles: resolvedStyles.label,
    }),
  });

  const messageElement = Text.create(errorMessage || message, {
    defaultProps: () => ({
      styles: resolvedStyles.message,
    }),
  });

  const iconElement = Box.create(errorIndicator || satisfactoryIndicator, {
    defaultProps: () =>
      getA11yProps('icon', {
        title: name,
        styles: resolvedStyles.icon,
      }),
  });

  const controlElement = Box.create(control || {}, {
    defaultProps: () =>
      getA11yProps('control', {
        required,
        id,
        name,
        type,
        icon: !!errorMessage ? iconElement : null,
        satisfactoryIndicator,
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
        ...unhandledProps,
      })}
    >
      {childrenExist(children) ? children : content}
    </ElementType>
  );
  setEnd();
  return element;
};

FormField.displayName = 'FormField';

FormField.propTypes = {
  ...commonPropTypes.createCommon({
    content: false,
  }),
  control: customPropTypes.itemShorthand,
  id: PropTypes.string,
  inline: PropTypes.bool,
  label: customPropTypes.itemShorthand,
  message: customPropTypes.itemShorthand,
  name: PropTypes.string,
  required: PropTypes.bool,
  type: PropTypes.string,
};

FormField.handledProps = Object.keys(FormField.propTypes) as any;

FormField.defaultProps = {
  accessibility: formFieldBehavior,
  errorIndicator: <ExclamationCircleIcon />,
  as: 'div',
  control: { as: Input },
};

FormField.create = createShorthandFactory({ Component: FormField, mappedProp: 'label' });

/**
 * A FormField represents a Form element containing a label and an input.
 */
export default withSafeTypeForAs<typeof FormField, FormFieldProps>(FormField);
