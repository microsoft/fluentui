import { FontWeights, getFocusOutlineStyle, IStyleFunction } from '@fluentui/react';
import { appPaddingSm } from '../../styles/constants';
import { ISideRailStyleProps, ISideRailStyles } from './SideRail.types';
import { getLinkColors } from '../../utilities/getLinkColors';

export const sideRailClassNames = {
  isActive: 'SideRail-isActive',
};

export const getStyles: IStyleFunction<ISideRailStyleProps, ISideRailStyles> = props => {
  const theme = props.theme!;
  return {
    root: {},
    section: {
      marginBottom: appPaddingSm,
      selectors: {
        '&:last-child': {
          marginBottom: 0,
        },
      },
    },
    sectionTitle: {
      fontSize: theme.fonts.mediumPlus.fontSize,
      fontWeight: FontWeights.semibold,
      color: theme.palette.neutralSecondary,
      marginTop: 0,
      paddingLeft: 8,
    },
    links: {
      margin: 0,
      padding: 0,
    },
    linkWrapper: {
      display: 'flex',
      fontSize: theme.fonts.medium.fontSize,
      selectors: {
        a: [
          {
            display: 'block',
            flex: '1',
            padding: '4px 8px',
            selectors: {
              '&:hover': { background: theme.palette.neutralLight },
            },
          },
          getFocusOutlineStyle(theme, 1),
        ],
      },
    },
    markdownList: {
      selectors: {
        li: [
          {
            fontSize: theme.fonts.medium.fontSize,
            padding: '4px 8px',
          },
          getFocusOutlineStyle(theme, 1),
        ],
        // doing :hover styles together with li above applied them to root markdownList
        'li:hover': { background: theme.palette.neutralLight },
      },
    },
    jumpLinkWrapper: {
      position: 'relative',
    },
    jumpLink: [
      {
        borderLeft: '2px solid transparent',
        paddingLeft: 6, // 8px - 2px border
      },
      // Courtesty of UHF global styles and overrides of them in Page, we have to be very specific
      // when overriding the colors. This utility helps.
      getLinkColors(theme.palette.neutralPrimary, theme.semanticColors.linkHovered, theme.palette.neutralPrimary),
    ],
    jumpLinkActive: {
      borderLeftColor: theme!.palette.themePrimary,
    },
    jumpLinkSection: {
      selectors: {
        '@media screen and (max-width: 1360px)': {
          display: 'none',
        },
      },
    },
  };
};
