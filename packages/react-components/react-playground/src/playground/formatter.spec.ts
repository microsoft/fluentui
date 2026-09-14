import { formatCode } from './formatter';

describe('formatter', () => {
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
