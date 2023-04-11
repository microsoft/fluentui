import { ComponentSlotStylesPrepared } from '@fluentui/styles';
import { checkboxSlotClassNames, CheckboxStylesProps } from '../../../../components/Checkbox/Checkbox';
import { CheckboxVariables } from '../../../teams/components/Checkbox/checkboxVariables';

export const checkboxStyles: ComponentSlotStylesPrepared<CheckboxStylesProps, CheckboxVariables> = {
  root: ({ props: p }) => ({
    ':hover': {
      [`& .${checkboxSlotClassNames.indicator}`]: {
        ...(p.toggle &&
          p.checked && {
            background: 'Highlight',
            ':before': {
              color: 'Canvas',
            },
          }),
      },
    },
  }),

  toggle: ({ props: p }) => ({
    ...(p.checked && {
      backgroundColor: 'Highlight',
    }),
    ':before': {
      background: 'Canvas',
      border: '0.1rem solid transparent',
    },
    ...(p.checked && {
      background: 'Highlight',
      borderColor: 'Highlight',
      ':before': {
        borderColor: 'Canvas',
      },
    }),
  }),
};
