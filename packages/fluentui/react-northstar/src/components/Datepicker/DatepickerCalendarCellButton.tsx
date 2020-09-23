import {
  Accessibility,
  datepickerCalendarCellButtonBehavior,
  DatepickerCalendarCellButtonBehaviorProps,
} from '@fluentui/accessibility';
import {
  getElementType,
  useAccessibility,
  useStyles,
  useFluentContext,
  useTelemetry,
  useUnhandledProps,
  compose,
} from '@fluentui/react-bindings';
import * as _ from 'lodash';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import { ComponentEventHandler, ComponentKeyboardEventHandler } from '../../types';
import { commonPropTypes, ContentComponentProps, UIComponentProps } from '../../utils';

export interface DatepickerCalendarCellButtonProps extends UIComponentProps, ContentComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   */
  accessibility?: Accessibility<DatepickerCalendarCellButtonBehaviorProps>;

  /**
   * Called on click.
   *
   * @param event - React's original SyntheticEvent.
   * @param data - All props.
   */
  onClick?: ComponentEventHandler<DatepickerCalendarCellButtonProps>;

  /**
   * Called on focus.
   *
   * @param event - React's original SyntheticEvent.
   * @param data - All props.
   */
  onFocus?: ComponentEventHandler<DatepickerCalendarCellButtonProps>;

  /** A cell can show that it cannot be interacted with. */
  disabled?: boolean;

  /** A cell can show that it is currently selected or not. */
  selected?: boolean;

  /** Denotes that the cell marks today's date. */
  today?: boolean;

  /** A cell can show that it currently has dimmed styles. */
  quiet?: boolean;

  /**
   * Called on selected item key down.
   *
   * @param event - React's original SyntheticEvent.
   * @param data - All props and proposed value.
   */
  onKeyDown?: ComponentKeyboardEventHandler<DatepickerCalendarCellButtonProps>;
}

export type DatepickerCalendarCellButtonStylesProps = Pick<
  DatepickerCalendarCellButtonProps,
  'disabled' | 'selected' | 'quiet' | 'today'
>;

export const datepickerCalendarCellButtonClassName = 'ui-datepicker__calendarcellbutton';
/**
 * A Datepicker cell is used to display calendar grid cell button.
 */
export const DatepickerCalendarCellButton = compose<
  'button',
  DatepickerCalendarCellButtonProps,
  DatepickerCalendarCellButtonStylesProps,
  {},
  {}
>(
  (props, ref, composeOptions) => {
    const context = useFluentContext();
    const { setStart, setEnd } = useTelemetry(composeOptions.displayName, context.telemetry);
    setStart();

    const { className, design, styles, variables, disabled, selected, quiet, today, content } = props;
    const unhandledProps = useUnhandledProps(composeOptions.handledProps, props);
    const ElementType = getElementType(props);
    const getA11yProps = useAccessibility(props.accessibility, {
      debugName: composeOptions.displayName,
      actionHandlers: {
        performClick: e => {
          // prevent Spacebar from scrolling
          e.preventDefault();
          handleClick(e);
        },
      },
      mapPropsToBehavior: () => ({
        selected,
        disabled,
        quiet,
        today,
      }),
      rtl: context.rtl,
    });

    const { classes } = useStyles<DatepickerCalendarCellButtonStylesProps>(DatepickerCalendarCellButton.displayName, {
      className: composeOptions.className,
      mapPropsToStyles: () => ({
        disabled,
        selected,
        quiet,
        today,
      }),
      mapPropsToInlineStyles: () => ({
        className,
        design,
        styles,
        variables,
      }),
      rtl: context.rtl,
      composeOptions,
      unstable_props: props,
    });
    const handleClick = (e: React.MouseEvent | React.KeyboardEvent) => {
      if (disabled) {
        e.preventDefault();
        return;
      }

      _.invoke(props, 'onClick', e, props);
    };

    const element = (
      <ElementType
        {...getA11yProps('root', {
          className: classes.root,
          onClick: handleClick,
          ref,
          ...unhandledProps,
        })}
      >
        {content}
      </ElementType>
    );
    setEnd();
    return element;
  },
  {
    className: datepickerCalendarCellButtonClassName,
    displayName: 'DatepickerCalendarCellButton',

    handledProps: [
      'accessibility',
      'as',
      'className',
      'content',
      'design',
      'disabled',
      'onClick',
      'selected',
      'styles',
      'variables',
      'quiet',
      'today',
    ],
  },
);

DatepickerCalendarCellButton.propTypes = {
  ...commonPropTypes.createCommon({ children: false }),
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  selected: PropTypes.bool,
  quiet: PropTypes.bool,
  today: PropTypes.bool,
};

DatepickerCalendarCellButton.defaultProps = {
  accessibility: datepickerCalendarCellButtonBehavior,
  as: 'button',
};
