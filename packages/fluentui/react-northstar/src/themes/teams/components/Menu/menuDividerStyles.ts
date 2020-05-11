import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { MenuDividerStylesProps } from '../../../../components/Menu/MenuDivider';
import { MenuVariables } from './menuVariables';
import { getColorScheme } from '../../colors';

const menuDividerStyles: ComponentSlotStylesPrepared<MenuDividerStylesProps, MenuVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => {
    const colors = getColorScheme(v.colorScheme, null, p.primary);
    const borderColor = p.primary ? v.primaryBorderColor : v.borderColor || colors.border;
    const borderType = p.vertical ? 'borderTop' : 'borderLeft';

    return p.hasContent
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
              margin: '8px 0',
            }),
        };
  },
};

export default menuDividerStyles;
