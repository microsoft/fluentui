import { IColorPickerStyleProps, IColorPickerStyles } from './ColorPicker.types';

export const getStyles = (props: IColorPickerStyleProps): IColorPickerStyles => {
  const { className, theme } = props;

  return {
    root: [
      'ms-ColorPicker',
      theme.fonts.medium,
      {
        position: 'relative',
        maxWidth: 300
      },
      className
    ],
    panel: [
      'ms-ColorPicker-panel',
      {
        padding: '16px'
      }
    ],
    table: [
      'ms-ColorPicker-table',
      {
        tableLayout: 'fixed',
        width: '100%'
      }
    ],
    tableHeader: [
      {
        ...theme.fonts.small
      }
    ],
    tableHexCell: [
      {
        width: '25%'
      }
    ],
    input: [
      'ms-ColorPicker-input',
      {
        width: '100%',
        border: 'none',
        boxSizing: 'border-box',
        height: 30,
        selectors: {
          '&.ms-TextField': {
            paddingRight: 2
          },
          '& .ms-TextField-field': {
            minWidth: 'auto',
            padding: 5,
            textOverflow: 'clip'
          }
        }
      }
    ]
  };
};
