import * as React from 'react';
import { TextField } from '@fluentui/react/lib/TextField';
import { useBoolean } from '@fluentui/react-hooks';
import { lorem } from '@fluentui/example-data';
import { Stack, IStackProps, IStackStyles } from '@fluentui/react/lib/Stack';

const stackStyles: Partial<IStackStyles> = { root: { width: 650 } };
const stackTokens = { childrenGap: 50 };
const dummyText: string = lorem(100);
const columnProps: Partial<IStackProps> = {
  tokens: { childrenGap: 15 },
  styles: { root: { width: 300 } },
};

export const TextFieldMultilineExample: React.FunctionComponent = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [multiline, { toggle: toggleMultiline }] = useBoolean(false);

  const onChange = (_: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newText: string): void => {
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
        {/*
        When using autoAdjustHeight, if the TextField extends past the container's height and the container allows
        scrolling, deleting a line scrolls the container to the top. To avoid this, use the scrollable container's ref
        in scrollContainerRef to preserve the scrollTop property.
        */}
        <div ref={containerRef} style={{ maxHeight: '300px', overflowY: 'scroll' }}>
          <TextField label="With auto adjusting height" multiline autoAdjustHeight scrollContainerRef={containerRef} />
        </div>
        <TextField
          label="Switches from single to multiline if more than 50 characters are entered"
          multiline={multiline}
          // eslint-disable-next-line react/jsx-no-bind
          onChange={onChange}
        />
      </Stack>
    </Stack>
  );
};
