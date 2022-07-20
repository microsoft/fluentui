/* eslint-disable react/jsx-no-bind */
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
import { getBrandValues } from './getBrandValues';

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
  const { brand, lightOverrides, darkOverrides } = appState;

  const [selectedValue, setSelectedValue] = React.useState<TabValue>('Code');

  const onTabSelect = (event: SelectTabEvent, data: SelectTabData) => {
    setSelectedValue(data.value);
  };

  const codeValue = dedent`
  const brand = ${JSON.stringify(brand, null, 2)};

  const lightTheme = {
    ...createLightTheme(brand), ${getBrandValues(brand, lightOverrides, '\u00A0\u00A0')}
  };

  const darkTheme = {
    ...createDarkTheme(brand), ${getBrandValues(brand, darkOverrides, '\u00A0\u00A0')}
  };
  `;

  const jsonValue = dedent`
  const lightTheme = ${JSON.stringify(
    {
      ...createLightTheme(brand),
      ...lightOverrides,
    },
    null,
    2,
  )};

  const darkTheme = ${JSON.stringify(
    {
      ...createDarkTheme(brand),
      ...darkOverrides,
    },
    null,
    2,
  )};
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
  }, [selectedValue]);

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
              Applying this theme to a FluentProvider will automatically apply the configured theming to any Fluent
              components used within the app. You can also export this example to CodeSandbox with a few component
              examples below.
            </Body1>
            <br />
            <TabList defaultSelectedValue="Code" selectedValue={selectedValue} onTabSelect={onTabSelect}>
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
