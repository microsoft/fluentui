import { BreadcrumbLinkStylesProps } from '../../../../components/Breadcrumb/BreadcrumbLink';
import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { getBorderFocusStyles } from '../../getBorderFocusStyles';
import { BreadcrumbVariables } from './breadcrumbVariables';

export const breadcrumbLinkStyles: ComponentSlotStylesPrepared<BreadcrumbLinkStylesProps, BreadcrumbVariables> = {
  root: ({ props: p, variables: v, theme: { siteVariables } }): ICSSInJSStyle => {
    const borderFocusStyles = getBorderFocusStyles({
      variables: siteVariables,
      ...(p.size === 'smaller' && {
        borderPadding: `${v.linkPaddingTop} ${v.linkPaddingRightSmaller} ${v.linkPaddingBottom} ${v.linkPaddingLeftSmaller}`,
      }),
      ...(p.size === 'small' && {
        borderPadding: `${v.linkPaddingTop} ${v.linkPaddingRightSmall} ${v.linkPaddingBottom} ${v.linkPaddingLeftSmall}`,
      }),
      ...(p.size === 'medium' && {
        borderPadding: `${v.linkPaddingTop} ${v.linkPaddingRightMedium} ${v.linkPaddingBottom} ${v.linkPaddingLeftMedium}`,
      }),
      ...(p.size === 'large' && {
        borderPadding: `${v.linkPaddingTop} ${v.linkPaddingRightLarge} ${v.linkPaddingBottom} ${v.linkPaddingLeftLarge}`,
      }),
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
