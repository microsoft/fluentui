import { Accessibility, radioGroupItemBehavior, RadioGroupItemBehaviorProps } from '@fluentui/accessibility';
import { Ref } from '@fluentui/react-component-ref';
import * as customPropTypes from '@fluentui/react-proptypes';
import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as _ from 'lodash';
import {
  createShorthandFactory,
  UIComponentProps,
  ChildrenComponentProps,
  commonPropTypes,
  shouldPreventDefaultOnKeyDown,
} from '../../utils';
import { Box, BoxProps } from '../Box/Box';
import { ComponentEventHandler, ShorthandValue, FluentComponentStaticProps } from '../../types';
import {
  ComponentWithAs,
  useAutoControlled,
  getElementType,
  useAccessibility,
  useFluentContext,
  useStyles,
  useTelemetry,
  useUnhandledProps,
} from '@fluentui/react-bindings';

export interface RadioGroupItemSlotClassNames {
  indicator: string;
}

export interface RadioGroupItemProps extends UIComponentProps, ChildrenComponentProps {
  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility<RadioGroupItemBehaviorProps>;

  /** Whether or not radio item is checked. */
  checked?: boolean;

  /**
   * Called after radio item checked state is changed.
   * @param event - React's original SyntheticEvent.
   * @param data - All props.
   */
  onChange?: ComponentEventHandler<RadioGroupItemProps>;

  /** The label of the radio item. */
  label?: ShorthandValue<BoxProps>;

  /** Initial checked value. */
  defaultChecked?: boolean;

  /** A radio item can appear disabled and be unable to change states. */
  disabled?: boolean;

  /** The radio item indicator can be customized. */
  indicator?: ShorthandValue<BoxProps>;

  /** The HTML input name. */
  name?: string;

  /**
   * Called after radio item is clicked.
   * @param event - React's original SyntheticEvent.
   * @param data - All props.
   */
  onClick?: ComponentEventHandler<RadioGroupItemProps>;

  /** Whether should focus when checked */
  shouldFocus?: boolean; // TODO: RFC #306

  /** The HTML input value. */
  value?: string | number;

  /** A vertical radio group displays elements vertically. */
  vertical?: boolean;
}

export const radioGroupItemClassName = 'ui-radiogroup__item';
export const radioGroupItemSlotClassNames: RadioGroupItemSlotClassNames = {
  indicator: `${radioGroupItemClassName}__indicator`,
};

export type RadioGroupItemStylesProps = Required<Pick<RadioGroupItemProps, 'disabled' | 'vertical' | 'checked'>>;

/**
 * A RadioGroupItem represents single input element within a RadioGroup.
 *
 * @accessibility
 * Radio items need to be grouped to correctly handle accessibility.
 */
export const RadioGroupItem: ComponentWithAs<'div', RadioGroupItemProps> &
  FluentComponentStaticProps<RadioGroupItemProps> = props => {
  const context = useFluentContext();
  const { setStart, setEnd } = useTelemetry(RadioGroupItem.displayName, context.telemetry);
  setStart();
  const { label, indicator, disabled, vertical, className, design, styles, variables, shouldFocus } = props;
  const elementRef = React.useRef<HTMLElement>();
  const ElementType = getElementType(props);
  const unhandledProps = useUnhandledProps(RadioGroupItem.handledProps, props);

  const [checked, setChecked] = useAutoControlled({
    defaultValue: props.defaultChecked,
    value: props.checked,
    initialValue: false,
  });

  const handleClick = (e: React.MouseEvent | React.KeyboardEvent) => {
    _.invoke(props, 'onClick', e, props);
    setChecked(prevChecked => {
      _.invoke(props, 'onChange', undefined, { ...props, checked: !prevChecked });
      return !prevChecked;
    });
  };

  React.useEffect(() => {
    if (checked && shouldFocus) elementRef.current.focus();
  }, [checked, shouldFocus]);

  const { classes, styles: resolvedStyles } = useStyles<RadioGroupItemStylesProps>(RadioGroupItem.displayName, {
    className: radioGroupItemClassName,
    mapPropsToStyles: () => ({
      vertical,
      disabled,
      checked,
    }),
    mapPropsToInlineStyles: () => ({
      className,
      design,
      styles,
      variables,
    }),
    rtl: context.rtl,
  });

  const getA11yProps = useAccessibility<RadioGroupItemBehaviorProps>(props.accessibility, {
    debugName: RadioGroupItem.displayName,
    actionHandlers: {
      performClick: e => {
        if (shouldPreventDefaultOnKeyDown(e)) {
          e.preventDefault();
        }
        handleClick(e);
      },
    },
    mapPropsToBehavior: () => ({
      checked,
      disabled,
    }),
    rtl: context.rtl,
  });

  const handleChange = (e: React.ChangeEvent) => {
    // RadioGroupItem component doesn't present any `input` component in markup, however all of our
    // components should handle events transparently.
    _.invoke(props, 'onChange', e, { ...props, checked });
  };

  const element = getA11yProps.unstable_wrapWithFocusZone(
    <Ref innerRef={elementRef}>
      <ElementType
        {...getA11yProps('root', {
          className: classes.root,
          onClick: handleClick,
          onChange: handleChange,
          ...unhandledProps,
        })}
      >
        {Box.create(indicator, {
          defaultProps: () => ({
            className: radioGroupItemSlotClassNames.indicator,
            styles: resolvedStyles.indicator,
          }),
        })}
        {Box.create(label, {
          defaultProps: () => ({
            as: 'span',
          }),
        })}
      </ElementType>
    </Ref>,
  );
  setEnd();
  return element;
};

RadioGroupItem.displayName = 'RadioGroupItem';

RadioGroupItem.propTypes = {
  ...commonPropTypes.createCommon({
    content: false,
  }),
  checked: PropTypes.bool,
  defaultChecked: PropTypes.bool,
  disabled: PropTypes.bool,
  indicator: customPropTypes.shorthandAllowingChildren,
  label: customPropTypes.itemShorthand,
  name: PropTypes.string,
  onClick: PropTypes.func,
  onChange: PropTypes.func,
  shouldFocus: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  vertical: PropTypes.bool,
};

RadioGroupItem.defaultProps = {
  accessibility: radioGroupItemBehavior,
  indicator: {},
};

RadioGroupItem.handledProps = Object.keys(RadioGroupItem.propTypes) as any;

RadioGroupItem.create = createShorthandFactory({ Component: RadioGroupItem, mappedProp: 'label' });
