import { BreadcrumbItemStylesProps } from '../../../../components/Breadcrumb/BreadcrumbItem';
import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';

export const breadcrumbItemStyles: ComponentSlotStylesPrepared<BreadcrumbItemStylesProps, {}> = {
  root: ({ props: p }): ICSSInJSStyle => {
    return {
      display: 'inline-block',
    };
  },
};
