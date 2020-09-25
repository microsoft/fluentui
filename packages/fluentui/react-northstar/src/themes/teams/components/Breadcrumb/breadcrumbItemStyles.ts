import { BreadcrumbItemStylesProps } from '../../../../components/Breadcrumb/BreadcrumbItem';
import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { BreadcrumbVariables } from './breadcrumbVariables';

export const breadcrumbItemStyles: ComponentSlotStylesPrepared<BreadcrumbItemStylesProps, BreadcrumbVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => ({
    display: 'inline-flex',
    alignItems: 'center',
    verticalAlign: 'middle',
    ...(p.active && {
      fontWeight: v.itemCurrentFontWeight,
    }),
    ...(p.disabled && {
      color: v.disabledColor,
    }),
    ...(p.size === 'smaller' && {
      paddingLeft: v.linkPaddingLeftSmaller,
      paddingRight: v.linkPaddingRightSmaller,
      gap: v.linkSmallerGap,
    }),
    ...(p.size === 'small' && {
      paddingLeft: v.linkPaddingLeftSmall,
      paddingRight: v.linkPaddingRightSmall,
      gap: v.linkSmallGap,
    }),
    ...(p.size === 'medium' && {
      paddingLeft: v.linkPaddingLeftMedium,
      paddingRight: v.linkPaddingRightMedium,
      gap: v.linkMediumGap,
    }),
    ...(p.size === 'large' && {
      paddingLeft: v.linkPaddingLeftLarge,
      paddingRight: v.linkPaddingRightLarge,
      gap: v.linkLargeGap,
    }),
  }),
};
