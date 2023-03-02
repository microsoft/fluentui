import { Accessibility, FormFieldBehaviorProps, formFieldBehavior } from '@fluentui/accessibility';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import { UIComponentProps, ChildrenComponentProps, commonPropTypes } from '../../utils';
import { FluentComponentStaticProps } from '../../types';
import {
  getElementType,
  useUnhandledProps,
  useTelemetry,
  useFluentContext,
  useStyles,
  useAccessibility,
} from '@fluentui/react-bindings';

export interface FormFieldCustomProps extends UIComponentProps, ChildrenComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   */
  accessibility?: Accessibility<FormFieldBehaviorProps>;

  /** The HTML input id. This will be set on the control element and will be use for linking it with the label for correct accessibility. */
  id?: string;

  /** A field can have its label next to instead of above it. */
  inline?: boolean;

  /** The HTML input name. */
  name?: string;

  /** A field can show that input is mandatory. */
  required?: boolean;

  /** The HTML input type. */
  type?: string;
}

export const formFieldCustomClassName = 'ui-form__fieldcustom';

export type FormFieldCustomStylesProps = Required<Pick<FormFieldCustomProps, 'type' | 'inline' | 'required'>>;

/**
 * A FormFieldCustom represents a Form element containing a label and an input.
 */
export const FormFieldCustom = React.forwardRef<HTMLDivElement, FormFieldCustomProps>((props, ref) => {
  const context = useFluentContext();
  const { setStart, setEnd } = useTelemetry(FormFieldCustom.displayName, context.telemetry);
  setStart();

  const { children, required, type, className, design, styles, variables, inline } = props;

  const ElementType = getElementType(props);
  const unhandledProps = useUnhandledProps(FormFieldCustom.handledProps, props);

  const getA11yProps = useAccessibility<FormFieldBehaviorProps>(props.accessibility, {
    debugName: FormFieldCustom.displayName,
    rtl: context.rtl,
  });

  const { classes } = useStyles<FormFieldCustomStylesProps>(FormFieldCustom.displayName, {
    className: formFieldCustomClassName,
    mapPropsToStyles: () => ({
      type,
      inline,
      required,
    }),
    mapPropsToInlineStyles: () => ({
      className,
      design,
      styles,
      variables,
    }),
    rtl: context.rtl,
  });

  const element = (
    <ElementType
      {...getA11yProps('root', {
        className: classes.root,
        ref,
        ...unhandledProps,
      })}
    >
      {children}
    </ElementType>
  );
  setEnd();
  return element;
}) as unknown as React.FC<FormFieldCustomProps> & FluentComponentStaticProps<FormFieldCustomProps>;

FormFieldCustom.displayName = 'FormFieldCustom';

FormFieldCustom.propTypes = {
  ...commonPropTypes.createCommon({
    content: false,
    children: false,
  }),
  id: PropTypes.string,
  inline: PropTypes.bool,
  name: PropTypes.string,
  required: PropTypes.bool,
  type: PropTypes.string,
};

FormFieldCustom.handledProps = Object.keys(FormFieldCustom.propTypes) as any;

FormFieldCustom.defaultProps = {
  accessibility: formFieldBehavior,
};
