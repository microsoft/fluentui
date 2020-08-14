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
import * as React from 'react';
import { commonPropTypes, createShorthand, ContentComponentProps, UIComponentProps } from '../../utils';
import { Text, TextProps } from '../Text/Text';

export interface DatepickerCalendarHeaderCellProps extends UIComponentProps, ContentComponentProps<TextProps> {
  /**
   * Accessibility behavior if overridden by the user.
   */
  accessibility?: Accessibility<never>;
}

export type DatepickerCalendarHeaderCellStylesProps = {};

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
    const { className, design, styles, variables, content } = props;
    setStart();

    const unhandledProps = useUnhandledProps(composeOptions.handledProps, props);
    const ElementType = getElementType(props);
    const getA11yProps = useAccessibility(props.accessibility, {
      debugName: composeOptions.displayName,
      mapPropsToBehavior: () => ({}),
      rtl: context.rtl,
    });

    const { classes } = useStyles<DatepickerCalendarHeaderCellStylesProps>(DatepickerCalendarHeaderCell.displayName, {
      className: composeOptions.className,
      mapPropsToStyles: () => ({}),
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
          defaultProps: () => getA11yProps('label', {}),
        })}
      </ElementType>
    );

    setEnd();
    return element;
  },
  {
    className: datepickerCalendarHeaderCellClassName,
    displayName: 'DatepickerCalendarHeaderCell',

    handledProps: ['accessibility', 'as', 'className', 'content', 'design', 'styles', 'variables'],
  },
);

DatepickerCalendarHeaderCell.propTypes = {
  ...commonPropTypes.createCommon({ children: false }),
};

DatepickerCalendarHeaderCell.defaultProps = {
  as: 'span',
};
