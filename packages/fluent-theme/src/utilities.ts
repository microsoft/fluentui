import { ITheme } from 'office-ui-fabric-react';
import { getNeutralVariant, getSoftVariant, getStrongVariant } from '@uifabric/variants';

export function addVariants(theme: ITheme): void {
  theme.schemes = {
    strong: getStrongVariant(theme),
    soft: getSoftVariant(theme),
    neutral: getNeutralVariant(theme)
  };
}
