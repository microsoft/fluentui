import {
  IPeoplePickerItemSelectedStyleProps,
  IPeoplePickerItemSelectedStyles,
} from 'office-ui-fabric-react/lib/Pickers';

export const PeoplePickerItemStyles = (
  props: IPeoplePickerItemSelectedStyleProps,
): Partial<IPeoplePickerItemSelectedStyles> => {
  const { selected, theme } = props;
  const { palette } = theme;

  return {
    removeButton: [
      {
        background: 'transparent',
        selectors: {
          ':active': {
            color: palette.white,
            backgroundColor: palette.themeDark,
          },
        },
      },
      !selected && {
        color: palette.neutralPrimary,
      },
      selected && {
        color: palette.white,
      },
    ],
  };
};
