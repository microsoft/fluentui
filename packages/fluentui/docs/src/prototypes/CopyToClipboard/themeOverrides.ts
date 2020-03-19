import { ComponentSlotStylesInput, ThemeInput } from '@fluentui/react-northstar';

type ThemeOverrides = ThemeInput & {
  componentStyles: {
    Notification: ComponentSlotStylesInput;
  };
};

const themeOverrides: ThemeOverrides = {
  componentStyles: {
    Notification: {
      root: () => ({
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,

        height: 'unset',
        width: 'unset',

        position: 'static',
        visibility: 'hidden',
        zIndex: 1000,
      }),
      overlay: () => ({
        alignItems: 'center',
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        left: 0,
        overflow: 'auto',
        position: 'fixed',
        right: 0,
        top: 0,
      }),
    },
  },
};

export default themeOverrides;
