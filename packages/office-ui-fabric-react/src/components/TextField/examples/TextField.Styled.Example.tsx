import * as React from 'react';
import { ITextFieldStyleProps, ITextFieldStyles, TextField } from 'office-ui-fabric-react/lib/TextField';
import { ILabelStyles, ILabelStyleProps } from 'office-ui-fabric-react/lib/Label';
import './TextField.Examples.scss';
import './TextField.Styled.Example.scss';

function getStyles(props: ITextFieldStyleProps): Partial<ITextFieldStyles> {
  const { required } = props;
  return {
    fieldGroup: [
      required && {
        borderTopColor: props.theme.semanticColors.errorText
      }
    ],
    subComponentStyles: {
      label: getLabelStyles
    }
  };
}

function getLabelStyles(props: ILabelStyleProps): ILabelStyles {
  const { required } = props;
  return {
    root: [
      required && {
        color: props.theme.palette.themePrimary
      }
    ]
  };
}

export class TextFieldStyledExample extends React.Component<any, any> {
  public render(): JSX.Element {
    return (
      <div className="docs-TextFieldExample">
        <TextField label="Theme Primary Label, Red Top Border (JS):" required={true} styles={getStyles} />
        <TextField label="Theme Primary Label, Red Top Border (CSS):" required={true} className="textField-cssStyled" />
      </div>
    );
  }
}
