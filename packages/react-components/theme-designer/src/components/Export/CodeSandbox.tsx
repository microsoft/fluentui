import * as React from 'react';
import { Link, Theme, teamsLightTheme } from '@fluentui/react-components';
import { getParameters } from 'codesandbox-import-utils/lib/api/define';
import * as dedent from 'dedent';

export interface CodeSandboxProps {
  className?: string;
  theme: Theme;
  text: String;
}

export const CodeSandbox: React.FC<CodeSandboxProps> = props => {
  const theme = JSON.stringify(teamsLightTheme);
  console.log(teamsLightTheme);
  const defaultFileToPreview = encodeURIComponent('/example.tsx');
  const codeSandboxParameters = getParameters({
    files: {
      'example.tsx': {
        isBinary: false,
        content: dedent`
          import * as React from 'react';
          import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
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

          export const Column1 = () => {
            const styles = useStyles();
            return (
              <div>
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

          export const Example: React.FC<ContentProps> = props => {
            return (
              <div>
                <Caption1>Examples</Caption1>
                <div>
                  <Column1 />
                </div>
              </div>
            );
          };
        `,
      },
      'index.html': {
        isBinary: false,
        content: '<div id="root"></div>',
      },
      'index.tsx': {
        isBinary: false,
        content: dedent`
          import * as ReactDOM from 'react-dom';
          import { FluentProvider } from '@fluentui/react-components';
          import { Example } from './example';

          const theme = ${theme};

          ReactDOM.render(
              <FluentProvider theme={theme}>
                  <Example />
              </FluentProvider>,
              document.getElementById('root'),
          );
        `,
      },
      'package.json': {
        isBinary: false,
        content: dedent`
          {"dependencies":{"@fluentui/react-components":"rc","react":"^17","react-dom":"^17","react-scripts":"latest"}}
        `,
      },
    },
  });

  console.log(codeSandboxParameters);

  const link = `https://codesandbox.io/api/v1/sandboxes/define?parameters=${codeSandboxParameters}&query=file%3D${defaultFileToPreview}`;

  return (
    <div>
      <Link appearance="subtle" href={link}>
        {props.text}
      </Link>
    </div>
  );
};
