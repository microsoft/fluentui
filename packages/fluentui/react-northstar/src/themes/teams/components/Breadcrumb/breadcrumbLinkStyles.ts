import { BreadcrumbLinkStylesProps } from '../../../../components/Breadcrumb/BreadcrumbLink';
import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { getBorderFocusStyles } from '../../getBorderFocusStyles';
import { BreadcrumbVariables } from './breadcrumbVariables';

export const breadcrumbLinkStyles: ComponentSlotStylesPrepared<BreadcrumbLinkStylesProps, BreadcrumbVariables> = {
  root: ({ props: p, variables: v, theme: { siteVariables } }): ICSSInJSStyle => {
    const borderFocusStyles = getBorderFocusStyles({
      variables: siteVariables,
    });

    return {
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      ':visited': {
        color: 'inherit',
      },
      ':focus': borderFocusStyles[':focus'],
      ':focus-visible': {
        ...borderFocusStyles[':focus-visible'],
      },
      ...(p.size === 'smaller' && {
        paddingLeft: v.linkPaddingLeftSmaller,
        paddingRight: v.linkPaddingLeftSmaller,
        gap: v.linkSmallerGap,
      }),
      ...(p.size === 'small' && {
        paddingLeft: v.linkPaddingLeftSmall,
        paddingRight: v.linkPaddingLeftSmall,
        gap: v.linkSmallGap,
      }),
      ...(p.size === 'medium' && {
        paddingLeft: v.linkPaddingLeftMedium,
        paddingRight: v.linkPaddingLeftMedium,
        gap: v.linkMediumGap,
      }),
      ...(p.size === 'large' && {
        paddingLeft: v.linkPaddingLeftLarge,
        paddingRight: v.linkPaddingRightLarge,
        gap: v.linkLargeGap,
      }),
      ...(p.disabled && {
        color: v.disabledColor,
        pointerEvents: 'none',
      }),
    };
  },
};
