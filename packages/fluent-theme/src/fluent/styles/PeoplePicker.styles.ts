import { IPeoplePickerItemSelectedStyleProps, IPeoplePickerItemSelectedStyles } from 'office-ui-fabric-react/lib/Pickers';

export const PeoplePickerItemStyles = (props: IPeoplePickerItemSelectedStyleProps): Partial<IPeoplePickerItemSelectedStyles> => {
  const { selected, theme } = props;
  const { palette } = theme;

  return {
    removeButton: [
      {
        background: 'transparent'
      },
      !selected && {
        color: palette.neutralPrimary
      },
      selected && {
        color: palette.white
      }
    ]
  };
};
