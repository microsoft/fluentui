import * as React from 'react';
import { ITextFieldStyleProps, ITextFieldStyles, TextField } from 'office-ui-fabric-react/lib/TextField';
import { ILabelStyles, ILabelStyleProps } from 'office-ui-fabric-react/lib/Label';
import { Text } from 'office-ui-fabric-react/lib/Text';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import './TextField.Styled.Example.scss';

export const TextFieldStyledExample: React.StatelessComponent = () => {
  return (
    <Stack tokens={{ childrenGap: 15 }}>
      <Text styles={{ root: { maxWidth: 600 } }}>
        These examples show how components that used to be styled using CSS can be styled using JS styling. The preferred method is JS
        styling for several reasons: type safety for styling, more predictable behavior, and clear feedback via typing when component
        changes affect existing styling code.
      </Text>
      <TextField label="Theme Primary Label, Red Top Border (JS):" required styles={getStyles} />
      <TextField label="Theme Primary Label, Red Top Border (CSS):" required className="textField-cssStyled" />
    </Stack>
  );
};

function getStyles(props: ITextFieldStyleProps): Partial<ITextFieldStyles> {
  const { required } = props;
  return {
    fieldGroup: [
      { width: 300 },
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

/*
This is the SCSS used in the CSS styling example.
If exporting to CodePen, paste this into the CSS section.
-------------------------------------------------------------------------------------------
// In the real SCSS, these variables are defined elsewhere and adjusted based on the theme.
// The values provided below are from the default theme.
$errorTextColor: #a80000;
$ms-color-themePrimary: #0078d4;

.textField-cssStyled {
  .ms-TextField-fieldGroup {
    width: 300px;
    border-top-color: $errorTextColor;
  }
  .ms-Label {
    color: $ms-color-themePrimary;
  }
}
*/
