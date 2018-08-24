import { IEditSectionsStyles } from './Section.types';

export const getStyles = (): IEditSectionsStyles => {
  return {
    root: {
      padding: '20px'
    },
    rightAlignedFlexContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      width: '100%'
    },
    addButton: [
      'ms-dashboard-section-add-button',
      {
        selectors: {
          '.ms-Button-icon': {
            color: 'black'
          }
        }
      }
    ],
    saveButton: [
      'ms-dashboard-section-save-button',
      {
        selectors: {
          '.ms-Button-icon': {
            color: 'black'
          }
        }
      }
    ],
    cancelButton: [
      'ms-dashboard-section-cancel-button',
      {
        selectors: {
          '.ms-Button-icon': {
            color: 'black'
          }
        }
      }
    ]
  };
};
