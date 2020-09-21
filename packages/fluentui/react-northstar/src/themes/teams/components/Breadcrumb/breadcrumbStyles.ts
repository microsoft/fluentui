import { BreadcrumbStylesProps } from '../../../../components/Breadcrumb/Breadcrumb';
import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { BreadcrumbVariables } from './breadcrumbVariables';

export const breadcrumbStyles: ComponentSlotStylesPrepared<BreadcrumbStylesProps, BreadcrumbVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => ({
    display: 'inline-flex',
    alignItems: 'center',

    ...(p.size === 'smaller' && {
      fontSize: v.fontSizeSmaller,
    }),
    ...(p.size === 'small' && {
      fontSize: v.fontSizeSmall,
    }),
    ...(p.size === 'medium' && {
      fontSize: v.fontSizeMedium,
    }),
    ...(p.size === 'large' && {
      fontSize: v.fontSizeLarge,
    }),
  }),
};
