import { IStyleFunction } from 'office-ui-fabric-react/lib/Utilities';
import { IPropertiesTableSetStyleProps, IPropertiesTableSetStyles } from './PropertiesTableSet.types';

export const getStyles: IStyleFunction<IPropertiesTableSetStyleProps, IPropertiesTableSetStyles> = () => {
  return {
    tableRoot: [
      {
        marginBottom: 20,
        overflowX: 'auto',
        overflowY: 'inherit'
      },
      'PropertiesTable'
    ],
    tableHeader: {
      fontSize: '15px'
    }
  };
};
