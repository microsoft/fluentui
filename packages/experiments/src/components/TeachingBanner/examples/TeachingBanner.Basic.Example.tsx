import * as React from 'react';
import { Link, Stack, StackItem, ChoiceGroup, IStackProps, getTheme, IButtonProps } from 'office-ui-fabric-react';
import { TeachingBanner } from '@uifabric/experiments';

interface IExampleProps {
  resetChoice?: () => void;
}

const theme = getTheme();

const longText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
sunt in culpa qui officia deserunt mollit anim id est laborum.`;

const actions: IButtonProps[] = [
  {
    primary: true,
    text: 'Primary'
  },
  {
    text: 'Default'
  }
];

const horizontalStackProps: IStackProps = {
  horizontal: true,
  tokens: { childrenGap: 16 }
};
const verticalStackProps: IStackProps = {
  styles: { root: { overflow: 'hidden', width: '100%' } },
  tokens: { childrenGap: 20 }
};

const choiceGroupStyles = {
  label: {
    maxWidth: 250
  }
};

const DefaultExample = (p: IExampleProps) => (
  <TeachingBanner onDismiss={p.resetChoice}>
    Default MessageBar.{' '}
    <Link href="https://www.bing.com" target="_blank">
      Visit our website.
    </Link>
  </TeachingBanner>
);

const DefaultSingleLineExample = (p: IExampleProps) => (
  <TeachingBanner headline={{ children: 'Default Single Line MessageBar.' }} actions={actions} onDismiss={p.resetChoice}>
    <span>{longText}</span>
  </TeachingBanner>
);

const DefaultMultiLineExample = (p: IExampleProps) => (
  <TeachingBanner actions={actions} headline="Default Multiline MessageBar." multiline={true} onDismiss={p.resetChoice}>
    <p>{longText}</p>
  </TeachingBanner>
);

const PremiumExample = (p: IExampleProps) => (
  <TeachingBanner premium={true} actions={actions} headline="Premium MessageBar." onDismiss={p.resetChoice}>
    <Link href="https://www.bing.com" target="_blank">
      Visit our website.
    </Link>
  </TeachingBanner>
);

const PremiumCustomExample = (p: IExampleProps) => (
  <TeachingBanner
    premium={true}
    scheme={'default'}
    actions={actions}
    iconPremium={'WindowsLogo'}
    tokens={{
      color: theme.palette.neutralDark,
      background: theme.palette.themeLighter
    }}
    headline="Premium Custom MessageBar."
  >
    <Link href="https://www.bing.com" target="_blank">
      Visit our website.
    </Link>
  </TeachingBanner>
);

const RainbowExample = (p: IExampleProps) => (
  <TeachingBanner
    premium={true}
    scheme={'default'}
    actions={actions}
    iconPremium={'Emoji2'}
    headline="Premium Custom Colors MessageBar."
    onDismiss={p.resetChoice}
    tokens={{
      color: 'black',
      background: 'linear-gradient(-20deg, fuchsia, orange, yellow, cyan, violet);'
    }}
    actionPrimaryButton={{
      styles: {
        root: {
          color: 'black',
          background: 'linear-gradient(20deg, fuchsia, orange, yellow);'
        },
        rootHovered: {
          color: 'fuchsia',
          background: 'linear-gradient(20deg, fuchsia, orange, yellow);'
        }
      }
    }}
    actionDefaultButton={{
      styles: {
        root: {
          color: 'black',
          background: 'linear-gradient(-20deg, yellow, cyan, violet);',
          borderColor: 'black'
        },
        rootHovered: {
          color: 'fuchsia'
        }
      }
    }}
    dismissButton={{
      styles: {
        root: {
          color: 'black'
        },
        rootHovered: {
          color: 'white'
        }
      },
      iconProps: {
        iconName: 'EmojiDisappointed'
      }
    }}
    multiline={true}
  >
    <p>{longText}</p>
    <Link href="https://www.bing.com" target="_blank">
      Visit our website.
    </Link>
  </TeachingBanner>
);

const choiceOptions = [
  {
    key: 'default',
    text: 'Default'
  },
  {
    key: 'defaultSingleLine',
    text: 'Default - single line'
  },
  {
    key: 'defaultMultiLine',
    text: 'Default - multiline'
  },
  {
    key: 'premium',
    text: 'Premium'
  },
  {
    key: 'premiumCustom',
    text: 'Custom Colors'
  },
  {
    key: 'rainbow',
    text: 'Custom Rainbow'
  },
  {
    key: 'all',
    text: 'Show All'
  }
];

export const TeachingBannerBasicExample: React.StatelessComponent = () => {
  const [choice, setChoice] = React.useState<string | undefined>(choiceOptions.slice().pop()!.key);
  const showAll = choice === 'all';

  const resetChoice = () => setChoice(undefined);

  return (
    <Stack {...horizontalStackProps}>
      <StackItem disableShrink>
        <ChoiceGroup
          styles={choiceGroupStyles}
          label="Select a Teaching Banner Example Below. To test in narrator, show one message at a time."
          selectedKey={choice}
          // tslint:disable-next-line: jsx-no-lambda
          onChange={(e, v) => setChoice(v!.key)}
          options={choiceOptions}
        />
      </StackItem>
      <Stack {...verticalStackProps}>
        {(choice === 'default' || showAll) && <DefaultExample resetChoice={resetChoice} />}
        {(choice === 'defaultSingleLine' || showAll) && <DefaultSingleLineExample resetChoice={resetChoice} />}
        {(choice === 'defaultMultiLine' || showAll) && <DefaultMultiLineExample resetChoice={resetChoice} />}
        {(choice === 'premium' || showAll) && <PremiumExample resetChoice={resetChoice} />}
        {(choice === 'premiumCustom' || showAll) && <PremiumCustomExample resetChoice={resetChoice} />}
        {(choice === 'rainbow' || showAll) && <RainbowExample resetChoice={resetChoice} />}
      </Stack>
    </Stack>
  );
};
