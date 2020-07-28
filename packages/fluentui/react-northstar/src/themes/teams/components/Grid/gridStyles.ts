import { GridVariables } from './gridVariables';
import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { GridStylesProps } from '../../../../components/Grid/Grid';

const getCSSTemplateValue = (template: number, gap: string = ''): string => {
  return Array.from({ length: template }, () => '1fr').join(` ${gap} `);
};

export const gridStyles: ComponentSlotStylesPrepared<GridStylesProps, GridVariables> = {
  root: ({ props, variables: { height, width, defaultColumnCount, gridGap, padding } }): ICSSInJSStyle => {
    const { rows, columns = !props.rows && defaultColumnCount } = props;

    return {
      height,
      width,
      padding,
      gridGap,
      display: ['grid', '-ms-grid'],
      justifyContent: 'space-evenly',

      ...(rows && !columns && { gridAutoFlow: 'column' }),
      ...(rows && {
        gridTemplateRows: getCSSTemplateValue(rows),
        msGridRows: getCSSTemplateValue(rows, gridGap),
      }),
      ...(columns && {
        gridTemplateColumns: getCSSTemplateValue(columns),
        msGridColumns: getCSSTemplateValue(columns, gridGap),
      }),

      '& > *': { outlineOffset: '-3px' },
    };
  },
};
