import { BreadcrumbLinkStylesProps } from '../../../../components/Breadcrumb/BreadcrumbLink';
import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { getBorderFocusStyles } from '../../getBorderFocusStyles';
import { BreadcrumbVariables } from './breadcrumbVariables';

export const breadcrumbLinkStyles: ComponentSlotStylesPrepared<BreadcrumbLinkStylesProps, BreadcrumbVariables> = {
  root: ({ props: p, variables: v, theme: { siteVariables } }): ICSSInJSStyle => {
    const borderFocusStyles = getBorderFocusStyles({
      variables: siteVariables,
      ...(p.size === 'smaller' && {
        borderPadding: {
          top: v.linkPaddingTop,
          right: v.linkPaddingRightSmaller,
          bottom: v.linkPaddingBottom,
          left: v.linkPaddingLeftSmaller,
        },
      }),
      ...(p.size === 'small' && {
        borderPadding: {
          top: v.linkPaddingTop,
          right: v.linkPaddingRightSmall,
          bottom: v.linkPaddingBottom,
          left: v.linkPaddingLeftSmall,
        },
      }),
      ...(p.size === 'medium' && {
        borderPadding: {
          top: v.linkPaddingTop,
          right: v.linkPaddingRightMedium,
          bottom: v.linkPaddingBottom,
          left: v.linkPaddingLeftMedium,
        },
      }),
      ...(p.size === 'large' && {
        borderPadding: {
          top: v.linkPaddingTop,
          right: v.linkPaddingRightLarge,
          bottom: v.linkPaddingBottom,
          left: v.linkPaddingLeftLarge,
        },
      }),
    });

    return {
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      ':visited': {
        color: 'inherit',
      },
      ...borderFocusStyles,

      ...(p.size === 'smaller' && {
        gap: v.linkSmallerGap,
      }),
      ...(p.size === 'small' && {
        gap: v.linkSmallGap,
      }),
      ...(p.size === 'medium' && {
        gap: v.linkMediumGap,
      }),
      ...(p.size === 'large' && {
        gap: v.linkLargeGap,
      }),
    };
  },
};
