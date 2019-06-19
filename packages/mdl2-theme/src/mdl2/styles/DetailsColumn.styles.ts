import { FontSizes } from '../Mdl2Type';
import { FontWeights } from '@uifabric/styling';
import { IDetailsColumnStyles } from 'office-ui-fabric-react/lib/components/DetailsList/DetailsColumn.types';

export const DetailsColumnStyles = (): Partial<IDetailsColumnStyles> => {
  return {
    cellName: {
      fontWeight: FontWeights.semibold,
      fontSize: FontSizes.size14
    },
    filterChevron: {
      fontSize: FontSizes.size12,
      paddingLeft: 6
    }
  };
};
