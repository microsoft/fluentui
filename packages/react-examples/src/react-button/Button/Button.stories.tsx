import * as React from 'react';
import { useTheme } from '@fluentui/react-theme-provider';
import { Button, ButtonProps, makeButtonTokens /*, ButtonTokens, ButtonVariants*/ } from '@fluentui/react-button';
import { CalendarIcon, PencilReplyIcon } from '@fluentui/react-icons-mdl2';
import { FluentProvider } from '../../../../react-provider/src';

// import { ThemeProvider, PartialTheme } from '@fluentui/react-theme-provider/lib/compat/index';
// import * as classes from '../Button.stories.scss';

//
// Anatomy & Layout
//

export const TextOnly = () => <Button>Text</Button>;
export const TextOnlyLong = () => <Button>Text truncates after it hits the max width token value</Button>;

export const IconWithText = () => (
  <>
    <Button icon={<CalendarIcon />} />
    {/* TODO: what is the icon placement props API to put icon after text? */}
    <Button icon={<CalendarIcon />} />
  </>
);

// TODO: this doesn't work this way yet due to { as: CalendarIcon }
export const IconOnly = () => <Button icon={<CalendarIcon />} />;

export const Compound = () => (
  // TODO: how to design content/secondaryString called out by design?
  //       - content prop vs children?
  //       - why "content" and "string" instead of "secondaryContent"?
  <Button compound content="Primary string" secondaryText="Secondary string" />
);

export const CompoundWithIllustration = () => (
  // TODO: how to design content/secondaryString called out by design?
  //       - content prop vs children?
  //       - why "content" and "string" instead of "secondaryContent"?
  <Button compound content="Primary string" secondaryText="Secondary string" illustration={<CalendarIcon />} />
);

export const HitTarget = () => (
  // TODO: are we supporting this on web?
  //       this is the "touchable" area which extends beyond the bounds of the visual button area
  //       If so, show a larger hit target here...
  //       Would need considerable update to the renderButton and careful thinking on focus style, etc.
  <Button>Hit Target</Button>
);

//
// Size
//
const SizeExample = ({ size }: { size?: string }) => (
  <>
    <h4>{size}</h4>
    <Button size={size}>Text</Button>
    <Button size={size} icon={<PencilReplyIcon />}>
      Text
    </Button>
    <Button size={size} icon={<PencilReplyIcon />} />
    <br />
    <Button size={size} compound content="Primary string" secondaryText="Secondary string" />
    <Button
      size={size}
      compound
      content="Primary string"
      secondaryText="Secondary string"
      illustration={<CalendarIcon />}
    />
  </>
);

export const Size = () => (
  <>
    <SizeExample size="small" />
    <SizeExample />
    <SizeExample size="large" />
  </>
);

//
// Appearance
//
const TokenTable = ({
  variantTokens,
}: {
  variantTokens: {
    [variant: string]: { [token: string]: string };
  };
}) => {
  const variants = Object.keys(variantTokens);
  const tokens = Object.values(variantTokens).reduce((acc, tokens) => {
    Object.keys(tokens).forEach(token => {
      if (!acc.includes(token)) {
        acc.push(token);
      }
    });

    return acc;
  }, []);

  const cellStyle = { padding: '0 2px', background: '#FFF' };

  // TODO: highlight red variant cells that duplicate base

  return (
    <pre
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${variants.length + 1}, minmax(min-content, 1fr)`,
        gridTemplateRows: `repeat(${tokens.length}, fit-content)`,
        gridGap: '1px',
        padding: '1px',
        fontSize: '12px',
        background: '#eee',
      }}
    >
      <div>Tokens</div>
      {variants.map(variant => (
        <strong key={variant} style={cellStyle}>
          {variant}
        </strong>
      ))}
      {tokens.map(token => [
        <strong key={token} style={cellStyle}>
          {token}
        </strong>,
        ...variants.map(variant => {
          return (
            <div key={`${variant}:${token}`} style={cellStyle}>
              {variantTokens[variant][token]}
            </div>
          );
        }),
      ])}
    </pre>
  );
};

const AppearanceExample = (props: ButtonProps) => {
  // TODO: get theme from storybook global state
  const buttonTokens = makeButtonTokens(useTheme());

  return (
    <>
      <Button {...props} icon={<CalendarIcon />} />
      <br />
      <Button {...props}>Text</Button>
      <Button {...props} icon={<CalendarIcon />}>
        Text
      </Button>
      <Button {...props} icon={<CalendarIcon />} iconPosition="after">
        Text
      </Button>
      <br />
      <Button {...props} secondaryContent="Secondary string">
        Primary string
      </Button>
      <Button {...props} icon={<CalendarIcon />} secondaryContent="Secondary string">
        Primary string
      </Button>
      {/* TODO: move to Storybook addon */}
      <TokenTable variantTokens={buttonTokens} />
    </>
  );
};

export const Primary = () => <AppearanceExample primary />;
export const Default = () => <AppearanceExample />;
export const Outline = () => <AppearanceExample outline />;
export const Subtle = () => <AppearanceExample subtle />;
export const Transparent = () => <AppearanceExample transparent />;

//
// States
//
export const Rest = () => <Button icon={<CalendarIcon />}>Text</Button>;
export const Hover = () => <Button icon={<CalendarIcon />}>Text</Button>;
export const Focus = () => <Button icon={<CalendarIcon />}>Text</Button>;
export const Pressed = () => <Button icon={<CalendarIcon />}>Text</Button>;
export const TogglePressed = () => <Button icon={<CalendarIcon />}>Text</Button>;
export const Disabled = () => (
  <Button disabled icon={<CalendarIcon />}>
    Text
  </Button>
);
// TODO: add loader
export const Loading = () => (
  <Button loading icon={<CalendarIcon />}>
    Text
  </Button>
);

// TODO: nest these usage examples somewhere outside of the component's "spec" examples
export const usageOverrideTokens = () => (
  <FluentProvider theme={{ button: { height: '100px' } } as any}>
    <Button icon={<CalendarIcon />} />
  </FluentProvider>
);

//
// TODO: Interactions
//

// const githubTokens: ButtonTokens = {
//   paddingLeft: '10px',
//   paddingRight: '10px',
//   paddingTop: '3px',
//   paddingBottom: '3px',
//   fontSize: '12px',
//   fontWeight: '600',
//   contentGap: '8px',
//   borderRadius: '4px',
//   borderWidth: '1px',
//   background: 'linear-gradient(-180deg,#34d058,#28a745 90%)',
//   contentColor: 'white',
//   borderColor: 'rgba(27, 31, 35, 0.2)',
//
//   hovered: {
//     background: '#269f42 linear-gradient(-180deg,#2fcb53,#269f42 90%)',
//     contentColor: 'white',
//     borderColor: 'rgba(27, 31, 35, .5)',
//   },
//
//   pressed: {
//     background: '#279f43',
//     borderColor: 'rgba(27, 31, 35, .5)',
//     contentColor: 'white',
//     transform: 'none',
//   },
// };
//
// const amazonTokens = {
//   fontFamily: `"Amazon Ember", Arial, sans-serif`,
//   fontSize: '13px',
//   fontWeight: '400',
//   borderRadius: '3px',
//   padding: '0 10px',
//
//   background: 'linear-gradient(to bottom,#f7dfa5,#f0c14b)',
//   contentColor: 'rgb(17, 17, 17)',
//   borderColor: 'rgb(168, 135, 52) rgb(156, 126, 49) rgb(132, 106, 41)',
//
//   hovered: {
//     background: 'linear-gradient(to bottom,#f5d78e,#eeb933)',
//     contentColor: 'rgb(17, 17, 17)',
//     borderColor: '#a88734 #9c7e31 #846a29',
//   },
//
//   pressed: {
//     background: '#f0c14b',
//     contentColor: 'rgb(17, 17, 17)',
//     borderColor: '#a88734 #9c7e31 #846a29',
//   },
// };
//
// const netflixTokens = {
//   borderWidth: '0px',
//   padding: '7px 17px',
//   borderRadius: '3px',
//   fontFamily: '"Netflix Sans", "Helvetica Neue", Helvetica, Arial, sans-serif',
//   fontSize: '16px',
//   fontWeight: '400',
//
//   background: 'rgb(229, 9, 20)',
//   contentColor: 'rgb(255, 255, 255)',
//   borderColor: 'rgb(255, 255, 255)',
//
//   hovered: {
//     background: 'rgb(255, 50, 61)',
//     contentColor: 'rgb(255, 255, 255)',
//     borderColor: '#a88734 #9c7e31 #846a29',
//   },
//
//   pressed: {
//     background: 'rgb(229, 9, 20)',
//     borderColor: '#a88734 #9c7e31 #846a29',
//   },
// };
//
// const spotifyPrimaryTokens = {
//   height: '48px',
//   borderWidth: '0px',
//   padding: '17px 48px',
//   borderRadius: '500px',
//   fontFamily: 'Circular, Helvetica, Arial, sans-serif',
//   fontSize: '14px',
//   fontWeight: '700',
//   background: 'rgb(29, 185, 84) none repeat scroll 0% 0% / auto padding-box border-box',
//   contentColor: 'rgb(255, 255, 255)',
//   borderColor: 'rgb(255, 255, 255)',
//
//   hovered: {
//     background: 'rgb(30, 215, 96) none repeat scroll 0% 0% / auto padding-box border-box',
//     contentColor: 'rgb(255, 255, 255)',
//     borderColor: 'rgb(255, 255, 255)',
//   },
//
//   pressed: {
//     transform: 'none',
//     background: '#1aa34a',
//     contentColor: 'rgb(255, 255, 255)',
//     borderColor: 'rgb(255, 255, 255)',
//   },
// };
//
// const spotifyTokens = {
//   height: '52px',
//   background: 'rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box',
//   contentColor: 'rgb(0, 0, 0)',
//   borderColor: 'rgb(0, 0, 0)',
//   borderWidth: '2px',
//   padding: '17px 48px',
//   borderRadius: '500px',
//   fontFamily: 'Circular, Helvetica, Arial, sans-serif',
//   fontSize: '14px',
//   fontWeight: '700',
// };
//
// export const ButtonsWithInlineTokens = () => (
//   <div>
//     <h3>A button can be styled using inline tokens.</h3>
//     <div>
//       <Button icon="O" tokens={githubTokens}>
//         Github: Open issue
//       </Button>
//       <Button tokens={amazonTokens}>Amazon: Proceed to checkout</Button>
//       <Button tokens={netflixTokens}>Netflix: Sign In</Button>
//       <Button tokens={spotifyPrimaryTokens}>Spotify: GET PREMIUM</Button>
//       <Button tokens={spotifyTokens}>Spotify: LEARN MORE</Button>
//     </div>
//   </div>
// );

// const theme: PartialTheme = {
//   components: {
//     Button: {
//       variants: {
//         github: githubTokens,
//         amazon: amazonTokens,
//         netflix: netflixTokens,
//         spotifyPrimary: spotifyPrimaryTokens,
//         spotifySecondary: spotifyTokens,
//       } as ButtonVariants,
//     },
//   },
// };
//
// export const ButtonsWithVariants = () => (
//   <ThemeProvider theme={theme}>
//     <div>
//       <h3>A button can be styled using theme variants.</h3>
//       <div>
//         <Button icon="O" variant="github">
//           Github: Open issue
//         </Button>
//         <Button variant="amazon">Amazon: Proceed to checkout</Button>
//         <Button variant="netflix">Netflix: Sign In</Button>
//         <Button variant="spotifyPrimary">Spotify: GET PREMIUM</Button>
//         <Button variant="spotifySecondary">Spotify: LEARN MORE</Button>
//       </div>
//     </div>
//   </ThemeProvider>
// );
