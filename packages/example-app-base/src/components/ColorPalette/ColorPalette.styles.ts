import { IRawStyle, IStyleFunction, FontWeights, getFocusStyle, getGlobalClassNames } from 'office-ui-fabric-react';
import { NeutralColors, MotionDurations, MotionTimings } from '@uifabric/fluent-theme';
import { IColorPaletteStyleProps, IColorPaletteStyles } from './ColorPalette.types';

const globalClassNames: { [key in keyof IColorPaletteStyles]: string } = {
  root: 'ms-ColorPalette',
  grid: 'ms-ColorPalette-grid',
  swatch: 'ms-ColorPalette-swatch',
  swatchSelected: 'ms-ColorPalette-swatchSelected',
  swatchTooltip: 'ms-ColorPalette-swatchTooltip',
  swatchContent: 'ms-ColorPalette-swatchContent',
  swatchContentSelected: 'ms-ColorPalette-swatchContentSelected',
  swatchIcon: 'ms-ColorPalette-swatchIcon',
  swatchName: 'ms-ColorPalette-swatchName',
  detail: 'ms-ColorPalette-detail',
  detailCode: 'ms-ColorPalette-detailCode',
  detailCodeInfoIcon: 'ms-ColorPalette-detailCodeInfoIcon',
  detailContentWrapper: 'ms-ColorPalette-detailContentWrapper',
  detailHex: 'ms-ColorPalette-detailHex',
  detailName: 'ms-ColorPalette-detailName',
  detailValues: 'ms-ColorPalette-detailValues'
};

const swatchGap = '4px';
const swatchesPerRow = 4;
const swatchesPerRowCondensed = 7;

const square: IRawStyle = {
  selectors: {
    ':before': {
      content: '" "',
      display: 'block',
      float: 'left',
      paddingTop: '100%'
    }
  }
};

export const getStyles: IStyleFunction<IColorPaletteStyleProps, IColorPaletteStyles> = props => {
  const { isCondensed, theme, className } = props;
  const classNames = getGlobalClassNames(globalClassNames, theme!);
  return {
    root: [
      classNames.root,
      {
        alignItems: 'flex-start',
        display: 'flex',
        marginTop: 28
      },
      className
    ],
    grid: [
      classNames.grid,
      {
        display: 'flex',
        flexBasis: '60%',
        flexWrap: 'wrap',
        listStyle: 'none',
        padding: 0,
        margin: 0,
        marginRight: 40,
        paddingLeft: 0
      }
    ],
    swatch: [
      classNames.swatch,
      square,
      {
        display: 'flex',
        alignItems: 'flex-end',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: FontWeights.semibold,
        marginBottom: swatchGap,
        marginRight: swatchGap,
        position: 'relative',
        minWidth: isCondensed ? 'unset' : 112,
        width: `calc(100% / ${isCondensed ? swatchesPerRowCondensed : swatchesPerRow} - ${swatchGap})`
      },
      getFocusStyle(theme!, {
        inset: -1,
        width: 2
      })
    ],
    swatchSelected: [
      classNames.swatchSelected,
      {
        border: '2px solid ' + NeutralColors.gray100,
        selectors: {
          ':after': {
            border: '2px solid ' + NeutralColors.white,
            content: '',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            top: 0
          }
        }
      }
    ],
    swatchTooltip: [
      classNames.swatchTooltip,
      {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'flex-end'
      }
    ],
    swatchContent: [
      classNames.swatchContent,
      {
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        color: theme!.palette.white,
        display: 'flex',
        fontSize: isCondensed ? '12px' : '14px',
        lineHeight: '1.2', // must be a string to prevent interpretation as px
        overflow: 'hidden',
        padding: isCondensed ? 4 : 12,
        width: '100%'
      }
    ],
    swatchContentSelected: [
      classNames.swatchContentSelected,
      {
        padding: '12px 10px 10px 10px'
      },
      isCondensed && {
        selectors: {
          span: { display: 'none' }
        }
      }
    ],
    swatchIcon: [
      classNames.swatchIcon,
      {
        display: isCondensed ? 'none' : 'flex',
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 40,
        right: 0,
        fontSize: '42px',
        justifyContent: 'center',
        alignItems: 'center'
      }
    ],
    swatchName: [
      classNames.swatchName,
      {
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }
    ],
    detail: [
      classNames.detail,
      square,
      {
        display: 'flex',
        alignItems: 'flex-end',
        minWidth: '40%',
        maxWidth: '40%',
        position: 'sticky',
        top: -20,
        transition: `background-color ${MotionDurations.duration2} ${MotionTimings.standard}`
      }
    ],
    detailContentWrapper: [
      classNames.detailContentWrapper,
      {
        padding: '10%',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        width: '100%'
      }
    ],
    detailName: [
      classNames.detailName,
      {
        fontSize: '28px',
        fontWeight: FontWeights.semibold,
        lineHeight: 32,
        marginBottom: 12
      }
    ],
    detailValues: [
      classNames.detailValues,
      {
        fontSize: '14px'
      }
    ],
    detailHex: [
      classNames.detailHex,
      {
        fontWeight: FontWeights.semibold,
        paddingRight: 8
      }
    ],
    detailCode: [
      classNames.detailCode,
      {
        display: 'inline-block'
      }
    ],
    detailCodeInfoIcon: [
      classNames.detailCodeInfoIcon,
      {
        position: 'relative',
        top: 2
      }
    ]
  };
};
