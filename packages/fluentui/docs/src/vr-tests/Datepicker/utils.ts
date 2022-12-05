import {
  datepickerCalendarCellClassName,
  datepickerCalendarCellButtonClassName,
  datepickerCalendarGridRowClassName,
} from '@fluentui/react-northstar';

export const datepickerCalendarCellSelector = index => {
  const row = Math.floor((index - 1) / 7);
  const col = index - row * 7;
  return `.${datepickerCalendarGridRowClassName}:nth-child(${row})
            >.${datepickerCalendarCellClassName}:nth-child(${col})
            >.${datepickerCalendarCellButtonClassName}`;
};
