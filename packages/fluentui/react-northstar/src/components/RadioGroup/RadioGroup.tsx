// TODO:
// vertical - padding variable?
import { Accessibility, radioGroupBehavior, RadioGroupBehaviorProps } from '@fluentui/accessibility';
import * as customPropTypes from '@fluentui/react-proptypes';
import * as _ from 'lodash';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import {
  childrenExist,
  UIComponentProps,
  ChildrenComponentProps,
  commonPropTypes,
  rtlTextContainer,
  createShorthandFactory,
} from '../../utils';
import { RadioGroupItem, RadioGroupItemProps } from './RadioGroupItem';
import { ComponentEventHandler, ShorthandCollection, FluentComponentStaticProps } from '../../types';
import {
  useAutoControlled,
  useTelemetry,
  useFluentContext,
  getElementType,
  useUnhandledProps,
  useAccessibility,
  useStyles,
  ForwardRefWithAs,
} from '@fluentui/react-bindings';

export interface RadioGroupProps extends UIComponentProps, ChildrenComponentProps {
  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility<RadioGroupBehaviorProps>;

  /** Value of the currently checked radio item. */
  checkedValue?: number | string;

  /**
   * Called after radio group value is changed.
   * @param event - React's original SyntheticEvent.
   * @param data - All value props.
   */
  onCheckedValueChange?: ComponentEventHandler<RadioGroupItemProps>;

  /** Initial checkedValue value. */
  defaultCheckedValue?: number | string;

  /** Shorthand array of props for RadioGroup. */
  items?: ShorthandCollection<RadioGroupItemProps>;

  /** A vertical radio group displays elements vertically. */
  vertical?: boolean;
}

export const radioGroupClassName = 'ui-radiogroup';

export type RadioGroupStylesProps = Required<Pick<RadioGroupProps, 'vertical'>>;

/**
 * A RadioGroup allows user to select a value from a small set of mutually exclusive options.
 *
 * @accessibility
 * Implements [ARIA Radio Group](https://www.w3.org/TR/wai-aria-practices-1.1/#radiobutton) design pattern.
 * @accessibilityIssues
 * [JAWS narrates instruction message on each radio in radiogroup](https://github.com/FreedomScientific/VFO-standards-support/issues/473)
 */
export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>((props, ref) => {
  const context = useFluentContext();
  const { setStart, setEnd } = useTelemetry(RadioGroup.displayName, context.telemetry);
  setStart();

  const { children, vertical, items, className, design, styles, variables } = props;
  const ElementType = getElementType(props);
  const unhandledProps = useUnhandledProps(RadioGroup.handledProps, props);

  const getA11yProps = useAccessibility<RadioGroupBehaviorProps>(props.accessibility, {
    debugName: RadioGroup.displayName,
    actionHandlers: {
      nextItem: event => setCheckedItem(event, 1),
      prevItem: event => setCheckedItem(event, -1),
    },
    rtl: context.rtl,
  });

  const { classes } = useStyles<RadioGroupStylesProps>(RadioGroup.displayName, {
    className: radioGroupClassName,
    mapPropsToStyles: () => ({
      vertical,
    }),
    mapPropsToInlineStyles: () => ({
      className,
      design,
      styles,
      variables,
    }),
    rtl: context.rtl,
  });

  const [checkedValue, setCheckedValue] = useAutoControlled({
    defaultValue: props.defaultCheckedValue,
    value: props.checkedValue,
    initialValue: undefined,
  });

  const [shouldFocus, setShouldFocus] = React.useState(false);

  const getItemProps = (item): RadioGroupItemProps => {
    return (item as React.ReactElement<RadioGroupItemProps>).props || item;
  };

  const setCheckedItem = (event, direction) => {
    const nextItem = findNextEnabledCheckedItem(direction);

    if (nextItem) {
      checkedValueChange({
        nextCheckedValue: nextItem.value,
        shouldFocus: true,
        event,
        itemProps: nextItem,
      });
    }
    event.preventDefault();
  };

  const findNextEnabledCheckedItem = (direction): RadioGroupItemProps => {
    if (!props.items || !props.items.length) {
      return undefined;
    }

    const currentIndex =
      // if none of the values selected, set current index to the first item
      checkedValue !== undefined ? _.findIndex(props.items, item => getItemProps(item).value === checkedValue) : 0;

    for (let newIndex = currentIndex + direction; newIndex !== currentIndex; newIndex += direction) {
      if (newIndex < 0) {
        newIndex = props.items.length - 1;
      } else if (newIndex >= props.items.length) {
        newIndex = 0;
      }

      if (newIndex === currentIndex) {
        return undefined;
      }

      const itemProps = getItemProps(props.items[newIndex]);
      if (!itemProps.disabled) {
        return itemProps;
      }
    }
    return undefined;
  };

  const handleItemOverrides = predefinedProps => ({
    checked: typeof checkedValue !== 'undefined' && checkedValue === predefinedProps.value,
    onClick: (event, itemProps) => {
      const { value, disabled } = itemProps;
      if (!disabled && value !== checkedValue) {
        checkedValueChange({ nextCheckedValue: value, shouldFocus: false, event, itemProps });
      }
      _.invoke(predefinedProps, 'onClick', event, itemProps);
    },
    shouldFocus,
  });

  const renderItems = (vertical: boolean) => {
    const isNoneValueSelected = checkedValue === undefined;
    return _.map(items, (item, index) =>
      RadioGroupItem.create(item, {
        defaultProps: () =>
          getA11yProps('item', {
            vertical,
            ...(index === 0 && isNoneValueSelected && { tabIndex: 0 }),
          }),
        overrideProps: handleItemOverrides,
      }),
    );
  };

  const checkedValueChange = ({
    nextCheckedValue,
    shouldFocus,
    event,
    itemProps,
  }: {
    nextCheckedValue: number | string;
    shouldFocus: boolean;
    event: React.SyntheticEvent;
    itemProps: RadioGroupItemProps;
  }) => {
    setCheckedValue(nextCheckedValue);
    setShouldFocus(shouldFocus);
    _.invoke(props, 'onCheckedValueChange', event, itemProps);
  };

  const element = getA11yProps.unstable_wrapWithFocusZone(
    <ElementType
      {...getA11yProps('root', {
        className: classes.root,
        ref,
        ...unhandledProps,
        ...rtlTextContainer.getAttributes({ forElements: [children] }),
      })}
    >
      {childrenExist(children) ? children : renderItems(vertical)}
    </ElementType>,
  );

  setEnd();
  return element;
}) as unknown as ForwardRefWithAs<'div', HTMLDivElement, RadioGroupProps> &
  FluentComponentStaticProps<RadioGroupProps> & {
    Item: typeof RadioGroupItem;
  };

RadioGroup.displayName = 'RadioGroup';

RadioGroup.propTypes = {
  ...commonPropTypes.createCommon({
    content: false,
  }),
  checkedValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  defaultCheckedValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  items: customPropTypes.collectionShorthand,
  onCheckedValueChange: PropTypes.func,
  vertical: PropTypes.bool,
};

RadioGroup.defaultProps = {
  accessibility: radioGroupBehavior,
};

RadioGroup.handledProps = Object.keys(RadioGroup.propTypes) as any;

RadioGroup.Item = RadioGroupItem;

RadioGroup.create = createShorthandFactory({
  Component: RadioGroup,
});
