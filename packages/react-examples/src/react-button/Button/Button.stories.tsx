import * as React from 'react';
import { Button, ButtonProps, ButtonTokens, ButtonVariants } from '@fluentui/react-button';
import { PartialTheme, ThemeProvider } from '@fluentui/react-theme-provider';
import * as classes from '../Button.stories.scss';

/**
 * Temporary Stack until there's one in its own package.
 */
const Stack = (props: React.PropsWithChildren<{ horizontal?: boolean }>) => {
  const { horizontal, ...rest } = props;

  return <div {...rest} className={horizontal ? classes.hStack : classes.vStack} />;
};

/**
 * Temporary Text until there's one in its own package.
 */
// eslint-disable-next-line jsx-a11y/heading-has-content -- content passed via children
const Text = (props: React.PropsWithChildren<{}>) => <h2 {...props} className={classes.text} />;

const ButtonExamples = (props: ButtonProps) => (
  <Stack horizontal>
    <Button {...props} icon="O">
      Hello, world
    </Button>
    <Button {...props} disabled icon="X">
      Hello, world
    </Button>
    <Button {...props} primary icon="X">
      Hello, world
    </Button>
    <Button {...props} primary disabled icon="X">
      Hello, world
    </Button>
    <Button {...props} ghost icon="X">
      Hello, world
    </Button>
    <Button {...props} ghost disabled icon="X">
      Hello, world
    </Button>
  </Stack>
);

export const Buttons = () => (
  <Stack>
    <Text>A button comes in default and `primary` flavors.</Text>
    <ButtonExamples />

    <Text>A button can appear round using the `circular` prop.</Text>
    <ButtonExamples circular />

    <Text>A button can fill the width of its container using the `fluid` prop.</Text>
    <ButtonExamples fluid />

    <Text>A button can contain only an icon using the `iconOnly` prop.</Text>
    <ButtonExamples iconOnly />

    <Text>A button can be both `circular` and `iconOnly`.</Text>
    <ButtonExamples circular iconOnly />

    <Text>An icon button can format its Icon to appear before or after its content.</Text>
    <Stack>
      <ButtonExamples iconPosition="before" />
      <ButtonExamples iconPosition="after" />
    </Stack>

    <Text>A button can show a loading indicator using the `loading` prop.</Text>
    <ButtonExamples loading />

    <Text>A button can be sized.</Text>
    <Stack>
      <ButtonExamples size="smallest" />
      <ButtonExamples size="smaller" />
      <ButtonExamples size="small" />
      <ButtonExamples size="large" />
      <ButtonExamples size="larger" />
      <ButtonExamples size="largest" />
    </Stack>
  </Stack>
);

const githubTokens: ButtonTokens = {
  paddingLeft: '10px',
  paddingRight: '10px',
  paddingTop: '3px',
  paddingBottom: '3px',
  fontSize: '12px',
  fontWeight: '600',
  contentGap: '8px',
  borderRadius: '4px',
  borderWidth: '1px',
  background: 'linear-gradient(-180deg,#34d058,#28a745 90%)',
  contentColor: 'white',
  borderColor: 'rgba(27, 31, 35, 0.2)',

  hovered: {
    background: '#269f42 linear-gradient(-180deg,#2fcb53,#269f42 90%)',
    contentColor: 'white',
    borderColor: 'rgba(27, 31, 35, .5)',
  },

  pressed: {
    background: '#279f43',
    borderColor: 'rgba(27, 31, 35, .5)',
    contentColor: 'white',
    transform: 'none',
  },
};

const amazonTokens = {
  fontFamily: `"Amazon Ember", Arial, sans-serif`,
  fontSize: '13px',
  fontWeight: '400',
  borderRadius: '3px',
  padding: '0 10px',

  background: 'linear-gradient(to bottom,#f7dfa5,#f0c14b)',
  contentColor: 'rgb(17, 17, 17)',
  borderColor: 'rgb(168, 135, 52) rgb(156, 126, 49) rgb(132, 106, 41)',

  hovered: {
    background: 'linear-gradient(to bottom,#f5d78e,#eeb933)',
    contentColor: 'rgb(17, 17, 17)',
    borderColor: '#a88734 #9c7e31 #846a29',
  },

  pressed: {
    background: '#f0c14b',
    contentColor: 'rgb(17, 17, 17)',
    borderColor: '#a88734 #9c7e31 #846a29',
  },
};

const netflixTokens = {
  borderWidth: '0px',
  padding: '7px 17px',
  borderRadius: '3px',
  fontFamily: '"Netflix Sans", "Helvetica Neue", Helvetica, Arial, sans-serif',
  fontSize: '16px',
  fontWeight: '400',

  background: 'rgb(229, 9, 20)',
  contentColor: 'rgb(255, 255, 255)',
  borderColor: 'rgb(255, 255, 255)',

  hovered: {
    background: 'rgb(255, 50, 61)',
    contentColor: 'rgb(255, 255, 255)',
    borderColor: '#a88734 #9c7e31 #846a29',
  },

  pressed: {
    background: 'rgb(229, 9, 20)',
    borderColor: '#a88734 #9c7e31 #846a29',
  },
};

const spotifyPrimaryTokens = {
  height: '48px',
  borderWidth: '0px',
  padding: '17px 48px',
  borderRadius: '500px',
  fontFamily: 'Circular, Helvetica, Arial, sans-serif',
  fontSize: '14px',
  fontWeight: '700',
  background: 'rgb(29, 185, 84) none repeat scroll 0% 0% / auto padding-box border-box',
  contentColor: 'rgb(255, 255, 255)',
  borderColor: 'rgb(255, 255, 255)',

  hovered: {
    background: 'rgb(30, 215, 96) none repeat scroll 0% 0% / auto padding-box border-box',
    contentColor: 'rgb(255, 255, 255)',
    borderColor: 'rgb(255, 255, 255)',
  },

  pressed: {
    transform: 'none',
    background: '#1aa34a',
    contentColor: 'rgb(255, 255, 255)',
    borderColor: 'rgb(255, 255, 255)',
  },
};

const spotifyTokens = {
  height: '52px',
  background: 'rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box',
  contentColor: 'rgb(0, 0, 0)',
  borderColor: 'rgb(0, 0, 0)',
  borderWidth: '2px',
  padding: '17px 48px',
  borderRadius: '500px',
  fontFamily: 'Circular, Helvetica, Arial, sans-serif',
  fontSize: '14px',
  fontWeight: '700',
};

export const ButtonsWithInlineTokens = () => (
  <Stack>
    <Text>A button can be styled using inline tokens.</Text>
    <Stack>
      <Button icon="O" tokens={githubTokens}>
        Github: Open issue
      </Button>
      <Button tokens={amazonTokens}>Amazon: Proceed to checkout</Button>
      <Button tokens={netflixTokens}>Netflix: Sign In</Button>
      <Button tokens={spotifyPrimaryTokens}>Spotify: GET PREMIUM</Button>
      <Button tokens={spotifyTokens}>Spotify: LEARN MORE</Button>
    </Stack>
  </Stack>
);

const theme: PartialTheme = {
  components: {
    Button: {
      variants: {
        github: githubTokens,
        amazon: amazonTokens,
        netflix: netflixTokens,
        spotifyPrimary: spotifyPrimaryTokens,
        spotifySecondary: spotifyTokens,
      } as ButtonVariants,
    },
  },
};

export const ButtonsWithVariants = () => (
  <ThemeProvider theme={theme}>
    <Stack>
      <Text>A button can be styled using theme variants.</Text>
      <Stack>
        <Button icon="O" variant="github">
          Github: Open issue
        </Button>
        <Button variant="amazon">Amazon: Proceed to checkout</Button>
        <Button variant="netflix">Netflix: Sign In</Button>
        <Button variant="spotifyPrimary">Spotify: GET PREMIUM</Button>
        <Button variant="spotifySecondary">Spotify: LEARN MORE</Button>
      </Stack>
    </Stack>
  </ThemeProvider>
);
