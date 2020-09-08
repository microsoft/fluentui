import { pxToRem } from '../../../../utils';

export interface BreadcrumbVariables {
  horizontalDividerMargin: string;
}

export const breadcrumbVariables = (): BreadcrumbVariables => ({
  dividerMargin: `0 ${pxToRem(8)}`,
});
