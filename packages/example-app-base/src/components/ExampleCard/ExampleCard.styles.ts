import { IDropdownStyles } from 'office-ui-fabric-react/lib/Dropdown';
import { DefaultPalette, DefaultFontStyles, AnimationVariables, IRawStyle } from 'office-ui-fabric-react/lib/Styling';
import { IStyleFunction } from 'office-ui-fabric-react/lib/Utilities';
import { IExampleCardStyles, IExampleCardStyleProps } from './ExampleCard.types';

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
  isScrollable: 'is-scrollable'
};

const sharedToggleButtonStyles: IRawStyle = {
  marginRight: 0,
  background: 'none',
  backgroundColor: 'transparent',
  border: `1px solid ${DefaultPalette.neutralTertiary}`,
  borderBottom: 0,
  borderTopLeftRadius: '4px',
  borderTopRightRadius: '4px',
  padding: '4px 12px',
  minWidth: 100,
  transition: `border ${AnimationVariables.durationValue3} ${AnimationVariables.easeFunction1}`
};

const codeButtonActiveStyles: IRawStyle = {
  backgroundColor: DefaultPalette.neutralDark,
  borderColor: DefaultPalette.neutralDark,
  selectors: {
    '.ms-Button-icon, .ms-Button-label': {
      color: DefaultPalette.white
    }
  }
};

export const getStyles: IStyleFunction<IExampleCardStyleProps, IExampleCardStyles> = props => {
  const { isRightAligned, isScrollable, isCodeVisible } = props;

  return {
    root: [
      {
        margin: '20px 0'
      },
      globalClassNames.root,
      isCodeVisible && globalClassNames.isCodeVisible
    ],
    header: [
      {
        borderBottom: `1px solid ${DefaultPalette.neutralTertiary}`,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        position: 'relative'
      },
      isCodeVisible && {
        borderColor: DefaultPalette.neutralDark
      },
      globalClassNames.header
    ],
    title: [
      DefaultFontStyles.large,
      {
        marginBottom: 10,
        display: 'inline-block'
      },
      globalClassNames.title
    ],
    toggleButtons: [
      DefaultFontStyles.large,
      {
        display: 'flex',
        float: 'right'
      },
      globalClassNames.toggleButtons
    ],
    codeButton: [
      sharedToggleButtonStyles,
      {
        // This is meant to be a ratio, so it has to be in quotes so it's not interpreted as pixels
        lineHeight: '1',
        selectors: {
          '&:hover': codeButtonActiveStyles,
          '.ms-Button-label': {
            color: DefaultPalette.neutralDark,
            borderColor: DefaultPalette.neutralDark
          }
        }
      },
      globalClassNames.codeButton,
      isCodeVisible && [codeButtonActiveStyles, globalClassNames.isActive]
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
          position: 'relative'
        },
        globalClassNames.isScrollable
      ],
      isRightAligned && [{ textAlign: 'right' }, globalClassNames.isRightAligned]
    ],
    code: [
      {
        backgroundColor: DefaultPalette.neutralDark,
        overflow: 'hidden',
        selectors: {
          pre: [
            {
              margin: 0,
              overflow: 'auto',
              transition: `all ${AnimationVariables.durationValue3} ${AnimationVariables.easeFunction1}`
            },
            // Collapse code blocks by default
            isCodeVisible ? { maxHeight: 480, minHeight: 120 } : { maxHeight: 0 }
          ],
          code: {
            display: 'block',
            margin: 12
          }
        }
      },
      isCodeVisible && {
        display: 'block',
        marginBottom: 20
      },
      globalClassNames.code
    ],
    dosAndDonts: [
      {
        width: '100%'
      },
      globalClassNames.dosAndDonts
    ],
    dos: [
      {
        width: 'calc(50% - 50px)',
        display: 'inline-block',
        marginRight: 50,
        selectors: {
          h4: [DefaultFontStyles.large, { color: '#177d3e' }]
        }
      },
      globalClassNames.dos
    ],
    donts: [
      {
        width: 'calc(50%)',
        display: 'inline-block',
        selectors: {
          h4: [DefaultFontStyles.large, { color: '#a61e22' }]
        }
      },
      globalClassNames.donts
    ]
  };
};

export const getDropdownStyles: IStyleFunction<IExampleCardStyleProps, IDropdownStyles> = props => {
  return {
    caretDownWrapper: {
      top: '6px'
    },
    title: [
      sharedToggleButtonStyles,
      {
        alignItems: 'center',
        display: 'flex',
        height: 40,
        width: 150,
        selectors: {
          [`&.${globalClassNames.themeDropdown}:focus`]: {
            borderColor: DefaultPalette.neutralDark,
            outlineColor: DefaultPalette.neutralDark
          }
        }
      },
      globalClassNames.themeDropdown
    ]
  };
};
