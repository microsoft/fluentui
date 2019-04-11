import { IMicrofeedbackComponent, IMicrofeedbackStylesReturnType, IMicrofeedbackTokenReturnType } from './Microfeedback.types';
import { getGlobalClassNames } from '../../Styling';

const GlobalClassNames = {
  root: 'ms-Microfeedback',
  text: 'ms-Microfeedback-text'
};

export const MicrofeedbackTokens: IMicrofeedbackComponent['tokens'] = (props, theme): IMicrofeedbackTokenReturnType => [];

export const MicrofeedbackStyles: IMicrofeedbackComponent['styles'] = (props, theme, tokens): IMicrofeedbackStylesReturnType => {
  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  return {
    root: [
      classNames.root,
      {
        borderWidth: '1px',
        borderStyle: 'solid',
        margin: 8,
        padding: 8
      }
    ]
  };
};
