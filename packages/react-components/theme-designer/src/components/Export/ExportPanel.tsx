import * as React from 'react';
import * as dedent from 'dedent';
import { makeStyles } from '@griffel/react';
import {
  Body1,
  Button,
  createLightTheme,
  createDarkTheme,
  FluentProvider,
  SelectTabData,
  SelectTabEvent,
  Tab,
  TabList,
  TabValue,
  Text,
  Textarea,
  tokens,
  webLightTheme,
} from '@fluentui/react-components';
import { DismissSquare24Regular } from '@fluentui/react-icons';

import { getBrandValues, objectToString } from '../../utils/toString';
import { useThemeDesigner } from '../../Context/ThemeDesignerContext';
import { ExportLink } from '../Export/ExportLink';

const useStyles = makeStyles({
  root: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'flex-end',
    paddingRight: '20px',
  },
  exportHeader: {
    display: 'grid',
    gridTemplateColumns: '350px 50px',
    alignItems: 'center',
  },
  popover: {
    width: '300px',
  },
  text: {
    display: 'flex',
    height: '50vh',
  },
  textarea: {
    height: '100%',
    boxSizing: 'border-box',
  },
});

export const ExportPanel = () => {
  const {
    dispatch,
    state: { showExportPanel, themeName, brand, lightThemeOverrides, darkThemeOverrides },
  } = useThemeDesigner();

  const onCloseExportPanel = () => {
    dispatch({ type: 'showExportPanel', payload: false });
  };

  const styles = useStyles();

  const [selectedValue, setSelectedValue] = React.useState<TabValue>('Code');

  const onTabSelect = (event: SelectTabEvent, data: SelectTabData) => {
    setSelectedValue(data.value);
  };

  const codeValue = dedent`
  const ${themeName}: BrandVariants = { ${objectToString(brand, '\u00A0\u00A0')} };

  const lightTheme: Theme = {
    ...createLightTheme(${themeName}), ${getBrandValues(brand, lightThemeOverrides, themeName, '\u00A0\u00A0')} };

  const darkTheme: Theme = {
    ...createDarkTheme(${themeName}), ${getBrandValues(brand, darkThemeOverrides, themeName, '\u00A0\u00A0')} };
  

  darkTheme.colorBrandForeground1 = ${themeName}[110];
  darkTheme.colorBrandForeground2 = ${themeName}[120];
  `;

  const jsonLightValue = dedent`
   ${JSON.stringify({ ...createLightTheme(brand), ...lightThemeOverrides }, null, '\t')}`;

  const jsonDarkValue = dedent`
     ${JSON.stringify(
       {
         ...createDarkTheme(brand),
         ...{ colorBrandForeground1: brand[110], colorBrandForeground2: brand[120] },
         ...darkThemeOverrides,
       },
       null,
       '\t',
     )} 
  `;

  const exportedValue = React.useMemo(() => {
    switch (selectedValue) {
      case 'Code':
        return codeValue;
      case 'JSONLight':
        return jsonLightValue;
      case 'JSONDark':
        return jsonDarkValue;
      default:
        return '';
    }
  }, [codeValue, jsonLightValue, jsonDarkValue, selectedValue]);

  const onClickCopyToClipboard = () => {
    navigator.clipboard.writeText(exportedValue);
  };

  return (
    <>
      {showExportPanel && (
        <FluentProvider theme={webLightTheme}>
          <div
            style={{
              zIndex: 100,
              position: 'absolute',
              top: '0px',
              right: '0px',
              width: '400px',
              border: `1px solid ${tokens.colorNeutralStroke1}`,
              borderRadius: tokens.borderRadiusXLarge,
              backgroundColor: tokens.colorNeutralBackground1,
              boxShadow: tokens.shadow64,
            }}
          >
            <div style={{ margin: '16px' }}>
              <div className={styles.exportHeader}>
                <Text as="h1" id="headingID" size={500}>
                  Export Theme
                </Text>
                <Button
                  size="small"
                  appearance="subtle"
                  icon={<DismissSquare24Regular />}
                  // eslint-disable-next-line react/jsx-no-bind
                  onClick={onCloseExportPanel}
                />
              </div>

              <br />
              <Body1>
                Passing this theme to a FluentProvider will automatically apply it to any Fluent components below it.
                You can also export this to CodeSandbox with a few component examples below.
              </Body1>
              <br />
              <TabList
                defaultSelectedValue="Code"
                selectedValue={selectedValue}
                onTabSelect={onTabSelect} // eslint-disable-line react/jsx-no-bind
              >
                <Tab value="Code">Code</Tab>
                <Tab value="JSONLight">JSON (light)</Tab>
                <Tab value="JSONDark">JSON (dark)</Tab>
              </TabList>
              <Textarea
                className={styles.text}
                size="small"
                value={exportedValue}
                id={'textArea'}
                textarea={{ className: styles.textarea }}
                readOnly
              />
              <br />
              <ExportLink />
              <br />
              <Button
                appearance="primary"
                // eslint-disable-next-line react/jsx-no-bind
                onClick={onClickCopyToClipboard}
              >
                Copy to clipboard
              </Button>
            </div>
          </div>
        </FluentProvider>
      )}
    </>
  );
};
