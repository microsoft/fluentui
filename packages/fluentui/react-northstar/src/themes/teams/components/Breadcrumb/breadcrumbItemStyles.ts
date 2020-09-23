import { BreadcrumbItemStylesProps } from '../../../../components/Breadcrumb/BreadcrumbItem';
import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { BreadcrumbVariables } from './breadcrumbVariables';

export const breadcrumbItemStyles: ComponentSlotStylesPrepared<BreadcrumbItemStylesProps, BreadcrumbVariables> = {
  root: (): ICSSInJSStyle => ({
    display: 'inline-flex',
    alignItems: 'center',
    verticalAlign: 'middle',
  }),
};
