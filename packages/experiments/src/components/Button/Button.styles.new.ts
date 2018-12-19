import { getFocusStyle, getGlobalClassNames } from '../../Styling';

// TODO: how are we going to deal with globalClassNames? same way through styles?


// TODO: reconcile existing nested style variables with tokens. is the codepen's flatter approach a full replacement?
// TODO: did David intend for new flatter approach? assume so for now unless big holes appear
// TODO: how will Button.state fit into this approach?
// TODO: callout: decision to pass theme to token functions
// const baseTokens = {
//   backgroundColor: 'transparent',
//   backgroundColorHovered: '#eee',
//   color: 'black',
//   borderColor: 'transparent',
//   borderWidth: 2,
//   borderRadius: 2
// };

const baseTokens = (props, theme) => {
  // console.log('baseTokens theme: ' + theme);
  return {
    borderRadius: 0, // root
    borderWidth: 0, // root

    // sizing
    minWidth: 100,
    minHeight: 32,
    lineHeight: 1,
    contentPadding: '8px 16px', // root

    // subcomponent "text"
    textFamily: 'default',
    textSize: 14,
    // tslint:disable-next-line:no-any
    textWeight: 700 as any,

    // subcomponent "icon"
    iconSize: 14,
    iconWeight: 400,

    // Circular tokens
    circularBorderRadius: '50%',
    circularBorderWidth: 1,
    circularMinWidth: 32,
    circularMinHeight: 32,
    circularContentPadding: ''
  };
};

const enabledTokens = (props, theme) => {
  const { semanticColors } = theme;
  return {
    backgroundColor: semanticColors.buttonBackground,
    backgroundColorHovered: semanticColors.buttonBackgroundHovered,
    backgroundColorPressed: semanticColors.buttonBackgroundPressed,

    iconColor: semanticColors.buttonText,
    iconColorHovered: semanticColors.buttonTextHovered,
    iconColorPressed: semanticColors.buttonTextPressed,

    color: semanticColors.buttonText,
    colorHovered: semanticColors.buttonTextHovered,
    colorPressed: semanticColors.buttonTextPressed,

    borderColor: semanticColors.buttonBorder, // root
    borderColorHovered: semanticColors.buttonBorder,
    borderColorPressed: semanticColors.buttonBorder
  };
};

const disabledTokens = (props, theme) => {
  const { semanticColors } = theme;
  return {
    backgroundColor: theme.semanticColors.buttonBackgroundDisabled,
    backgroundColorHovered: semanticColors.buttonBackgroundDisabled,
    backgroundColorPressed: semanticColors.buttonBackgroundDisabled,

    iconColor: semanticColors.buttonTextDisabled,
    iconColorHovered: semanticColors.buttonTextDisabled,
    iconColorPressed: semanticColors.buttonTextDisabled,

    colorHovered: semanticColors.buttonTextDisabled,
    colorPressed: semanticColors.buttonTextDisabled,
    color: semanticColors.buttonTextDisabled,

    borderColor: semanticColors.buttonBorderDisabled,
    borderColorHovered: semanticColors.buttonBorderDisabled, // root:hover
    borderColorPressed: semanticColors.buttonBorderDisabled // root:active  };
  };
};

const expandedTokens = (props, theme) => {
  const { semanticColors } = theme;
  return {
    backgroundColor: semanticColors.buttonBackgroundPressed,
    backgroundColorHovered: semanticColors.buttonBackgroundPressed,
    backgroundColorPressed: semanticColors.buttonBackgroundPressed,

    color: semanticColors.buttonTextPressed,
    colorHovered: semanticColors.buttonTextPressed,
    colorPressed: semanticColors.buttonTextPressed
  };
};

// TODO: do we need a secondary button variant?
// TODO: how should theme be applied to secondary buttons?
const secondaryTokens = {
  backgroundColor: 'inherit',
  backgroundColorHovered: '#c8c8c8',
  borderColor: '#c8c8c8'
};

const primaryEnabledTokens = (props, theme) => {
  const { semanticColors } = theme;
  return {
    backgroundColor: semanticColors.primaryButtonBackground,
    backgroundColorHovered: semanticColors.primaryButtonBackgroundHovered,
    backgroundColorPressed: semanticColors.primaryButtonBackgroundPressed,

    color: semanticColors.primaryButtonText,
    colorHovered: semanticColors.primaryButtonTextHovered,
    colorPressed: semanticColors.primaryButtonTextPressed,

    iconColor: semanticColors.primaryButtonText,
    iconColorHovered: semanticColors.primaryButtonTextHovered,
    iconColorPressed: semanticColors.primaryButtonTextPressed,

    borderColor: semanticColors.primaryButtonBorder
  }
};

const primaryExpandedTokens = (props, theme) => {
  const { semanticColors } = theme;
  return {
    backgroundColor: semanticColors.primaryButtonBackgroundPressed,
    backgroundColorHovered: semanticColors.primaryButtonBackgroundPressed,
    backgroundColorPressed: semanticColors.primaryButtonBackgroundPressed,

    color: semanticColors.primaryButtonTextPressed,
    colorHovered: semanticColors.primaryButtonTextPressed,
    colorPressed: semanticColors.primaryButtonTextPressed
  }
}

// TODO: old impl before tokens were expanded. remove this code if expanded approach is kept.
// const circularTokens = {
//   borderRadius: '50%',
//   borderWidth: 1,
//   minWidth: 32,
//   minHeight: 32,
//   contentPadding: ''
// }

export const ButtonTokens = props => ([
  baseTokens,
  !props.disabled && enabledTokens,
  props.expanded && expandedTokens,
  props.primary && primaryEnabledTokens,
  props.primary && props.expanded && primaryExpandedTokens,
  props.secondary && secondaryTokens,
  // TODO: old impl before tokens were expanded. remove this code if expanded approach is kept.
  // props.circular && circularTokens,
  props.disabled && disabledTokens,
]);

// TODO: should be able to support lookup types here
export const ButtonStyles = (props, theme, tokens) => {
  // console.log('ButtonStyles theme: ' + theme);
  const { circular, className } = props;

  // if (props.circular) {
  //   console.log('circular contentPadding: ' + tokens.contentPadding);
  //   console.log('circular borderColorPressed: ' + tokens.borderColorPressed);
  // }

  const globalClassNames = getGlobalClassNames(
    {
      icon: 'ms-Icon'
    },
    theme,
    true
  );

  return {
    root: [
      getFocusStyle(theme),
      theme.fonts.medium,
      {
        backgroundColor: tokens.backgroundColor,
        borderColor: tokens.borderColor,
        borderRadius: tokens.borderRadius,
        // borderRadius: circular ? tokens.circularBorderRadius : tokens.borderRadius,
        borderStyle: 'solid',
        borderWidth: tokens.borderWidth,
        // borderWidth: circular ? tokens.circularBorderWidth : tokens.borderWidth,
        boxSizing: 'border-box',
        color: tokens.color,
        cursor: 'default',
        display: 'inline-block',
        fontSize: tokens.textSize,
        fontFamily: tokens.fontFamily,
        fontWeight: tokens.textWeight,
        height: tokens.height,
        // height: circular ? tokens.circularHeight : tokens.height,
        justifyContent: 'center',
        // TODO: this lineHeight was originally in examples but causes bottom of text to cut off
        // lineHeight: '1',
        margin: 0,
        minWidth: tokens.minWidth,
        // minWidth: circular ? tokens.circularMinWidth : tokens.minWidth,
        minHeight: tokens.minHeight,
        // minHeight: circular ? tokens.circularMinHeight : tokens.minHeight,
        overflow: 'hidden',
        padding: 0,
        // TODO: from prototype. from split button impl?
        // padding: "0 8px",
        // paddingRight: props.split ? '0' : '8px',
        textDecoration: 'none',
        textAlign: 'center',
        userSelect: 'none',
        verticalAlign: 'baseline',
        width: tokens.width,
        // width: circular ? tokens.circularWidth : tokens.width,

        selectors: {
          // TODO: reconcile new way (props check) vs. old way
          // ':hover': !props.disabled && {
          //   background: tokens.backgroundColorHovered
          // },
          // Old Way:
          ':hover': {
            backgroundColor: tokens.backgroundColorHovered,
            color: tokens.colorHovered,
            borderColor: tokens.borderColorHovered
          },
          ':hover:active': {
            backgroundColor: tokens.backgroundColorPressed,
            color: tokens.colorPressed,
            borderColor: tokens.borderColorPressed
          },
          [`:hover .${globalClassNames.icon}`]: {
            color: tokens.iconColorHovered
          },
          [`:hover:active .${globalClassNames.icon}`]: {
            color: tokens.iconColorPressed
          }
        }
      },
      circular && {
        borderRadius: tokens.circularBorderRadius,
        borderWidth: tokens.circularBorderWidth,
        height: tokens.circularHeight,
        width: tokens.circularWidth,
        minHeight: tokens.circularMinHeight,
        minWidth: tokens.circularMinWidth
      },
      className
    ],
    stack: {
      padding: circular ? tokens.circularContentPadding : tokens.contentPadding,
      height: '100%'
    },
    icon: [
      {
        display: 'flex',
        fontSize: tokens.iconSize,
        color: tokens.iconColor,
        fill: tokens.iconColor,
        // tslint:disable-next-line:no-any
        fontWeight: tokens.iconWeight as any
      },
      globalClassNames.icon
    ],
    content: {
      overflow: 'visible'
    },
    splitContainer: {
      height: '100%',
      position: 'relative',
      width: '36px'
    },
    divider: {
      background: tokens.color,
      bottom: 6,
      display: 'inline-block',
      left: 0,
      opacity: .7,
      position: 'absolute',
      top: 6,
      width: 1
    },
  }
};
