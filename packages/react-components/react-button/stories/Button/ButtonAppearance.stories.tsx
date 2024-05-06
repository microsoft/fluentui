import * as React from 'react';
import { makeStyles, Button, webLightTheme, Theme, FluentProvider } from '@fluentui/react-components';
import { bundleIcon, CalendarMonthFilled, CalendarMonthRegular } from '@fluentui/react-icons';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

const useStyles = makeStyles({
  wrapper: {
    columnGap: '15px',
    display: 'flex',
  },
});

const customSemanticTokensTheme: Theme = {
  ...webLightTheme,
  ctrlButtonPrimaryBackgroundColorRest: '#005FB8',
  ctrlButtonPrimaryForegroundColorRest: '#FFFFFF',

  ctrlButtonPrimaryBackgroundColorHover: 'rgba(0, 95, 184, 0.90)',
  ctrlButtonPrimaryForegroundColorHover: '#FFFFFF',

  ctrlButtonPrimaryBackgroundColorPressed: '#327EC5',
  ctrlButtonPrimaryForegroundColorPressed: '#C1D8EE',

  ctrlButtonSecondaryBackgroundColorRest: '#FDFDFD',
  ctrlButtonSecondaryBorderColorRest: '#EBEBEB',
  ctrlButtonSecondaryForegroundColorRest: '#1A1A1A',

  ctrlButtonSecondaryBackgroundColorHover: '#F9F9F9',
  ctrlButtonSecondaryBorderColorHover: '#EBEBEB',
  ctrlButtonSecondaryForegroundColorHover: '#1A1A1A',

  ctrlButtonSecondaryBackgroundColorPressed: '#F9F9F9',
  ctrlButtonSecondaryBorderColorPressed: '#EBEBEB',
  ctrlButtonSecondaryForegroundColorPressed: '#626262',

  ctrlButtonOutlineBackgroundColorRest: 'blue',
  ctrlButtonOutlineBackgroundColorHover: 'darkblue',
  ctrlButtonOutlineBackgroundColorPressed: 'cyan',

  ctrlButtonSubtleBackgroundColorRest: 'red',
  ctrlButtonSubtleForegroundColorRest: 'white',

  ctrlButtonSubtleBackgroundColorHover: 'crimson',
  ctrlButtonSubtleForegroundColorHover: 'black',

  ctrlButtonSubtleBackgroundColorPressed: 'brown',
  ctrlButtonSubtleForegroundColorPressed: 'yellow',

  ctrlButtonTransparentBackgroundColorRest: 'green',
  ctrlButtonTransparentForegroundColorRest: 'black',

  ctrlButtonTransparentBackgroundColorHover: 'lime',
  ctrlButtonTransparentForegroundColorHover: 'black',

  ctrlButtonTransparentBackgroundColorPressed: 'olive',
  ctrlButtonTransparentForegroundColorPressed: 'black',
};

export const Appearance = () => {
  const styles = useStyles();

  return (
    <>
      <div className={styles.wrapper}>
        <Button icon={<CalendarMonthRegular />}>Default</Button>
        <Button appearance="primary" icon={<CalendarMonthRegular />}>
          Primary
        </Button>
        <Button appearance="outline" icon={<CalendarMonth />}>
          Outline
        </Button>
        <Button appearance="subtle" icon={<CalendarMonth />}>
          Subtle
        </Button>
        <Button appearance="transparent" icon={<CalendarMonth />}>
          Transparent
        </Button>
      </div>

      <FluentProvider className={styles.wrapper} theme={customSemanticTokensTheme}>
        <Button icon={<CalendarMonthRegular />}>Default</Button>
        <Button appearance="primary" icon={<CalendarMonthRegular />}>
          Primary
        </Button>
        <Button appearance="outline" icon={<CalendarMonth />}>
          Outline
        </Button>
        <Button appearance="subtle" icon={<CalendarMonth />}>
          Subtle
        </Button>
        <Button appearance="transparent" icon={<CalendarMonth />}>
          Transparent
        </Button>
      </FluentProvider>
    </>
  );
};

Appearance.parameters = {
  docs: {
    description: {
      story:
        '- `(undefined)`: the button appears with the default style\n' +
        '- `primary`: emphasizes the button as a primary action.\n' +
        '- `outline`: removes background styling.\n' +
        '- `subtle`: minimizes emphasis to blend into the background until hovered or focused\n' +
        '- `transparent`: removes background and border styling.\n',
    },
  },
};
