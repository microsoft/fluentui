import * as React from 'react';
import { TextBold24Regular, TextItalic24Regular, TextUnderline24Regular } from '@fluentui/react-icons';
import { Toolbar, ToolbarToggleButton, ToolbarProps } from '@fluentui/react-components';

export const ControlledToggleButton = () => {
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
      <ToolbarToggleButton aria-label="Bold" icon={<TextBold24Regular />} name="textOptions" value="bold" />
      <ToolbarToggleButton aria-label="Italic" icon={<TextItalic24Regular />} name="textOptions" value="italic" />
      <ToolbarToggleButton
        aria-label="Underline"
        icon={<TextUnderline24Regular />}
        name="textOptions"
        value="underline"
      />
    </Toolbar>
  );
};
