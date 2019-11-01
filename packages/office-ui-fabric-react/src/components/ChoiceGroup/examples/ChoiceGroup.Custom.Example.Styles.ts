import { IStyle } from '@uifabric/styling';

interface IChoiceGroupCustomExampleStyles {
  root?: IStyle;
  dropdown: IStyle;
}

const choiceGroupCustomExampleStyle: IChoiceGroupCustomExampleStyles = {
  root: {
    display: 'flex',
    alignItems: 'baseline'
  },
  dropdown: {
    marginBottom: '0px',
    marginLeft: '5px'
  }
};

export { choiceGroupCustomExampleStyle, IChoiceGroupCustomExampleStyles };
