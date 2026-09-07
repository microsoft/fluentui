import * as React from 'react';
import type { JSXElement, ToolbarProps } from '@fluentui/react-components';
import { TextBoldRegular, TextItalicRegular, TextUnderlineRegular } from '@fluentui/react-icons';
import { Toolbar, ToolbarToggleButton } from '@fluentui/react-components';

export const ControlledToggleButton = (): JSXElement => {
  const [checkedValues, setCheckedValues] = React.useState<Record<string, string[]>>({
    textOptions: ['bold', 'italic'],
  });
  const onChange: ToolbarProps['onCheckedValueChange'] = (e, { name, checkedItems }) => {
    setCheckedValues(s => {
      return s ? { ...s, [name]: checkedItems } : { [name]: checkedItems };
    });
  };

  return (
    <Toolbar aria-label="with controlled Toggle Button" checkedValues={checkedValues} onCheckedValueChange={onChange}>
      <ToolbarToggleButton aria-label="Bold" icon={<TextBoldRegular />} name="textOptions" value="bold" />
      <ToolbarToggleButton aria-label="Italic" icon={<TextItalicRegular />} name="textOptions" value="italic" />
      <ToolbarToggleButton
        aria-label="Underline"
        icon={<TextUnderlineRegular />}
        name="textOptions"
        value="underline"
      />
    </Toolbar>
  );
};
