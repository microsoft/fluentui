import { createTheme, ICustomizations } from 'office-ui-fabric-react';
import { addVariants } from '@uifabric/variants';

export const WordCustomizations: ICustomizations = {
  settings: {
    theme: createTheme({
      palette: {
        themePrimary: '#2b579a',
        themeSecondary: '#366ec2',
      },
      semanticColors: {
        buttonBackground: 'white',
        buttonBackgroundHovered: 'rgb(240, 240, 240)',
        buttonBackgroundPressed: 'rgb(240, 240, 240)',
        buttonText: 'rgb(43, 87, 154)',
        buttonBorder: 'rgb(237, 235, 233)',
      },
    }),
  },

  scopedSettings: {
    Button: {
      /* eslint-disable @typescript-eslint/no-explicit-any */
      tokens: (props: any) => {
        return [
          {
            borderWidth: 1,
            textSize: 13.5,
            textWeight: 600,
            iconSize: 12,
            contentPadding: '0px 6px',
          },
          !props.circular && {
            minHeight: 26,
          },
        ];
      },
    },
  },
};

addVariants(WordCustomizations.settings.theme);
