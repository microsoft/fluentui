import * as React from 'react';
import EmojiPicker from './emojiPicker';
import StickerPicker from './stickerPicker';
import { Provider, Button, withDebugId, compose, useStyles } from '@fluentui/react-northstar';

const outerTheme = withDebugId(
  {
    siteVariables: {
      primaryColor: '#000',
    },
    componentVariables: {
      Component: siteVariables => ({
        componentTextColor: siteVariables.primaryColor,
        another: '#222',
      }),
    },
    componentStyles: {
      Component: {
        root: ({ variables }) => ({
          color: '#555', //variables.componentTextColor,
        }),
      },
    },
  },
  'outerTheme',
);

const innerTheme = withDebugId(
  {
    siteVariables: {
      primaryColor: '#111',
    },
    componentVariables: {
      Component: siteVariables => ({
        componentTextColor: '#333', //siteVariables.primaryColor,
      }),
    },
    componentStyles: {
      Component: {
        root: {
          color: '#666',
        },
      },
    },
  },
  'innerTheme',
);

const Component = compose<'div'>(
  (props, ref, composeOptions) => {
    const { className, design, styles, variables, children } = props;

    const { classes } = useStyles(composeOptions.displayName, {
      composeOptions,
      mapPropsToInlineStyles: () => ({
        className,
        design,
        styles,
        variables,
      }),
    });
    return <div className={classes.root}>{children}</div>;
  },
  {
    displayName: 'Component',
  },
);

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', width: '180px', padding: '20px' }}>
    <span>Emojii popup:</span>
    <EmojiPicker />
    <br />
    <span>Sticker popup:</span>
    <StickerPicker />

    <Provider overwrite theme={outerTheme}>
      <Provider theme={innerTheme}>
        <Button content={'x'} />
        <Component variables={{ componentTextColor: '#444' }} styles={{ color: '#888' }} design={{ color: '#777' }}>
          x
        </Component>
      </Provider>
    </Provider>
  </div>
);
