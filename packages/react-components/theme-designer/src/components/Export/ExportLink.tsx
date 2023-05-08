import * as React from 'react';
import { Link } from '@fluentui/react-components';
import { getParameters } from 'codesandbox-import-utils/lib/api/define';
import * as dedent from 'dedent';
import { getBrandValues, objectToString } from '../../utils/toString';
import { useThemeDesigner } from '../../Context/ThemeDesignerContext';
const defaultFileToPreview = encodeURIComponent('/index.tsx');

export const ExportLink = () => {
  const {
    state: { themeName, brand, darkThemeOverrides, lightThemeOverrides },
  } = useThemeDesigner();

  const content = dedent`
  import * as React from "react";
  import {
    makeStaticStyles,
    makeStyles,
    shorthands,
    tokens,
    Avatar,
    Badge,
    Body1,
    Button,
    Caption1,
    Caption2,
    Checkbox,
    FluentProvider,
    Input,
    Menu,
    MenuButton,
    MenuItemCheckbox,
    MenuList,
    MenuPopover,
    MenuTrigger,
    Radio,
    RadioGroup,
    Slider,
    Switch,
    Tab,
    TabList,
    Title3,
    useId,
    Dropdown, 
    Option 
  } from "@fluentui/react-components";
  import type { Theme } from "@fluentui/react-components";
  import {
    bundleIcon,
    CalendarLtrFilled,
    CalendarLtrRegular,
    ChevronRightRegular,
    MeetNowFilled,
    MeetNowRegular,
    SearchRegular,
  } from "@fluentui/react-icons";

  export interface ContentProps {
    lightTheme: Theme;
    darkTheme: Theme;
  }

  const useStaticStyles = makeStaticStyles({
    body: {
      position: "fixed",
      margin: "0px",
      top: "0px",
      left: "0px",
      height: "100vh"
    }
  });

  const useStyles = makeStyles({
    root: {
      display: "grid",
      gridTemplateRows: "50vh 50vh"
    },
    row: {
      height: "50vh",
      display: "grid",
      alignItems: "start",
      justifyContent: "center",
      gridTemplateColumns: "repeat(3, 1fr)",
      gridTemplateRows: "auto",
      gridColumnGap: tokens.spacingHorizontalXXXL
    },
    col2: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      ...shorthands.gap(tokens.spacingVerticalL),
    },
    col3: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gridTemplateRows: 'repeat(4, auto)',
      gridRowGap: tokens.spacingVerticalS,
      gridColumnGap: tokens.spacingHorizontalS,
      justifyContent: 'center',
      alignItems: 'center',
    },
    twoCol: {
      gridColumnStart: 1,
      gridColumnEnd: 3,
    },
    controls: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    icons: {
      display: 'grid',
      gridTemplateColumns: 'auto auto',
      gridTemplateRows: 'auto auto',
      gridRowGap: tokens.spacingVerticalS,
      gridColumnGap: tokens.spacingHorizontalS,
      justifyContent: 'center',
    },
    avatar: {
      display: 'flex',
      ...shorthands.gap(tokens.spacingVerticalL),
    },
    avatarText: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'left',
    },
  });

  export const Column1 = () => {
    const styles = useStyles();
    return (
      <div className={styles.col1}>
        <Title3 block>Make an impression</Title3>
        <Body1 block>
          Make a big impression with this clean, modern, and mobile-friendly site. Use it to communicate information to
          people inside or outside your team. Share your ideas, results, and more in this visually compelling format.
        </Body1>
        <div className={styles.avatar}>
          <Avatar
            color="brand"
            initials="CE"
            badge={{
              status: 'available',
              'aria-label': 'available',
            }}
          />
          <div className={styles.avatarText}>
            Cameron Evans
            <Caption2>Senior Researcher at Contoso</Caption2>
          </div>
        </div>
      </div>
    );
  };

  export const DemoMenu = () => {
    const CutIcon = bundleIcon(CutFilled, CutRegular);
    const PasteIcon = bundleIcon(ClipboardPasteFilled, ClipboardPasteRegular);
    const EditIcon = bundleIcon(EditFilled, EditRegular);
    return (
      <Menu>
        <MenuTrigger disableButtonEnhancement>
          <MenuButton>Select </MenuButton>
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            <MenuItemCheckbox icon={<CutIcon />} name="edit" value="cut">
              Cut
            </MenuItemCheckbox>
            <MenuItemCheckbox icon={<PasteIcon />} name="edit" value="paste">
              Paste
            </MenuItemCheckbox>
            <MenuItemCheckbox icon={<EditIcon />} name="edit" value="edit">
              Edit
            </MenuItemCheckbox>
          </MenuList>
        </MenuPopover>
      </Menu>
    );
  };

  export const Column2 = () => {
    const styles = useStyles();
    const dropdownId = useId('dropdown-default');
    return (
      <div className={styles.col2}>
        <TabList defaultSelectedValue="tab1">
          <Tab value="tab1">Home</Tab>
          <Tab value="tab2">Pages</Tab>
          <Tab value="tab3">Documents</Tab>
        </TabList>
        <Input
          placeholder="Find"
          contentAfter={<Button aria-label="Find" appearance="transparent" icon={<SearchRegular />} size="small" />}
        />
        <Dropdown aria-labelledby={dropdownId} placeholder="Select" inlinePopup>
          <Option value="Action 1">Action 1</Option>
          <Option value="Action 2">Action 2 </Option>
          <Option value="Action 3">Action 3</Option>
        </Dropdown>
      </div>
    );
  };

  export const DemoIcons = () => {
    const styles = useStyles();
    const MeetNowIcon = bundleIcon(MeetNowFilled, MeetNowRegular);
    const CalendarLtrIcon = bundleIcon(CalendarLtrFilled, CalendarLtrRegular);
    return (
      <div className={styles.icons}>
        <Badge size="medium" appearance="filled" icon={<CalendarLtrIcon />} />
        <Badge size="medium" appearance="ghost" icon={<CalendarLtrIcon />} />
        <Badge size="medium" appearance="outline" icon={<MeetNowIcon />} />
        <Badge size="medium" appearance="tint" icon={<MeetNowIcon />} />
      </div>
    );
  };

  export const Column3 = () => {
    const styles = useStyles();
    return (
      <div className={styles.col3}>
        <Button appearance="primary">Sign Up</Button>
        <Button
          appearance="transparent"
          icon={<ChevronRightRegular />}
          iconPosition="after"
        >
          Learn More
        </Button>
        <Slider className={styles.twoCol} defaultValue={50} />
        <DemoIcons />
        <div className={styles.controls}>
          <Switch defaultChecked={true} label="On" />
          <Switch label="Off" />
        </div>
        <div className={styles.controls}>
          <Checkbox defaultChecked={true} label="Option 1" />
          <Checkbox label="Option 2" />
        </div>
        <div className={styles.controls}>
          <RadioGroup>
            <Radio defaultChecked={true} label="Option 1" />
            <Radio label="Option 2" />
          </RadioGroup>
        </div>
      </div>
    );
  };

  export const Example: React.FC<ContentProps> = (props) => {
    const styles = useStyles();
    useStaticStyles();
    return (
      <div className={styles.root}>
        <FluentProvider theme={props.lightTheme}>
          <Caption1>Light Theme</Caption1>
          <div className={styles.row}>
            <Column1 />
            <Column2 />
            <Column3 />
          </div>
        </FluentProvider>
        <FluentProvider theme={props.darkTheme}>
          <Caption1>Dark Theme</Caption1>
          <div className={styles.row}>
            <Column1 />
            <Column2 />
            <Column3 />
          </div>
        </FluentProvider>
      </div>
    );
  };
  `;

  const indexHtmlContent = '<div id="root"></div>';

  const createIndexContent = dedent`
  import * as ReactDOM from 'react-dom';
  import { createDarkTheme, createLightTheme } from '@fluentui/react-components';

  import type { BrandVariants, Theme } from '@fluentui/react-components';
  import { Example } from './example';

  const ${themeName}: BrandVariants = { ${objectToString(brand, '\u00A0\u00A0')} };

  const lightTheme: Theme = {
    ...createLightTheme(${themeName}), ${getBrandValues(brand, lightThemeOverrides, themeName, '\u00A0\u00A0')} };

  const darkTheme: Theme = {
    ...createDarkTheme(${themeName}), ${getBrandValues(brand, darkThemeOverrides, themeName, '\u00A0\u00A0')} };

  darkTheme.colorBrandForeground1 = ${themeName}[110]; // use brand[110] instead of brand[100]
  darkTheme.colorBrandForeground2 = ${themeName}[120]; // use brand[120] instead of brand[110]

  ReactDOM.render(
    <Example lightTheme={lightTheme} darkTheme={darkTheme} />,
    document.getElementById('root'),
  );
  `;

  const packageContent = dedent`
  {"dependencies":{"@fluentui/react-components":"^9","react":"^17","react-dom":"^17","react-scripts":"latest"}}
  `;

  const link = React.useMemo(() => {
    const codeSandboxParameters = getParameters({
      files: {
        'example.tsx': {
          isBinary: false,
          content,
        },
        'index.html': {
          isBinary: false,
          content: indexHtmlContent,
        },
        'index.tsx': {
          isBinary: false,
          content: createIndexContent,
        },
        'package.json': {
          isBinary: false,
          content: packageContent,
        },
      },
    });

    return `https://codesandbox.io/api/v1/sandboxes/define?parameters=${codeSandboxParameters}&query=file%3D${defaultFileToPreview}`;
  }, [content, createIndexContent, packageContent]);

  return (
    <div>
      <Link href={link} target="_blank">
        Preview theme in CodeSandbox
      </Link>
    </div>
  );
};
