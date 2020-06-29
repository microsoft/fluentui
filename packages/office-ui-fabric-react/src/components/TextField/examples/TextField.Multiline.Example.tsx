import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { useBoolean } from '@uifabric/react-hooks';
import { lorem } from '@uifabric/example-data';
import { Stack, IStackProps, IStackStyles } from 'office-ui-fabric-react/lib/Stack';

const stackStyles: Partial<IStackStyles> = { root: { width: 650 } };
const stackTokens = { childrenGap: 50 };
const dummyText: string = lorem(100);
const columnProps: Partial<IStackProps> = {
  tokens: { childrenGap: 15 },
  styles: { root: { width: 300 } },
};

export const TextFieldMultilineExample: React.FunctionComponent = () => {
  const [multiline, { toggle: toggleMultiline }] = useBoolean(false);
  const onChange = (ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newText: string): void => {
    const newMultiline = newText.length > 50;
    if (newMultiline !== multiline) {
      toggleMultiline();
    }
  };
  return (
    <Stack horizontal tokens={stackTokens} styles={stackStyles}>
      <Stack {...columnProps}>
        <TextField label="Standard" multiline rows={3} />
        <TextField label="Disabled" multiline rows={3} disabled defaultValue={dummyText} />
        <TextField label="Non-resizable" multiline resizable={false} />
      </Stack>

      <Stack {...columnProps}>
        <TextField label="With auto adjusting height" multiline autoAdjustHeight />
        <TextField
          label="Switches from single to multiline if more than 50 characters are entered"
          multiline={multiline}
          onChange={onChange}
        />
      </Stack>
    </Stack>
  );
};
