import * as React from 'react';
import { TextBold24Regular, TextItalic24Regular, TextUnderline24Regular } from '@fluentui/react-icons';
import { Toolbar, ToolbarToggleButton, ToolbarProps } from '@fluentui/react-toolbar';

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
    <Toolbar checkedValues={checkedValues} onCheckedValueChange={onChange}>
      <ToolbarToggleButton
        aria-label="Text option - Bold"
        icon={<TextBold24Regular />}
        name="textOptions"
        value="bold"
      />
      <ToolbarToggleButton
        aria-label="Text option - Italic"
        icon={<TextItalic24Regular />}
        name="textOptions"
        value="italic"
      />
      <ToolbarToggleButton
        aria-label="Text option - Underline"
        icon={<TextUnderline24Regular />}
        name="textOptions"
        value="underline"
      />
    </Toolbar>
  );
};
