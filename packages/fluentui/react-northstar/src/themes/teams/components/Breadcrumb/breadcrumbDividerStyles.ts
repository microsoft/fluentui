import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { BreadcrumbDividerStylesProps } from '../../../../components/Breadcrumb/BreadcrumbDivider';
import { BreadcrumbVariables } from './breadcrumbVariables';

export const breadcrumbDividerStyles: ComponentSlotStylesPrepared<BreadcrumbDividerStylesProps, BreadcrumbVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => {
    return {
      verticalAlign: 'middle',
    };
  },
};
