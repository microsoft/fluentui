import { IEditSectionsStyles } from './Section.types';

export const getStyles = (): IEditSectionsStyles => {
  return {
    root: {
      width: '100%'
    },
    rightAlignedFlexContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      width: '100%'
    },
    icon: {
      color: 'black'
    },
    addButton: {
      color: 'black',
      margin: '12px 0'
    },
    saveButton: {
      color: 'black',
      margin: '12px 0'
    },
    cancelButton: {
      color: 'black',
      margin: '12px 0'
    }
  };
};
