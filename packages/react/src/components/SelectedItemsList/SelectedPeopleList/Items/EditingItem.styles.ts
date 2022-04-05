import { getGlobalClassNames, getTheme } from '../../../../Styling';
import type { IEditingSelectedPeopleItemStyles, IEditingSelectedPeopleItemStylesProps } from './EditingItem.types';

const GlobalClassNames = {
  root: 'ms-EditingItem',
  input: 'ms-EditingItem-input',
};

export const getStyles = (prop: IEditingSelectedPeopleItemStylesProps): IEditingSelectedPeopleItemStyles => {
  const theme = getTheme();

  if (!theme) {
    throw new Error('theme is undefined or null in Editing item getStyles function.');
  }

  const { semanticColors } = theme;
  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  return {
    root: [
      classNames.root,
      {
        margin: '4px',
      },
    ],
    input: [
      classNames.input,
      {
        border: '0px',
        outline: 'none',
        width: '100%',
        backgroundColor: semanticColors.inputBackground,
        color: semanticColors.inputText,
        selectors: {
          '::-ms-clear': {
            display: 'none',
          },
        },
      },
    ],
  };
};
