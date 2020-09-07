import { pxToRem } from '../../../../utils';
import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { BreadcrumbDividerStylesProps } from '../../../../components/Breadcrumb/BreadcrumbDivider';

export const breadcrumbDividerStyles: ComponentSlotStylesPrepared<BreadcrumbDividerStylesProps, {}> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => {
    return {
      margin: `0 ${pxToRem(8)}`,
    };
  },
};
