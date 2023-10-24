import { Accessibility } from '@fluentui/accessibility';
import * as customPropTypes from '@fluentui/react-proptypes';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import * as _ from 'lodash';

import {
  childrenExist,
  UIComponentProps,
  ChildrenComponentProps,
  commonPropTypes,
  rtlTextContainer,
  createShorthandFactory,
} from '../../utils';
import { ComponentEventHandler, ShorthandCollection, FluentComponentStaticProps } from '../../types';
import { FormField, FormFieldProps } from './FormField';
import {
  useTelemetry,
  getElementType,
  useUnhandledProps,
  useStyles,
  useFluentContext,
  useAccessibility,
  ForwardRefWithAs,
} from '@fluentui/react-bindings';

export interface FormProps extends UIComponentProps, ChildrenComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   */
  accessibility?: Accessibility<never>;

  /** The HTML form action. */
  action?: string;

  /**
   * @deprecated
   * Shorthand array of props for the FormFields inside the Form.
   */
  fields?: ShorthandCollection<FormFieldProps>;

  /**
   * The HTML form submit handler.
   * @param event - React's original SyntheticEvent.
   * @param data - All props.
   */
  onSubmit?: ComponentEventHandler<FormProps>;
}

export const formClassName = 'ui-form';

export type FormStylesProps = never;

/**
 * A Form is used to collect, oprionally validate, and submit the user input, in a structured way.
 */
export const Form = React.forwardRef<HTMLFormElement, FormProps>((props, ref) => {
  const context = useFluentContext();
  const { setStart, setEnd } = useTelemetry(Form.displayName, context.telemetry);
  setStart();
  const { className, design, styles, variables, action, children, accessibility } = props;
  const ElementType = getElementType(props);
  const unhandledProps = useUnhandledProps(Form.handledProps, props);

  const { classes } = useStyles<FormStylesProps>(Form.displayName, {
    className: formClassName,
    mapPropsToInlineStyles: () => ({
      className,
      design,
      styles,
      variables,
    }),
    rtl: context.rtl,
  });

  const getA11yProps = useAccessibility<never>(accessibility, {
    debugName: Form.displayName,
    rtl: context.rtl,
  });

  const handleSubmit = (e, ...args) => {
    const { action } = props;

    // Heads up! Third party libs can pass own data as first argument, we need to check that it has preventDefault()
    // method.
    if (!action) _.invoke(e, 'preventDefault');
    _.invoke(props, 'onSubmit', e, props, ...args);
  };

  const renderFields = () => {
    const { fields } = props;
    return _.map(fields, field => FormField.create(field));
  };

  const element = (
    <ElementType
      {...getA11yProps('root', {
        className: classes.root,
        ref,
        ...rtlTextContainer.getAttributes({ forElements: [children] }),
        ...unhandledProps,
      })}
      action={action}
      onSubmit={handleSubmit}
    >
      {childrenExist(children) ? children : renderFields()}
    </ElementType>
  );
  setEnd();
  return element;
}) as unknown as ForwardRefWithAs<'form', HTMLFormElement, FormProps> & FluentComponentStaticProps<FormProps>;

Form.displayName = 'Form';

Form.propTypes = {
  ...commonPropTypes.createCommon({
    content: false,
  }),
  action: PropTypes.string,
  fields: customPropTypes.collectionShorthand,
  onSubmit: PropTypes.func,
};

Form.defaultProps = {
  as: 'form' as const,
};

Form.handledProps = Object.keys(Form.propTypes) as any;

Form.create = createShorthandFactory({
  Component: Form,
});
