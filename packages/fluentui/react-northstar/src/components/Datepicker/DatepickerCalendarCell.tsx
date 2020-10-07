import {
  Accessibility,
  datepickerCalendarCellBehavior,
  DatepickerCalendarCellBehaviorProps,
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
import * as PropTypes from 'prop-types';
import * as React from 'react';
import { commonPropTypes, ContentComponentProps, UIComponentProps } from '../../utils';

export interface DatepickerCalendarCellProps extends UIComponentProps, ContentComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   */
  accessibility?: Accessibility<DatepickerCalendarCellBehaviorProps>;

  /** A cell can show that it cannot be interacted with. */
  disabled?: boolean;

  /** A cell can show that it is currently selected or not. */
  selected?: boolean;

  /** Denotes that the cell marks today's date. */
  today?: boolean;

  /** A cell can show that it currently has dimmed styles. */
  quiet?: boolean;
}

export type DatepickerCalendarCellStylesProps = Pick<
  DatepickerCalendarCellProps,
  'disabled' | 'selected' | 'quiet' | 'today'
>;

export const datepickerCalendarCellClassName = 'ui-datepicker__calendarcell';
/**
 * A Datepicker cell is used to display calendar grid cells.
 */
export const DatepickerCalendarCell = compose<
  'td',
  DatepickerCalendarCellProps,
  DatepickerCalendarCellStylesProps,
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
      actionHandlers: {},
      mapPropsToBehavior: () => ({
        selected,
        disabled,
        quiet,
        today,
      }),
      rtl: context.rtl,
    });

    const { classes } = useStyles<DatepickerCalendarCellStylesProps>(DatepickerCalendarCell.displayName, {
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

    const element = (
      <ElementType
        {...getA11yProps('root', {
          className: classes.root,
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
    className: datepickerCalendarCellClassName,
    displayName: 'DatepickerCalendarCell',

    handledProps: [
      'accessibility',
      'as',
      'className',
      'content',
      'design',
      'disabled',
      'selected',
      'styles',
      'variables',
      'quiet',
      'today',
    ],
  },
);

DatepickerCalendarCell.propTypes = {
  ...commonPropTypes.createCommon({ children: false }),
  disabled: PropTypes.bool,
  selected: PropTypes.bool,
  quiet: PropTypes.bool,
  today: PropTypes.bool,
};

DatepickerCalendarCell.defaultProps = {
  accessibility: datepickerCalendarCellBehavior,
  as: 'td',
};
