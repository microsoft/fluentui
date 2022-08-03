import * as React from 'react';
import { makeStyles } from '@griffel/react';
import {
  createDarkTheme,
  createLightTheme,
  webLightTheme,
  Body1,
  Button,
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
} from '@fluentui/react-components';
import { ExportLink } from './ExportLink';
import * as dedent from 'dedent';
import { useContextSelector } from '@fluentui/react-context-selector';
import { AppContext } from '../../ThemeDesigner';
import { ChevronDownRegular } from '@fluentui/react-icons';
import { getBrandValues, objectToString, themeToString } from '../../utils/toString';

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

  const appState = useContextSelector(AppContext, ctx => ctx.appState);
  const { brand, darkOverrides, lightOverrides } = appState;

  const name = useContextSelector(AppContext, ctx => ctx.name);

  const [selectedValue, setSelectedValue] = React.useState<TabValue>('Code');

  const onTabSelect = (event: SelectTabEvent, data: SelectTabData) => {
    setSelectedValue(data.value);
  };

  const codeValue = dedent`
  const ${name}: BrandVariants = { ${objectToString(brand, '\u00A0\u00A0')} };

  const lightTheme: Theme = {
    ...createLightTheme(${name}), ${getBrandValues(brand, lightOverrides, name, '\u00A0\u00A0')} };

  const darkTheme: Theme = {
    ...createDarkTheme(${name}), ${getBrandValues(brand, darkOverrides, name, '\u00A0\u00A0')} };
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
        <PopoverTrigger>
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
