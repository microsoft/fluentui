import { compose } from '@fluentui/react-bindings';
import { commonPropTypes } from '../../utils';
import { BoxProps, Box } from '../Box/Box';

export type DatepickerCalendarGridProps = {};

export type DatepickerCalendarGridStylesProps = {};

export const DatepickerCalendarGridClassName = 'ui-datepicker__calendargrid';
/**
 * A DatepickerCalendarGrid is used to display the whole calendar grid.
 * This component is currently UNSTABLE!
 */
export const DatepickerCalendarGrid = compose<
  'table',
  DatepickerCalendarGridProps,
  DatepickerCalendarGridStylesProps,
  BoxProps,
  {}
>(Box, {
  className: DatepickerCalendarGridClassName,
  displayName: 'DatepickerCalendarGrid',
  overrideStyles: true,
  shorthandConfig: {
    mappedProp: 'content',
  },
});

DatepickerCalendarGrid.defaultProps = {
  as: 'table',
};

DatepickerCalendarGrid.propTypes = commonPropTypes.createCommon();
