import { formatCode, getFormatShortcutLabel } from './formatter';

describe('formatter', () => {
  it('returns the platform specific "Format Document" shortcut', () => {
    expect(getFormatShortcutLabel('Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/128.0')).toBe('Shift+Alt+F');
    expect(getFormatShortcutLabel('Mozilla/5.0 (X11; Linux x86_64) Chrome/128.0')).toBe('Ctrl+Shift+I');
    expect(getFormatShortcutLabel('Mozilla/5.0 (Linux; Android 14; Pixel 8) Chrome/128.0')).toBe('Shift+Alt+F');
    expect(getFormatShortcutLabel('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Safari/605.1')).toBe(
      'Shift+Option+F',
    );
    expect(getFormatShortcutLabel('')).toBe('Shift+Alt+F');
  });

  it('formats TSX with the repository prettier settings', async () => {
    const formatted = await formatCode(
      `import {Button} from "@fluentui/react-components"
export const Default = () => { return (<Button appearance = "primary"   size='large'>Hello</Button>) }
`,
    );

    expect(formatted).toBe(`import { Button } from '@fluentui/react-components';
export const Default = () => {
  return (
    <Button appearance="primary" size="large">
      Hello
    </Button>
  );
};
`);
  });

  it('rejects on syntax errors', async () => {
    await expect(formatCode('export const Default = () => <Button>Hello</Button')).rejects.toThrow(/'>' expected/);
  });
});
