import { pxToRem } from '../../../../utils';

export interface BreadcrumbVariables {
  horizontalDividerMargin: string;
}

export const breadcrumbVariables = (): BreadcrumbVariables => ({
  horizontalDividerMargin: `0 ${pxToRem(8)}`,
});
