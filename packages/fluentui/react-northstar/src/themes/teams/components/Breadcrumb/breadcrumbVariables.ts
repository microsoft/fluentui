import { pxToRem } from '../../../../utils';

export interface BreadcrumbVariables {
  dividerMargin: string;
}

export const breadcrumbVariables = (): BreadcrumbVariables => ({
  dividerMargin: `0 ${pxToRem(8)}`,
});
