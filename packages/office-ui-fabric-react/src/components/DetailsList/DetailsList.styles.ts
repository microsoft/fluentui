import { IDetailsListStyleProps, IDetailsListStyles } from './DetailsList.types';
import {
  getFocusStyle,
  focusClear,
  FontClassNames,
  IStyle,
  getGlobalClassNames,
  HighContrastSelector,
  hiddenContentStyle,
  keyframes,
  FontSizes
} from '../../Styling';
import { IsFocusVisibleClassName } from '../../Utilities';

const GlobalClassNames = {
  tooltipHost: 'ms-TooltipHost',
  root: 'ms-DetailsHeader',
  cell: 'ms-DetailsHeader-cell',
  cellIsCheck: 'ms-DetailsHeader-cellIsCheck',
  collapseButton: 'ms-DetailsHeader-collapseButton',
  isCollapsed: 'is-collapsed',
  isAllSelected: 'is-allSelected',
  isSelectAllHidden: 'is-selectAllHidden',
  isResizingColumn: 'is-resizingColumn',
  cellSizer: 'ms-DetailsHeader-cellSizer',
  isResizing: 'is-resizing',
  dropHintCircleStyle: 'ms-DetailsHeader-dropHintCircleStyle',
  dropHintLineStyle: 'ms-DetailsHeader-dropHintLineStyle',
  cellTitle: 'ms-DetailsHeader-cellTitle',
  cellName: 'ms-DetailsHeader-cellName',
  filterChevron: 'ms-DetailsHeader-filterChevron'
};

export const getStyles = (props: IDetailsListStyleProps): IDetailsListStyles => {
  const { theme, className } = props;
  const { semanticColors, palette } = theme;
  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  return {
    root: [
      classNames.root,
      {
        position: 'relative',
        fontSize: FontSizes.small,
        background: semanticColors.listBackground,
        color: semanticColors.listText
      },
      className
    ],

    focusZone: [
      {
        display: 'inline-block',
        minWidth: '100%',
        minHeight: 1
      }
    ]
  };
};

// .focusZone {
//   display: inline-block;
//   min-width: 100%;
//   min-height: 1px;
// }

// .rootIsHorizontalConstrained {
//   overflow-x: auto;
//   overflow-y: visible;

//   -webkit-overflow-scrolling: touch;
// }

// /* Set the min height for a row to 38px so even rendering empty cells takes that space. */
// .root :global(.ms-List-cell) {
//   min-height: 38px;
//   word-break: break-word;
// }

// .rootCompact {
//   :global(.ms-List-cell) {
//     min-height: 32px;
//   }
// }

// /* Adding a fadding out overlay to emphasize that we don't know the number of items that will eventually be diplayed */
// .shimmerFadeOut {
//   &::after {
//     content: '';
//     position: absolute;
//     top: 0;
//     right: 0;
//     bottom: 0;
//     left: 0;
//     background-image: linear-gradient(
//       to bottom,
//       transparent 30%,
//       $ms-color-whiteTranslucent40 65%,
//       $ms-color-white 100%
//     );
//   }
// }
