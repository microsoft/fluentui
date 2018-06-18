import * as React from 'react';

import { Label, ILabelStyleProps, ILabelStyles } from 'office-ui-fabric-react/lib/Label';
import './Label.Examples.scss';

// TODO: revert changes to this file. set as reference for TextField/mergeStyles work
export function getLabelStyles(props: ILabelStyleProps): ILabelStyles {
  return {
    root: [
      props.theme.fonts.large,
      {
        marginRight: 8,
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

export const LabelBasicExample = () => (
  <div>
    <Label>I'm a Label</Label>
    <Label disabled={true}>I'm a disabled Label</Label>
    <Label required={true}>I'm a required Label</Label>
    <Label styles={getLabelStyles}>I'm a JS styled Label</Label>
    <Label className="label-cssStyled">I'm a CSS styled Label</Label>
  </div>
);
