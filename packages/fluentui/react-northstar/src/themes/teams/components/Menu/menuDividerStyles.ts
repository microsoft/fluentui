import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';

import { MenuDividerStylesProps } from '../../../../components/Menu/MenuDivider';
import { getColorScheme } from '../../colors';
import { verticalPillsBottomMargin, horizontalPillsRightMargin, verticalPointingBottomMargin } from './menuItemStyles';
import { MenuVariables } from './menuVariables';

const menuDividerStyles: ComponentSlotStylesPrepared<MenuDividerStylesProps, MenuVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => {
    const colors = getColorScheme(v.colorScheme, null, p.primary);
    const borderColor = p.primary ? v.primaryBorderColor : v.borderColor || colors.border;
    const borderType = p.vertical ? 'borderTop' : 'borderLeft';

    return {
      ...(p.pointing &&
        p.vertical && {
          marginBottom: verticalPointingBottomMargin,
        }),
      ...(p.pills && {
        ...(p.vertical
          ? {
              marginRight: 0,
              marginLeft: verticalPillsBottomMargin,
              marginBottom: '0',
              marginTop: '0',
            }
          : {
              marginRight: '0',
              marginLeft: '0',
              marginBottom: horizontalPillsRightMargin,
              marginTop: '0',
            }),
      }),
      ...(p.hasContent
        ? {
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            textAlign: 'center',
          }
        : {
            [borderType]: `1px solid ${borderColor}`,
            ...(!p.vertical && {
              alignSelf: 'stretch',
            }),
            ...(p.vertical &&
              p.inSubmenu && {
                marginRight: '8px',
                marginLeft: '8px',
                marginBottom: '0',
                marginTop: '0',
              }),
          }),
    };
  },
};

export default menuDividerStyles;
