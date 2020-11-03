import { ISelectedItemsListStyleProps, ISelectedItemsListStyles } from './SelectedItemsList.types';

export const getStyles = (props: ISelectedItemsListStyleProps): ISelectedItemsListStyles => {
  return {
    copyInput: [
      {
        height: '0px',
        width: '0px',
        border: 'none',
        outline: 'none',
      },
    ],
  };
};
