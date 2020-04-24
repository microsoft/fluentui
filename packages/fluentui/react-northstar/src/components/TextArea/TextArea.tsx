import { Accessibility, textAreaBehavior, TextAreaBehaviorProps } from '@fluentui/accessibility';
import {
  ComponentEventHandler,
  WithAsProp,
  withSafeTypeForAs,
  FluentComponentStaticProps,
  ProviderContextPrepared,
} from '../../types';
import * as _ from 'lodash';
import * as React from 'react';
import * as PropTypes from 'prop-types';
import { UIComponentProps, ChildrenComponentProps, commonPropTypes, createShorthandFactory } from '../../utils';
import {
  useAutoControlled,
  getElementType,
  useTelemetry,
  useUnhandledProps,
  useAccessibility,
  useStyles,
} from '@fluentui/react-bindings';
// @ts-ignore
import { ThemeContext } from 'react-fela';

export interface TextAreaProps extends UIComponentProps, ChildrenComponentProps {
  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility<TextAreaBehaviorProps>;

  /** The default value of the text area. */
  defaultValue?: string;

  /**
   * Called on change.
   *
   * @param event - React's original SyntheticEvent.
   * @param data - All props.
   */
  onChange?: ComponentEventHandler<TextAreaProps>;

  /** The value of the text area. */
  value?: string;

  /** The text area becomes read-only. */
  disabled?: boolean;

  /** An input can have inverted colors. */
  inverted?: boolean;

  /** A textarea can be resized. */
  resize?: 'none' | 'both' | 'horizontal' | 'vertical';

  /** A textarea can take the width of its container. */
  fluid?: boolean;
}

export type TextAreStylesProps = Required<Pick<TextAreaProps, 'inverted' | 'resize' | 'fluid' | 'disabled'>>;

export const textAreaClassName = 'ui-textarea';

export const TextArea: React.FC<WithAsProp<TextAreaProps>> & FluentComponentStaticProps<TextAreaProps> = props => {
  const context: ProviderContextPrepared = React.useContext(ThemeContext);
  const { setStart, setEnd } = useTelemetry(TextArea.displayName, context.telemetry);

  setStart();

  const { disabled, accessibility, inverted, resize, fluid, className, design, styles, variables } = props;

  const [value, setValue] = useAutoControlled({
    defaultValue: props.defaultValue,
    value: props.value,
    initialValue: '',
  });

  const unhandledProps = useUnhandledProps(TextArea.handledProps, props);

  const getA11yProps = useAccessibility<TextAreaBehaviorProps>(accessibility, {
    debugName: TextArea.displayName,
    mapPropsToBehavior: () => ({
      disabled,
    }),
    rtl: context.rtl,
  });

  const { classes } = useStyles<TextAreStylesProps>(TextArea.displayName, {
    className: textAreaClassName,
    mapPropsToStyles: () => ({
      inverted,
      resize,
      fluid,
      disabled,
    }),
    mapPropsToInlineStyles: () => ({
      className,
      design,
      styles,
      variables,
    }),
    rtl: context.rtl,
  });

  const ElementType = getElementType(props);

  const handleChange = (e: React.ChangeEvent | React.FormEvent) => {
    const newValue = _.get(e, 'target.value');

    _.invoke(props, 'onChange', e, { ...props, value: newValue });
    setValue(newValue);
  };

  const element = (
    <ElementType
      {...getA11yProps('root', {
        className: classes.root,
        value,
        disabled,
        onChange: handleChange,
        ...unhandledProps,
      })}
    />
  );
  setEnd();
  return element;
};

TextArea.displayName = 'TextArea';

TextArea.propTypes = {
  ...commonPropTypes.createCommon({
    content: false,
  }),
  defaultValue: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  disabled: PropTypes.bool,
};

TextArea.defaultProps = {
  as: 'textarea',
  accessibility: textAreaBehavior,
};

TextArea.handledProps = Object.keys(TextArea.propTypes) as any;

TextArea.create = createShorthandFactory({
  Component: TextArea,
});

/**
 * A TextArea is a multi-line plan-text editing control.
 *
 * @accessibility
 * For good screen reader experience set `aria-label` or `aria-labelledby` attribute for textarea.
 * When using maxlength attribute, provide the information about max length in label for screen reader.
 * @accessibilityIssues
 * [NVDA - No announcement of maxlength](https://github.com/nvaccess/nvda/issues/7910)
 * [JAWS - textarea - no announcement of maxlength](https://github.com/FreedomScientific/VFO-standards-support/issues/300)
 */
export default withSafeTypeForAs<typeof TextArea, TextAreaProps, 'textarea'>(TextArea);
