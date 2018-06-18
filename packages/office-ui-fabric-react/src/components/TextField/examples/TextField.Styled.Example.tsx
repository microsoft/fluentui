import * as React from 'react';
import { ITextFieldStyleProps, ITextFieldStyles, TextField } from 'office-ui-fabric-react/lib/TextField';
import { ILabelStyles, ILabelStyleProps } from 'office-ui-fabric-react/lib/Label';
import './TextField.Examples.scss';
import './TextField.Styled.Example.scss';

function getStyles(props: ITextFieldStyleProps): ITextFieldStyles {
  return {
    fieldGroup: [
      {
        borderTopColor: props.theme.semanticColors.errorText
      }
    ]
  };
}

// TODO: need to figure out how to pass this in with getStyles
function getLabelStyles(props: ILabelStyleProps): ILabelStyles {
  return {
    root: [
      props.theme.fonts.large,
      {
        marginRight: 80,
        paddingLeft: 12,
        paddingRight: 0,
        lineHeight: '22px'
      }
    ],
    text: [
      {
        color: props.theme.palette.neutralTertiary
      }
    ]
  };
}

export class TextFieldStyledExample extends React.Component<any, any> {
  public render(): JSX.Element {
    return (
      <div className="docs-TextFieldExample">
        <TextField label="Grey Test Text, Red Label, Red Top Border (JS):" styles={getStyles} />
        <TextField label="Grey Test Text, Red Label, Red Top Border (CSS):" className="textField-cssStyled" />
      </div>
    );
  }
}
