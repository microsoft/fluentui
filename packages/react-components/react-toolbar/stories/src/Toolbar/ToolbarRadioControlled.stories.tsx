import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { AlignCenterHorizontalRegular, AlignLeftRegular, AlignRightRegular } from '@fluentui/react-icons';
import { Toolbar, ToolbarRadioButton, ToolbarRadioGroup } from '@fluentui/react-components';
import type { ToolbarProps } from '@fluentui/react-components';

export const ControlledRadio = (props: Partial<ToolbarProps>): JSXElement => {
  const [checkedValues, setCheckedValues] = React.useState<Record<string, string[]>>({
    textOptions: ['center'],
  });

  const onChange: ToolbarProps['onCheckedValueChange'] = (e, { name, checkedItems }) => {
    setCheckedValues(s => {
      return s ? { ...s, [name]: checkedItems } : { [name]: checkedItems };
    });
  };

  return (
    <Toolbar aria-label="with controlled Radio Button" checkedValues={checkedValues} onCheckedValueChange={onChange}>
      <ToolbarRadioGroup>
        <ToolbarRadioButton aria-label="Align left" name="textOptions" value="left" icon={<AlignLeftRegular />} />
        <ToolbarRadioButton
          aria-label="Align Center"
          name="textOptions"
          value="center"
          icon={<AlignCenterHorizontalRegular />}
        />
        <ToolbarRadioButton aria-label="Align Right" name="textOptions" value="right" icon={<AlignRightRegular />} />
      </ToolbarRadioGroup>
    </Toolbar>
  );
};
