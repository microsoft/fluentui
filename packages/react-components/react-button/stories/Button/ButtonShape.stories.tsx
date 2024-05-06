import * as React from 'react';
import { makeStyles, Button, webLightTheme, Theme, FluentProvider } from '@fluentui/react-components';

const useStyles = makeStyles({
  wrapper: {
    columnGap: '15px',
    display: 'flex',
    minWidth: 'min-content',
  },
});

const customWin11Theme: Theme = {
  ...webLightTheme,
  buttonPrimaryBackgroundColorRest: '#005FB8',
  buttonPrimaryForegroundColorRest: '#FFFFFF',

  buttonPrimaryBackgroundColorHover: 'rgba(0, 95, 184, 0.90)',
  buttonPrimaryForegroundColorHover: '#FFFFFF',

  buttonPrimaryBackgroundColorPressed: '#327EC5',
  buttonPrimaryForegroundColorPressed: '#C1D8EE',

  buttonBackgroundColorRest: '#FDFDFDi',
  buttonBorderColorRest: '#EBEBEB',
  buttonForegroundColorRest: '#1A1A1A',

  buttonBackgroundColorHover: '#F9F9F9',
  buttonBorderColorHover: '#EBEBEB',
  buttonForegroundColorHover: '#1A1A1A',

  buttonBackgroundColorPressed: '#F9F9F9',
  buttonBorderColorPressed: '#EBEBEB',
  buttonForegroundColorPressed: '#626262',
};

export const Shape = () => {
  const styles = useStyles();
  return (
    <>
      <div className={styles.wrapper}>
        <Button>Fluent</Button>
        <Button shape="circular">Circular</Button>
        <Button shape="square">Square</Button>
      </div>
      <FluentProvider className={styles.wrapper} theme={customWin11Theme}>
        <Button appearance="primary">Win11 Primary</Button>
        <Button>Win11 Secondary</Button>
      </FluentProvider>
    </>
  );
};

Shape.parameters = {
  docs: {
    description: {
      story: 'A button can be rounded, circular, or square.',
    },
  },
};
