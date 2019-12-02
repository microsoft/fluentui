import { INewHeaderStyleProps, INewHeaderStyles } from './NewHeader.types';
import { getGlobalClassNames } from '../../../Styling';

const GlobalClassNames = {
  commands: 'ms-Panel-commands',
  navigation: 'ms-Panel-navigation',
  closeButton: 'ms-Panel-closeButton ms-PanelAction-close',
  header: 'ms-Panel-header',
  headerText: 'ms-Panel-headerText',
  content: 'ms-Panel-content',
  footer: 'ms-Panel-footer',
  hasCloseButton: 'ms-Panel--hasCloseButton'
};

export const getStyles = (props: INewHeaderStyleProps): INewHeaderStyles => {
  const { theme, headerClassName } = props;
  const { semanticColors, fonts } = theme;
  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  return {
    commands: [
      classNames.commands,
      {
        alignItems: 'baseline',
        display: 'flex',
        flexDirection: 'row-reverse',
        flexWrap: 'wrap',
        marginBottom: 14,
        marginLeft: 24,
        marginTop: 14
      }
    ],
    navigation: [
      classNames.navigation,
      {
        alignItems: 'baseline',
        display: 'flex',
        flexDirection: 'row-reverse',
        flexGrow: 1,
        flexWrap: 'wrap',
        marginRight: 24,
        marginBottom: 14,
        selectors: {
          '& > *': {
            flexGrow: 1,
            justifySelf: 'flex-end',
            order: 2
          }
        }
      }
    ],
    closeButton: [
      classNames.closeButton,
      {
        flexGrow: 0,
        justifySelf: 'flex-start',
        marginLeft: 14,
        marginRight: -10,
        order: 1
      }
    ],
    header: [
      classNames.header,
      {
        marginRight: 'auto',
        order: 2,
        // Width: Ensures that the header container doesnt wrap
        // to the next line but rather the text does
        width: 'calc(100% - 70px)'
      }
    ],
    headerText: [
      classNames.headerText,
      fonts.xLarge,
      {
        color: semanticColors.bodyText,
        lineHeight: '27px',
        margin: 0,
        overflowWrap: 'break-word',
        wordWrap: 'break-word',
        wordBreak: 'break-word',
        hyphens: 'auto'
      },
      headerClassName
    ]
  };
};
