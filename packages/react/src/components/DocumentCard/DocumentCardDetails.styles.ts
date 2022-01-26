import { getGlobalClassNames } from '../../Styling';
import type { IDocumentCardStatusStyleProps, IDocumentCardStatusStyles } from './DocumentCardStatus.types';

const GlobalClassNames = {
  root: 'ms-DocumentCardDetails',
};

export const getStyles = (props: IDocumentCardStatusStyleProps): IDocumentCardStatusStyles => {
  const { className, theme } = props;

  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  return {
    root: [
      classNames.root,
      {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'space-between',
        overflow: 'hidden',
      },
      className,
    ],
  };
};
