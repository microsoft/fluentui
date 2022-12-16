import {
  AnimationVariables,
  IRawStyle,
  getTheme,
  getFocusStyle,
  HighContrastSelector,
} from '@fluentui/react/lib/Styling';
import { IStyleFunction } from '@fluentui/react/lib/Utilities';
import { IDropdownStyles } from '@fluentui/react/lib/Dropdown';
import { IButtonStyles } from '@fluentui/react/lib/Button';
import { IExampleCardStyles, IExampleCardStyleProps } from './ExampleCard.types';
import { NeutralColors } from '@fluentui/theme';

const globalClassNames = {
  root: 'ExampleCard',
  header: 'ExampleCard-header',
  title: 'ExampleCard-title',
  toggleButtons: 'ExampleCard-toggleButtons',
  themeDropdown: 'ExampleCard-themeDropdown',
  example: 'ExampleCard-example',
  code: 'ExampleCard-code',
  codeButton: 'ExampleCard-codeButton',
  dosAndDonts: 'ExampleCard-dosAndDonts',
  dos: 'ExampleCard-dos',
  donts: 'ExampleCard-donts',
  isActive: 'is-active',
  isCodeVisible: 'is-codeVisible',
  isRightAligned: 'is-right-aligned',
  isScrollable: 'is-scrollable',
};

export const getStyles: IStyleFunction<IExampleCardStyleProps, IExampleCardStyles> = props => {
  const { isRightAligned, isScrollable, isCodeVisible, theme = getTheme() } = props;

  const sharedToggleButtonStyles = {
    marginRight: 0,
    background: 'none',
    backgroundColor: 'transparent',
    border: `1px solid ${theme.palette.neutralTertiary}`,
    borderBottom: 0,
    borderTopLeftRadius: '4px',
    borderTopRightRadius: '4px',
    padding: '4px 12px',
    minWidth: 100,
    transition: `border ${AnimationVariables.durationValue3} ${AnimationVariables.easeFunction1}`,
    selectors: {
      [HighContrastSelector]: {
        borderColor: 'WindowText',
      },
    },
  };

  const codeButtonActiveStyles: IRawStyle = {
    backgroundColor: NeutralColors.gray20,
    borderColor: NeutralColors.gray90,
    selectors: {
      '.ms-Button-icon': {
        color: theme.palette.themePrimary,
      },
      '.ms-Button-label': {
        color: NeutralColors.gray160,
      },
    },
  };

  const dropdownStyles: Partial<IDropdownStyles> = {
    caretDownWrapper: {
      top: '6px',
    },
    title: [
      sharedToggleButtonStyles,
      {
        alignItems: 'center',
        display: 'flex',
        height: 40,
        width: 200,
        selectors: {
          [`&.${globalClassNames.themeDropdown}:focus`]: {
            borderColor: theme.palette.neutralDark,
            outlineColor: theme.palette.neutralDark,
          },
        },
      },
      globalClassNames.themeDropdown,
    ],
  };

  const buttonHighContrastFocus = {
    left: -1,
    top: -1,
    bottom: 1,
    right: -1,
    outlineColor: 'Highlight',
    borderColor: 'Highlight',
  };

  const buttonStyles: Partial<IButtonStyles> = {
    root: [
      sharedToggleButtonStyles,
      { lineHeight: '1' }, // quotes prevent interpretation as px
      globalClassNames.codeButton,
      getFocusStyle(theme, { inset: 1, highContrastStyle: buttonHighContrastFocus, borderColor: 'transparent' }),
    ],
    label: {
      color: theme.palette.neutralDark,
      borderColor: theme.palette.neutralDark,
    },
    rootHovered: codeButtonActiveStyles,
    rootChecked: [codeButtonActiveStyles, globalClassNames.isActive],
  };

  return {
    root: [
      {
        margin: '20px 0',
      },
      globalClassNames.root,
      isCodeVisible && globalClassNames.isCodeVisible,
    ],
    header: [
      {
        borderBottom: `1px solid ${theme.palette.neutralTertiary}`,
        display: 'flex',
        overflow: 'hidden',
        position: 'relative',
      },
      isCodeVisible && {
        borderColor: NeutralColors.gray90,
      },
      globalClassNames.header,
    ],
    title: [
      theme.fonts.medium,
      {
        display: 'inline-flex',
        flexGrow: 1,
        flexShrink: 1,
        marginBottom: 10,
      },
      globalClassNames.title,
    ],
    toggleButtons: [
      theme.fonts.medium,
      {
        alignSelf: 'flex-end',
        display: 'flex',
        flexShrink: 0,
        float: 'right',
      },
      globalClassNames.toggleButtons,
    ],
    example: [
      globalClassNames.example,
      isScrollable && [
        {
          WebkitOverflowScrolling: 'touch',
          maxHeight: '80vh',
          overflowX: 'hidden',
          overflowY: 'auto',
          padding: '20px 4px',
          position: 'relative',
        },
        globalClassNames.isScrollable,
      ],
      isRightAligned && [{ textAlign: 'right' }, globalClassNames.isRightAligned],
    ],
    code: [
      {
        backgroundColor: NeutralColors.gray20,
        border: '1px solid ' + NeutralColors.gray90,
        borderTop: 0,
        selectors: {
          pre: [
            {
              margin: 0,
              overflow: 'auto',
              transition: `all ${AnimationVariables.durationValue3} ${AnimationVariables.easeFunction1}`,
            },
            // Collapse code blocks by default
            isCodeVisible ? { maxHeight: 480, minHeight: 120 } : { maxHeight: 0 },
          ],
          code: {
            display: 'block',
            margin: 12,
            fontSize: '14px',
          },
        },
      },
      isCodeVisible && {
        display: 'block',
        marginBottom: 20,
      },
      globalClassNames.code,
    ],
    dosAndDonts: [
      {
        width: '100%',
      },
      globalClassNames.dosAndDonts,
    ],
    dos: [
      {
        width: 'calc(50% - 50px)',
        display: 'inline-block',
        marginRight: 50,
        selectors: {
          h4: [theme.fonts.medium, { color: '#177d3e' }],
        },
      },
      globalClassNames.dos,
    ],
    donts: [
      {
        width: 'calc(50%)',
        display: 'inline-block',
        selectors: {
          h4: [theme.fonts.medium, { color: '#a61e22' }],
        },
      },
      globalClassNames.donts,
    ],
    subComponentStyles: {
      dropdowns: dropdownStyles,
      codeButtons: buttonStyles,
    },
  };
};
