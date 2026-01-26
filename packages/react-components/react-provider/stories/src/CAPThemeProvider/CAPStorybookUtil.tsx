import * as React from 'react';
import { FluentProvider, makeStyles, teamsLightV21Theme } from '@fluentui/react-components';
import { CAPThemeProvider, CAP_THEME_ONE_DRIVE, CAP_THEME_SHAREPOINT, CAP_THEME_TEAMS } from '@fluentui/react-provider';

export interface CAPThemeExample {
  title: string;
  render(variant: 'v9' | 'cap'): React.ReactElement | 'NOT_IMPLEMENTED';
}

export const CAPThemeExamples = ({ examples }: { examples: CAPThemeExample[] }) => {
  const styles = useCAPThemeExamplesStyles();
  return (
    <FluentProvider>
      <div className={styles.table}>
        <div className={styles.row}>
          <div style={{ fontWeight: 800 }}>Example</div>
          <div style={{ fontWeight: 800 }}>Current</div>
          <div style={{ fontWeight: 800 }}>Visual Refresh (Teams)</div>
          <div style={{ fontWeight: 800 }}>Visual Refresh (OneDrive)</div>
          <div style={{ fontWeight: 800 }}>Visual Refresh (SharePoint)</div>
        </div>
        {examples.map(example => {
          return (
            <div className={styles.row}>
              <div>{example.title}</div>
              <div>{renderExample(example, 'v9')}</div>
              <div>
                <CAPThemeProvider theme={{ ...teamsLightV21Theme, ...CAP_THEME_TEAMS }}>
                  {renderExample(example, 'cap')}
                </CAPThemeProvider>
              </div>
              <div>
                <CAPThemeProvider theme={{ ...CAP_THEME_ONE_DRIVE }}>{renderExample(example, 'cap')}</CAPThemeProvider>
              </div>
              <div>
                <CAPThemeProvider theme={{ ...CAP_THEME_SHAREPOINT }}>{renderExample(example, 'cap')}</CAPThemeProvider>
              </div>
            </div>
          );
        })}
      </div>
    </FluentProvider>
  );
};

function renderExample(example: CAPThemeExample, variant: 'v9' | 'cap') {
  const result = example.render(variant);
  if (result === 'NOT_IMPLEMENTED') {
    return <span style={{ color: 'red' }}>NOT IMPLEMENTED</span>;
  }
  return result;
}

const useCAPThemeExamplesStyles = makeStyles({
  table: {
    display: 'flex',
    flexDirection: 'column',
  },
  row: {
    display: 'flex',
    '& > div': {
      flex: 1,
      padding: '16px',
      border: '1px solid #ddd',
    },
  },
});
