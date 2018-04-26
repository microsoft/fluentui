import { memoizeFunction } from '../../Utilities';
import {
  ITheme,
  concatStyleSets,
  getTheme
} from '../../Styling';
import { IChicletCardStyles } from './ChicletCard.types';

const ChicletCardTitleLineHeight = '21px';

/* Actions */
const msChicletCardActionsActionSize = '34px';
const msChicletCardActionsHorizontalPadding = '12px';
const msChicletCardActionsVerticalPadding = '2px';

export const getClassNames = memoizeFunction((
  theme: ITheme = getTheme(),
  customStyles?: IChicletCardStyles
): IChicletCardStyles => {
  const styles: IChicletCardStyles = {
    root: {
      WebkitFontSmoothing: 'antialiased',
      backgroundColor: 'white',
      border: `1px solid ${theme.palette.neutralLight}`,
      boxSizing: 'border-box',
      maxWidth: '320px',
      minWidth: '540px',
      height: '109px',
      userSelect: 'none',
      position: 'relative',
      selectors: {
        ':hover': {
          cursor: 'pointer',
          border: `1px solid ${theme.palette.neutralTertiaryAlt}`
        }
      }
    },
    icon: [
      'ms-DocumentCardPreview-icon',
      {
        marginLeft: '10px',
        bottom: '10px',
        position: 'absolute',
        color: '#166EBE'
      }
    ],
    preview: [
      'ms-ChicletCardPreview',
      {
        float: 'left',
        maxHeight: '107px',
        maxWidth: '160px',
        position: 'relative',
        overflow: 'hidden', // need to fix
        backgroundColor: theme.palette.neutralLighterAlt,
        display: 'block'
      }
    ],
    info: [
      'ms-ChicletCardInfo',
      {
        position: 'relative',
        display: 'block',
        height: '100%',
        lineHeight: '21px',
        overflow: 'hidden',
        wordWrap: 'break-word'
      }
    ],
    title: [
      'ms-ChicletCardTitle',
      {
        padding: '8px 16px 0px',
        font: theme.fonts.large,
        color: theme.palette.neutralPrimary,
        height: '42px', // Two lines of text, making sure the third line is hidden
        lineHeight: ChicletCardTitleLineHeight,
        overflow: 'hidden',
        wordWrap: 'break-word',
        fontWeight: '400'
      }
    ],
    link: [
      'ms-ChicletCardLink',
      {
        padding: '4px 16px 0px',
        fontSize: '8pt',
        color: theme.palette.neutralTertiaryAlt,
        lineHeight: '14px',
        height: '14px',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis'
      }
    ],
    actions: [
      'ms-ChicletFooter',
      {
        height: msChicletCardActionsActionSize,
        padding: `${msChicletCardActionsVerticalPadding} ${msChicletCardActionsHorizontalPadding}`,
        position: 'relative'
      }
    ],
    action: [
      'ms-ChicletFooter-action',
      {
        float: 'right',
        marginLeft: '4px',
        cursor: 'pointer'
      }
    ]
  };

  return concatStyleSets(styles, customStyles)!;

});