import { ISectionStyles, ISectionStyleProps } from './Section.types';
import { FontSizes, IStyle, DefaultPalette } from 'office-ui-fabric-react/lib/Styling';

// TODO, color should be returned from theme
export const getStyles = (props: ISectionStyleProps): ISectionStyles => {
  const { disabled, rowHeight, isEditMode } = props;

  const rowFlexContainer: IStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  };

  const textFieldOverwrite = {
    selectors: {
      '.ms-TextField-wrapper': {
        height: '100%'
      },
      '.ms-TextField-fieldGroup': {
        height: '100%'
      },
      '.ms-TextField-field': {
        padding: '0px 16px'
      }
    }
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
      margin: isEditMode ? '9px 16px' : '22px 0 0',
      color: DefaultPalette.black
      // when the section is displayed in the dashboard, we add extra top margin (22px) to make it closer to cards
    },
    addSectionTextField: [
      textFieldOverwrite,
      {
        width: '100%',
        marginTop: '24px', // TODO, this should be the margin prop in RGL
        // TODO, box Shadow should be merged with DashboardGridLayout.css
        boxShadow: '0 0.3px 0.9px rgba(0, 0, 0, 0.108), 0 1.6px 3.6px rgba(0, 0, 0, 0.132)'
      }
    ],
    renameSectionTextField: [textFieldOverwrite],
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
