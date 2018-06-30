import { IDetailsRowStyleProps, IDetailsRowStyles, IDetailsRowProps } from './DetailsRow.types';
import { getGlobalClassNames } from '../../Styling';

const GlobalClassNames = {
  root: 'ms-DetailsRow'
};

export { IDetailsRowProps };

export const getStyles = (props: IDetailsRowStyleProps): IDetailsRowStyles => {
  const { theme } = props;
  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  return {
    root: [classNames.root]
  };
};
