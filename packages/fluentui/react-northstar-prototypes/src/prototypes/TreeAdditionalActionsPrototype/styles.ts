import { pxToRem } from '@fluentui/react-northstar';

export const themeOverrides = {
  componentStyles: {
    PopupContent: {
      root: {
        '& .ui-popup__content__content': {
          padding: 0,
          boxShadow: 'none',
          marginLeft: '-1px',
        },
        '& .ui-button': {
          padding: '0 20px',
        },
        '& .ui-button__content': {
          fontSize: pxToRem(12),
          fontWeight: '600',
          lineHeight: '1.3333',
        },
      },
    },
  },
};
