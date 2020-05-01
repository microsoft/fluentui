import {
  ThemeInput,
  chatItemSlotClassNames,
  inputSlotClassNames,
  svgIconClassName,
  buttonClassName,
  pxToRem,
} from '@fluentui/react-northstar';
import classNames from './classNames';

const customizedTheme: ThemeInput = {
  componentStyles: {
    ChatItem: {
      root: ({ props: p, theme: { siteVariables } }) => ({
        [`& .${chatItemSlotClassNames.message}`]: {
          width: '100%',
        },
        [`&.${classNames.threadReplies.chatItem}`]: {
          padding: 0,
          backgroundColor: siteVariables.colorScheme.default.background1,
        },
        [`& .${classNames.threadReplies.chatItemMessage}`]: {
          margin: 0,
        },
        [`& .${classNames.threadReplies.gutter}`]: {
          left: pxToRem(15),
          zIndex: '1',
        },
      }),
    },
    ChatMessage: {
      root: ({ props: p, theme: { siteVariables } }) => ({
        [`&.${classNames.threadedMessage.thread}`]: {
          padding: 0,
          width: '100%',
        },
        [`&.${classNames.threadedMessage.threadBody}`]: {
          width: '100%',
          minWidth: '100%',
          padding: 0,
          margin: 0,
          borderBottom: `${pxToRem(1)} solid ${siteVariables.colorScheme.default.background2}`,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,

          [`& .${classNames.threadedMessage.innerContent}`]: {
            padding: `${pxToRem(8)} ${pxToRem(16)}`,
          },
          [`& .${classNames.threadedMessage.author}`]: {
            padding: `${pxToRem(5)} ${pxToRem(5)} ${pxToRem(5)} 0`,
          },
          [`& .${classNames.threadedMessage.timestamp}`]: {
            padding: pxToRem(5),
            color: siteVariables.colorScheme.default.foreground2,
          },
        },
        [`&.${classNames.threadReplies.message}`]: {
          width: '100%',
          minWidth: '100%',
          margin: `${pxToRem(1)} 0`,
          paddingLeft: pxToRem(60),
          backgroundColor: siteVariables.colorScheme.default.background1,
        },
        [`&.${classNames.replyEditor}`]: {
          width: '100%',
          minWidth: '100%',
          padding: 0,
          margin: 0,
          backgroundColor: siteVariables.colorScheme.default.background2,
        },
      }),
    },
    Button: {
      root: ({ props: p, theme: { siteVariables } }) => ({
        [`&.${classNames.threadReplies.trigger}`]: {
          border: 'none',
          justifyContent: 'start',
          marginBottom: pxToRem(1),
          boxShadow: 'none',
          textDecoration: 'none',

          '&:focus': {
            backgroundColor: siteVariables.colorScheme.default.background,
          },

          '&:hover': {
            backgroundColor: siteVariables.colorScheme.default.background,
          },

          '&:active': {
            backgroundColor: siteVariables.colorScheme.default.background,
          },
        },
      }),
    },
    Input: {
      root: ({ props: p, theme: { siteVariables } }) => ({
        [`& .${inputSlotClassNames.input}`]: {
          height: pxToRem(50),
          backgroundColor: siteVariables.colorScheme.default.background,
        },
      }),
    },
    Attachment: {
      root: ({ props: p, theme: { siteVariables } }) => ({
        width: '100%',
        minWidth: '100%',
        boxShadow: 'none',
        border: 0,
        backgroundColor: siteVariables.colorScheme.brand.foreground,
        borderRadius: 'unset',
        marginBottom: 0,

        '&:focus': {
          backgroundColor: siteVariables.colorScheme.brand.foreground,
        },

        '&:hover': {
          backgroundColor: siteVariables.colorScheme.brand.foreground,
        },

        [`& .${buttonClassName} .${svgIconClassName}`]: {
          color: siteVariables.colorScheme.default.background,
        },
      }),
      header: ({ props: p, theme: { siteVariables } }) => ({
        color: siteVariables.colorScheme.default.background,
      }),
      description: ({ props: p, theme: { siteVariables } }) => ({
        color: siteVariables.colorScheme.default.background,
      }),
      icon: ({ props: p, theme: { siteVariables } }) => ({
        color: siteVariables.colorScheme.default.background,
      }),
    },
  },
};

export default customizedTheme;
