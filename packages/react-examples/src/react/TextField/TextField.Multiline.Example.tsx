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
  const [multiline, { toggle: toggleMultiline }] = useBoolean(false);
  const [containerScroll, setContainerScroll] = React.useState<number | undefined>();
  const [value, setValue] = React.useState<string>();
  const containerRef = React.useRef<HTMLDivElement>(null);
  const onChange = (ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newText: string): void => {
    const newMultiline = newText.length > 50;
    if (newMultiline !== multiline) {
      toggleMultiline();
    }
  };
  const onMultilineChange = React.useCallback(
    (ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
      setValue(ev.currentTarget.value);
      setContainerScroll(containerRef.current?.scrollTop);
    },
    [containerRef],
  );
  const onAdjustHeight = React.useCallback(
    (_screenHeight: number) => {
      if (containerRef.current && containerScroll) {
        containerRef.current.scrollTop = containerScroll;
      }
    },
    [containerRef, containerScroll],
  );

  return (
    <div ref={containerRef} style={{ height: 600, overflowY: 'scroll' }}>
      <Stack horizontal tokens={stackTokens} styles={stackStyles}>
        <Stack {...columnProps}>
          <TextField label="Standard" multiline rows={3} />
          <TextField label="Disabled" multiline rows={3} disabled defaultValue={dummyText} />
          <TextField label="Non-resizable" multiline resizable={false} />
        </Stack>

        <Stack {...columnProps}>
          <TextField
            label="With auto adjusting height"
            value={value}
            onChange={onMultilineChange}
            multiline
            autoAdjustHeight
            onAdjustHeight={onAdjustHeight}
          />
          <TextField
            label="Switches from single to multiline if more than 50 characters are entered"
            multiline={multiline}
            // eslint-disable-next-line react/jsx-no-bind
            onChange={onChange}
          />
        </Stack>
      </Stack>
    </div>
  );
};
