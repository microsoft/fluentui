import { Accessibility } from '@fluentui/accessibility';
import {
  useAccessibility,
  useStyles,
  useFluentContext,
  useTelemetry,
  compose,
  getElementType,
  useUnhandledProps,
} from '@fluentui/react-bindings';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import { commonPropTypes, createShorthand, ContentComponentProps, UIComponentProps } from '../../utils';
import { Text } from '../Text/Text';

export interface DatepickerCalendarHeaderCellProps extends UIComponentProps, ContentComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   */
  accessibility?: Accessibility<DatepickerCalendarHeaderCellProps>;

  /** Row number */
  rowNumber?: number;

  /** Column number */
  columnNumber?: number;
}

export type DatepickerCalendarHeaderCellStylesProps = Pick<
  DatepickerCalendarHeaderCellProps,
  'columnNumber' | 'rowNumber'
>;

export const datepickerCalendarHeaderCellClassName = 'ui-datepicker__calendarheadercell';
/**
 * A DatepickerCalendarHeaderCell is used to display header cells in DatepickerCalendar grid.
 * This component is currently UNSTABLE!
 */
export const DatepickerCalendarHeaderCell = compose<
  'span',
  DatepickerCalendarHeaderCellProps,
  DatepickerCalendarHeaderCellStylesProps,
  {},
  {}
>(
  (props, ref, composeOptions) => {
    const context = useFluentContext();
    const { setStart, setEnd } = useTelemetry(composeOptions.displayName, context.telemetry);
    const { className, design, styles, variables, columnNumber, rowNumber, content } = props;
    setStart();

    const unhandledProps = useUnhandledProps(composeOptions.handledProps, props);
    const ElementType = getElementType(props);
    const getA11yProps = useAccessibility(props.accessibility, {
      debugName: composeOptions.displayName,
      mapPropsToBehavior: () => ({
        columnNumber,
        rowNumber,
      }),
      rtl: context.rtl,
    });

    const { classes } = useStyles<DatepickerCalendarHeaderCellStylesProps>(DatepickerCalendarHeaderCell.displayName, {
      className: composeOptions.className,
      mapPropsToStyles: () => ({
        columnNumber,
        rowNumber,
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
        {createShorthand(Text, content, {
          defaultProps: () =>
            getA11yProps('label', {
              content,
            }),
        })}
      </ElementType>
    );

    setEnd();
    return element;
  },
  {
    className: datepickerCalendarHeaderCellClassName,
    displayName: 'DatepickerCalendarHeaderCell',

    handledProps: [
      'accessibility',
      'as',
      'className',
      'content',
      'design',
      'styles',
      'variables',
      'columnNumber',
      'rowNumber',
    ],
  },
);

DatepickerCalendarHeaderCell.propTypes = {
  ...commonPropTypes.createCommon({ children: false }),
  columnNumber: PropTypes.number,
  rowNumber: PropTypes.number,
};

DatepickerCalendarHeaderCell.defaultProps = {
  as: 'span',
};
