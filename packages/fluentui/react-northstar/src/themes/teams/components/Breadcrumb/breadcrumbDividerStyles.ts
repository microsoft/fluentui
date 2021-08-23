import type { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import type { BreadcrumbDividerStylesProps } from '../../../../components/Breadcrumb/BreadcrumbDivider';
import type { BreadcrumbVariables } from './breadcrumbVariables';

export const breadcrumbDividerStyles: ComponentSlotStylesPrepared<BreadcrumbDividerStylesProps, BreadcrumbVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => {
    return {
      verticalAlign: 'middle',
    };
  },
};
