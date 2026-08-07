import * as React from 'react';
import dedent from 'dedent';
import type { SelectTabData, SelectTabEvent, TabValue } from '@fluentui/react-components';
import {
  Body1,
  Button,
  FluentProvider,
  Tab,
  TabList,
  Text,
  Textarea,
  tokens,
  webLightThemeClassName,
} from '@fluentui/react-components';
import { createDarkTheme, createLightTheme } from '@fluentui/tokens';
import { DismissSquare24Regular } from '@fluentui/react-icons';
import type { JSXElement } from '@fluentui/react-utilities';

import { getBrandValues, objectToString } from '../../utils/toString';
import { useThemeDesigner } from '../../Context/ThemeDesignerContext';
import { ExportLink } from '../Export/ExportLink';
import styles from './ExportPanel.module.css';

export const ExportPanel = (): JSXElement => {
  const {
    dispatch,
    state: { showExportPanel, themeName, brand, lightThemeOverrides, darkThemeOverrides },
  } = useThemeDesigner();

  const onCloseExportPanel = () => {
    dispatch({ type: 'showExportPanel', payload: false });
  };

  const [selectedValue, setSelectedValue] = React.useState<TabValue>('Code');

  const onTabSelect = (event: SelectTabEvent, data: SelectTabData) => {
    setSelectedValue(data.value);
  };

  const codeValue = dedent`
  // Theme objects are build-time input: create them with @fluentui/tokens, then ship the
  // result as a CSS class containing only custom-property declarations.
  import { createDarkTheme, createLightTheme } from '@fluentui/tokens';
  import type { BrandVariants, Theme } from '@fluentui/tokens';
  import { tokens } from '@fluentui/react-components';

  const ${themeName}: BrandVariants = { ${objectToString(brand, '\u00A0\u00A0')} };

  const lightTheme: Theme = {
    ...createLightTheme(${themeName}), ${getBrandValues(brand, lightThemeOverrides, themeName, '\u00A0\u00A0')} };

  const darkTheme: Theme = {
    ...createDarkTheme(${themeName}), ${getBrandValues(brand, darkThemeOverrides, themeName, '\u00A0\u00A0')} };


  darkTheme.colorBrandForeground1 = ${themeName}[110];
  darkTheme.colorBrandForeground2 = ${themeName}[120];

  // Convert a theme object into a CSS class of custom-property declarations. Each theme key
  // maps to its canonical CSS variable, derived from the corresponding tokens var-string.
  const createThemeClassRule = (className: string, theme: Theme): string => {
    const themeRecord = theme as unknown as Record<string, string | number>;
    const tokenVars = tokens as unknown as Record<string, string>;
    const declarations = Object.keys(themeRecord)
      .map((key) => {
        const match = /^var\\((--[^,)]+)/.exec(tokenVars[key] || '');
        return match ? match[1] + ': ' + themeRecord[key] + ';' : '';
      })
      .filter(Boolean)
      .join(' ');
    return '.' + className + ' { ' + declarations + ' }';
  };

  // Inject the classes once per document (or paste the generated CSS into a stylesheet),
  // then apply them via <FluentProvider themeClassName="${themeName}-light"> or by
  // setting the class on any DOM node to theme that subtree.
  const style = document.createElement('style');
  style.textContent = [
    createThemeClassRule('${themeName}-light', lightTheme),
    createThemeClassRule('${themeName}-dark', darkTheme),
  ].join('\\n');
  document.head.appendChild(style);
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
        <FluentProvider themeClassName={webLightThemeClassName}>
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
              <div className={styles['export-header']}>
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
                This code builds your theme with @fluentui/tokens and converts it into a CSS class of custom-property
                declarations. Passing that class to a FluentProvider via themeClassName (or setting it on any DOM node)
                applies the theme to every Fluent component in that subtree. You can also export this to CodeSandbox
                with a few component examples below.
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
