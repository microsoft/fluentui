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
  ComponentWithAs,
  useTelemetry,
  getElementType,
  useUnhandledProps,
  useStyles,
  useFluentContext,
  useAccessibility,
} from '@fluentui/react-bindings';

import { FormLabel } from './FormLabel';
import { FormMessage } from './FormMessage';
import { FormInput } from './FormInput';
import { FormCheckbox } from './FormCheckbox';
import { FormDropdown } from './FormDropdown';
import { FormButton } from './FormButton';
import { FormRadioGroup } from './FormRadioGroup';
import { FormSlider } from './FormSlider';
import { FormFieldCustom } from './FormFieldCustom';
import { FormDatepicker } from './FormDatepicker';

export interface FormProps extends UIComponentProps, ChildrenComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   */
  accessibility?: Accessibility<never>;

  /** The HTML form action. */
  action?: string;

  /** Shorthand array of props for the Form.Fields inside the Form. */
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
export const Form: ComponentWithAs<'form', FormProps> &
  FluentComponentStaticProps<FormProps> & {
    Field: typeof FormField;
    Label: typeof FormLabel;
    Message: typeof FormMessage;
    Input: typeof FormInput;
    Checkbox: typeof FormCheckbox;
    Dropdown: typeof FormDropdown;
    Button: typeof FormButton;
    RadioGroup: typeof FormRadioGroup;
    Slider: typeof FormSlider;
    FieldCustom: typeof FormFieldCustom;
    Datepicker: typeof FormDatepicker;
  } = props => {
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
};

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
  as: 'form',
};

Form.handledProps = Object.keys(Form.propTypes) as any;

Form.create = createShorthandFactory({
  Component: Form,
});

Form.Field = FormField;
Form.FieldCustom = FormFieldCustom;
Form.Label = FormLabel;
Form.Message = FormMessage;
Form.Input = FormInput;
Form.Checkbox = FormCheckbox;
Form.Dropdown = FormDropdown;
Form.Button = FormButton;
Form.RadioGroup = FormRadioGroup;
Form.Slider = FormSlider;
Form.Datepicker = FormDatepicker;
