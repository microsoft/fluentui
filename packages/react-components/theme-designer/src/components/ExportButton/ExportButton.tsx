import * as React from 'react';
import { makeStyles } from '@griffel/react';
import {
  Body1,
  Button,
  createDarkTheme,
  createLightTheme,
  FluentProvider,
  Popover,
  PopoverSurface,
  PopoverTrigger,
  SelectTabData,
  SelectTabEvent,
  Tab,
  TabList,
  TabValue,
  Text,
  Textarea,
  webLightTheme,
} from '@fluentui/react-components';
import { ExportLink } from './ExportLink';
import * as dedent from 'dedent';
import { ChevronDownRegular } from '@fluentui/react-icons';
import { getBrandValues, objectToString, themeToString } from '../../utils/toString';
import { useThemeDesigner } from '../../Context/ThemeDesignerContext';

const useStyles = makeStyles({
  root: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'flex-end',
    paddingRight: '20px',
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

export const ExportButton = () => {
  const styles = useStyles();

  const {
    state: { brand, darkOverrides, lightOverrides, themeName },
  } = useThemeDesigner();

  const [selectedValue, setSelectedValue] = React.useState<TabValue>('Code');

  const onTabSelect = (event: SelectTabEvent, data: SelectTabData) => {
    setSelectedValue(data.value);
  };

  const codeValue = dedent`
  const ${themeName}: BrandVariants = { ${objectToString(brand, '\u00A0\u00A0')} };

  const lightTheme: Theme = {
    ...createLightTheme(${themeName}), ${getBrandValues(brand, lightOverrides, themeName, '\u00A0\u00A0')} };

  const darkTheme: Theme = {
    ...createDarkTheme(${themeName}), ${getBrandValues(brand, darkOverrides, themeName, '\u00A0\u00A0')} };
  `;

  const jsonValue = dedent`
  const lightTheme: Theme = { ${themeToString({ ...createLightTheme(brand), ...lightOverrides }, '\u00A0\u00A0')} };

  const darkTheme: Theme = { ${themeToString({ ...createDarkTheme(brand), ...darkOverrides }, '\u00A0\u00A0')} };
  `;

  const exportedValue = React.useMemo(() => {
    switch (selectedValue) {
      case 'Code':
        return codeValue;
      case 'JSON':
        return jsonValue;
      default:
        return '';
    }
  }, [codeValue, jsonValue, selectedValue]);

  return (
    <div className={styles.root}>
      <Popover trapFocus={true}>
        <PopoverTrigger disableButtonEnhancement>
          <Button size="small" appearance="outline" icon={<ChevronDownRegular />} iconPosition="after">
            Save
          </Button>
        </PopoverTrigger>
        <FluentProvider theme={webLightTheme}>
          <PopoverSurface aria-labelledby="headingID" className={styles.popover}>
            <Text as="h1" id="headingID" size={500}>
              Export Theme
            </Text>
            <br />
            <br />
            <Body1>
              Passing this theme to a FluentProvider will automatically apply it to any Fluent components below it. You
              can also export this to CodeSandbox with a few component examples below.
            </Body1>
            <br />
            <TabList
              defaultSelectedValue="Code"
              selectedValue={selectedValue}
              onTabSelect={onTabSelect} // eslint-disable-line react/jsx-no-bind
            >
              {' '}
              <Tab value="Code">Code</Tab>
              <Tab value="JSON">JSON</Tab>
              <Tab value="Swift" disabled>
                Swift
              </Tab>
              <Tab value="KT" disabled>
                KT
              </Tab>
              <Tab value="XAML" disabled>
                XAML
              </Tab>
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
          </PopoverSurface>
        </FluentProvider>
      </Popover>
    </div>
  );
};
