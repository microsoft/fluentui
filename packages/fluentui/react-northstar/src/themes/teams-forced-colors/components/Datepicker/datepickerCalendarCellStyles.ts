import { ComponentSlotStylesPrepared } from '@fluentui/styles';
import { DatepickerCalendarCellStylesProps } from '../../../../components/Datepicker/DatepickerCalendarCell';
import { DatepickerVariables } from '../../../teams/components/Datepicker/datepickerVariables';

export const datepickerCalendarCellStyles: ComponentSlotStylesPrepared<
  DatepickerCalendarCellStylesProps,
  DatepickerVariables
> = {
  root: ({ props: p, variables: v }) => ({
    // One element (DatepickerCalendarCellButton) can't have multiple outlines
    // when the cell is selected and today put the selected
    // outline on the parent cell
    ...(p.selected &&
      p.today && {
        outline: '2px solid CanvasText',
        outlineOffset: '-2px',
        ':focus': {
          outlineStyle: 'solid',
        },
      }),
  }),
};
