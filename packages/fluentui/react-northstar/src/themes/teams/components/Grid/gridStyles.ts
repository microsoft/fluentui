import { GridVariables } from './gridVariables';
import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { GridStylesProps } from '../../../../components/Grid/Grid';

const getCSSTemplateValue = (template: string | number): string => {
  const templateAsNumber = Number(template);

  return !isNaN(templateAsNumber) && templateAsNumber > 0 ? `repeat(${template}, 1fr)` : String(template);
};

export const gridStyles: ComponentSlotStylesPrepared<GridStylesProps, GridVariables> = {
  root: ({ props, variables: { height, width, defaultColumnCount, gridGap, padding } }): ICSSInJSStyle => {
    const { rows, columns = !props.rows && defaultColumnCount } = props;

    return {
      height,
      width,
      padding,
      gridGap,
      display: 'grid',
      justifyContent: 'space-evenly',

      ...(rows && !columns && { gridAutoFlow: 'column' }),
      ...(rows && {
        gridTemplateRows: getCSSTemplateValue(rows),
        msGridRows: getCSSTemplateValue(rows),
      }),
      ...(columns && {
        gridTemplateColumns: getCSSTemplateValue(columns),
        msGridColumns: getCSSTemplateValue(columns),
      }),

      '& > *': { outlineOffset: '-3px' },
    };
  },
};
