import { ITextFieldStyleProps, ITextFieldStyles, getGlobalClassNames } from '../..';

const GlobalClassNames = {
  root: 'ms-TextField',
  wrapper: 'ms-TextField-wrapper',
  fieldGroup: 'ms-TextField-fieldGroup',
  prefix: 'ms-TextField-prefix',
  suffix: 'ms-TextField-suffix',
  errorMessage: 'ms-TextField-errorMessage',
  description: 'ms-TextField-description',
  field: 'ms-TextField-field',
};

export const getStyles = (props: ITextFieldStyleProps): ITextFieldStyles => {
  const { className, theme } = props;
  // const { palette } = theme;
  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  return {
    root: [
      classNames.root,
      className
    ],
    wrapper: [
      classNames.wrapper
    ],
    fieldGroup: [
      classNames.fieldGroup
    ],
    prefix: [
      classNames.prefix
    ],
    suffix: [
      classNames.suffix
    ],
    errorMessage: [
      classNames.errorMessage
    ],
    description: [
      classNames.description
    ],
    field: [
      classNames.field
    ]
  };
};