import { BreadcrumbItemStylesProps } from '../../../../components/Breadcrumb/BreadcrumbItem';
import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';

export const breadcrumbItemStyles: ComponentSlotStylesPrepared<BreadcrumbItemStylesProps, BreadcrumbVariables> = {
  root: ({ props: p, variables: v, theme: { siteVariables } }): ICSSInJSStyle => {
    return {
      display: 'inline-block',
    };
  },

  breadcrumb: ({ variables: v }) => ({ zIndex: v.breadcrumbZIndex }),
};
