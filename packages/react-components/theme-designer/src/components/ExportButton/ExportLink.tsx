import * as React from 'react';
import { Link, BrandVariants, Theme } from '@fluentui/react-components';
import { getParameters } from 'codesandbox-import-utils/lib/api/define';
import * as dedent from 'dedent';

export interface ExportLinkProps {
  brand: BrandVariants;
  isDark: boolean;
  overrides: Partial<Theme>;
}

const defaultFileToPreview = encodeURIComponent('/index.tsx');

export const ExportLink: React.FC<ExportLinkProps> = props => {
  const { brand, isDark, overrides } = props;

  const content = dedent`
    import * as React from 'react';
    import { makeStyles, makeStaticStyles, mergeClasses, shorthands } from '@griffel/react';
    import {
      tokens,
      Body1,
      Title3,
      TabList,
      Tab,
      Input,
      Button,
      Caption1,
      Menu,
      MenuTrigger,
      MenuList,
      MenuButton,
      MenuItemCheckbox,
      MenuPopover,
      Slider,
      Badge,
      Switch,
      Radio,
      RadioGroup,
      Checkbox,
      Avatar,
      Theme,
    } from '@fluentui/react-components';
    import {
      SearchRegular,
      bundleIcon,
      CutRegular,
      CutFilled,
      ClipboardPasteRegular,
      ClipboardPasteFilled,
      EditRegular,
      EditFilled,
      ChevronRightRegular,
      MeetNowRegular,
      MeetNowFilled,
      CalendarLtrFilled,
      CalendarLtrRegular,
    } from '@fluentui/react-icons';

    export interface ContentProps {
      className?: string;
      theme: Theme;
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
        height: "100vh",
        display: 'grid',
        alignItems: 'start',
        justifyContent: 'center',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridTemplateRows: 'auto',
        gridColumnGap: tokens.spacingHorizontalXXXL,
      },
      col1: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'left',
        flexDirection: 'column',
        flexGrow: 1,
        ...shorthands.gap(tokens.spacingVerticalL),
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
      icons: {
        display: 'grid',
        gridTemplateColumns: 'auto auto',
        gridTemplateRows: 'auto auto',
        gridRowGap: tokens.spacingVerticalS,
        gridColumnGap: tokens.spacingHorizontalS,
        justifyContent: 'center',
      },
      twoRow: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      },
    });

    export const Column1 = () => {
      const styles = useStyles();
      useStaticStyles();
      return (
        <div className={styles.col1}>
          <Title3 block>Make an impression</Title3>
          <Body1 block>
            Make a big impression with this clean, modern, and mobile-friendly site. Use it to communicate
            information to people inside or outside your team. Share your ideas, results, and more in this
            visually compelling format.
          </Body1>
          <Avatar
            color="brand"
            initials="DF"
            badge={{
              status: 'available',
              'aria-label': 'available',
            }}
          />
        </div>
      );
    };

    export const DemoMenu = () => {
      const CutIcon = bundleIcon(CutFilled, CutRegular);
      const PasteIcon = bundleIcon(ClipboardPasteFilled, ClipboardPasteRegular);
      const EditIcon = bundleIcon(EditFilled, EditRegular);
      return (
        <Menu>
          <MenuTrigger>
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
      return (
        <div className={styles.col2}>
          <TabList defaultSelectedValue="tab1">
            <Tab value="tab1">Home</Tab>
            <Tab value="tab2">Pages</Tab>
            <Tab value="tab3">Documents</Tab>
          </TabList>
          <Input
            placeholder="Find"
            contentAfter={
              <Button aria-label="Find" appearance="transparent" icon={<SearchRegular />} size="small" />
            }
          />
          <DemoMenu />
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
          <Button appearance="transparent" icon={<ChevronRightRegular />} iconPosition="after">
            Learn More
          </Button>
          <Slider className={styles.twoCol} defaultValue={20} />
          <DemoIcons />
          <div className={styles.twoRow}>
            <Switch defaultChecked={true} label="On" />
            <Switch label="Off" />
          </div>
          <div className={styles.twoRow}>
            <Checkbox defaultChecked={true} label="Option 1" />
            <Checkbox label="Option 2" />
          </div>
          <div className={styles.twoRow}>
            <RadioGroup>
              <Radio defaultChecked={true} label="Option 1" />
              <Radio label="Option 2" />
            </RadioGroup>
          </div>
        </div>
      );
    };

    export const Example: React.FC<ContentProps> = props => {
      const styles = useStyles();
      return (
        <div>
          <Caption1>Examples</Caption1>
          <div className={mergeClasses(styles.root, props.className)}>
            <Column1 />
            <Column2 />
            <Column3 />
          </div>
        </div>
      );
    };
    `;

  const indexHtmlContent = '<div id="root"></div>';

  const createIndexContent = dedent`
    import * as ReactDOM from 'react-dom';
    import { FluentProvider, ${isDark ? 'createDarkTheme' : 'createLightTheme'} } from '@fluentui/react-components';
    import type { BrandVariants, Theme } from '@fluentui/react-theme';
    import { Example } from './example';

    const brand: BrandVariants = ${JSON.stringify(brand)};

    const overrides: Partial<Theme> = ${JSON.stringify(overrides)};

    const theme: Theme = { ...${isDark ? 'createDarkTheme' : 'createLightTheme'}(brand), ...overrides };

    ReactDOM.render(
        <FluentProvider theme={theme}>
            <Example />
        </FluentProvider>,
        document.getElementById('root'),
    );
  `;

  const packageContent = dedent`
    {"dependencies":{"@fluentui/react-components":"rc","react":"^17","react-dom":"^17","react-scripts":"latest"}}
    `;

  const link = React.useMemo(() => {
    const codeSandboxParameters = getParameters({
      files: {
        'example.tsx': {
          isBinary: false,
          content: content,
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
      <Link appearance="subtle" href={link} target="_blank">
        Preview theme in CodeSandbox
      </Link>
    </div>
  );
};
