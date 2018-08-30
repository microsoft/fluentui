import { ISectionStyles, ISectionStyleProps } from './Section.types';
import { FontSizes, IStyle } from 'office-ui-fabric-react/lib/Styling';

// TODO, color should be returned from theme
export const getStyles = (props: ISectionStyleProps): ISectionStyles => {
  const { disabled, rowHeight } = props;

  const rowFlexContainer: IStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  };

  return {
    root: [
      rowFlexContainer,
      {
        width: '100%',
        justifyContent: 'space-between',
        cursor: disabled ? '' : 'move',
        selectors: {
          ':hover': {
            backgroundColor: disabled ? '' : '#eaeaea'
          }
        }
      }
    ],
    sectionTitle: {
      fontSize: FontSizes.medium,
      fontWeight: '600',
      margin: '9px 16px'
    },
    editTitleTextField: [
      {
        width: '100%',
        marginTop: '24px', // TODO, this should be the margin prop in RGL
        // TODO, box Shadow should be merged with DashboardGridLayout.css
        boxShadow: '0 0.3px 0.9px rgba(0, 0, 0, 0.108), 0 1.6px 3.6px rgba(0, 0, 0, 0.132)'
      }
    ],
    actions: [rowFlexContainer],
    actionButton: {
      height: rowHeight,
      width: rowHeight
    },
    actionButtonDisabled: {
      backgroundColor: 'transparent'
    },
    actionButtonHovered: {
      backgroundColor: '#D0D0D0',
      color: 'black'
    },
    actionButtonPressed: {
      backgroundColor: '#979797'
    }
  };
};
