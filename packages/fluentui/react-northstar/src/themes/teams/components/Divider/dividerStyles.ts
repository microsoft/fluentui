import * as _ from 'lodash';

import { pxToRem } from '../../../../utils';
import { dividerColorAreas } from './dividerVariables';
import type { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import type { StrictColorScheme, ItemType } from '../../../types';
import type { DividerVariables } from './dividerVariables';
import type { DividerStylesProps } from '../../../../components/Divider/Divider';

const beforeAndAfter = (
  size: number,
  variables: DividerVariables,
  colors: StrictColorScheme<ItemType<typeof dividerColorAreas>>,
  props: DividerStylesProps,
): ICSSInJSStyle => ({
  content: '""',
  flex: 1,
  ...(props.vertical ? { width: `${size + 1}px`, height: '100%' } : { height: `${size + 1}px` }),
  background: _.get(colors, 'foreground', variables.dividerColor),
});

export const dividerStyles: ComponentSlotStylesPrepared<DividerStylesProps, DividerVariables> = {
  root: ({ props, variables }): ICSSInJSStyle => {
    const { color, fitted, size, important, hasContent, vertical } = props;
    const colors = variables.colorScheme[color];
    return {
      color: _.get(colors, 'foreground', variables.textColor),
      display: 'flex',
      alignItems: 'center',
      ...(!fitted && {
        padding: vertical ? `0 ${variables.dividerPadding}` : `${variables.dividerPadding} 0`,
      }),
      ...(important && {
        fontWeight: variables.importantFontWeight,
      }),
      ...(vertical && { height: '100%' }),
      ...(hasContent
        ? {
            textAlign: 'center',
            fontSize: pxToRem(12 + size),
            lineHeight: variables.textLineHeight,
            '::before': {
              ...beforeAndAfter(size, variables, colors, props),
            },
            '::after': {
              ...beforeAndAfter(size, variables, colors, props),
            },
          }
        : {
            '::before': {
              ...beforeAndAfter(size, variables, colors, props),
            },
          }),
    };
  },
};
