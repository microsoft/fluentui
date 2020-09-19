import { BreadcrumbLinkStylesProps } from '../../../../components/Breadcrumb/BreadcrumbLink';
import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { getBorderFocusStyles } from '../../getBorderFocusStyles';

export const breadcrumbLinkStyles: ComponentSlotStylesPrepared<BreadcrumbLinkStylesProps, {}> = {
  root: ({ props: p, theme: { siteVariables } }): ICSSInJSStyle => {
    const borderFocusStyles = getBorderFocusStyles({
      variables: siteVariables,
    });
    return {
      position: 'relative',
      ':focus': borderFocusStyles[':focus'],
      ':focus-visible': {
        ...borderFocusStyles[':focus-visible'],
      },
    };
  },
};
