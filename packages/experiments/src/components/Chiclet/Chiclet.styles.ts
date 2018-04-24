import { memoizeFunction } from '../../Utilities';
import { 
  mergeStyleSets, 
  IStyle, 
  ITheme,
  concatStyleSets 
} from '../../Styling';
import { IChicletStyles } from './Chiclet.types';

const msColorNeutralLighterAlt = 'white';
const msColorNeutralPrimary = '#333333';
const ChicletCardTitleLineHeight = '21px';

/* Actions */
const msChicletCardActionsActionSize = '34px';
const msChicletCardActionsHorizontalPadding = '12px';
const msChicletCardActionsVerticalPadding = '2px';

export const getClassNames = memoizeFunction((
  theme: ITheme,
  customStyles?: IChicletStyles
): IChicletStyles => {
  const styles: IChicletStyles = {
    root: {
      //-webkit-font-smoothing: 'antialiased';
      backgroundColor: 'white',
      //border: 1px solid $ms-color-neutralLight;
      boxSizing: 'border-box',
      maxWidth: '320px',
      minWidth: '540px',
      height: '109px',
      userSelect: 'none',
      position: 'relative',
      //&:hover {
      //  cursor: pointer;
      //  border: 1px solid $ms-color-neutralTertiaryAlt;
      //}
    },
    icon: {
      //@include ms-left(10px);
      bottom: '10px',
      position: 'absolute',
      color: '#166EBE'
    },
    preview: {
      float: 'left',
      maxHeight: '107px',
      maxWidth: '160px',
      position: 'relative',
      overflow: 'hidden', // need to fix
      backgroundColor: msColorNeutralLighterAlt,
      display: 'block'
    },
    info: {
      position: 'relative',
      display: 'block',
      height: '100%',
      lineHeight: '21px',
      overflow: 'hidden',
      wordWrap: 'break-word'
    },
    title: {
      padding: '8px 16px 0px',
      //@include ms-font-l;
      color: msColorNeutralPrimary,
      height: '42px', // Two lines of text, making sure the third line is hidden
      lineHeight: ChicletCardTitleLineHeight,
      overflow: 'hidden',
      wordWrap: 'break-word',
      fontWeight: '400'
    },
    link: {
      padding: '4px 16px 0px',
      //@include ms-font-l;
      fontSize: '8pt',
      color: msColorNeutralPrimary,
      lineHeight: '14px',
      height: '14px',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis'
    },
    actions: {
      height: msChicletCardActionsActionSize,
      padding: msChicletCardActionsVerticalPadding, //msChicletCardActionsHorizontalPadding,
      position: 'relative'
    },
    action: {
      float: 'right',
      //@include ms - margin - left(4px);
      cursor: 'pointer'

      // : global(.ms - Button) {
      //   font - size: 16px;
      //   height: $ms - ChicletCardActions - actionSize;
      //   width: $ms - ChicletCardActions - actionSize;
      //   color: #166EBE;
      // }

      // : global(.ms - Button: hover) {
      //   : global(.ms - Button - icon) {
      //     color: $buttonTextColor;
      //     cursor: pointer;
      //   }
      // }
    }
  };

  return concatStyleSets(styles, customStyles)!;

});