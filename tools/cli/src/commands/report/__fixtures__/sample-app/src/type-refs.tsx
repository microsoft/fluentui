import { Button, FluentProvider } from '@fluentui/react-components';
import type { ButtonProps } from '@fluentui/react-components';

type MyButtonProps = ButtonProps & {
  tooltip?: string;
};

const meta: { component: typeof Button } = {
  component: Button,
};

export const App = () => (
  <FluentProvider>
    <Button>Click</Button>
  </FluentProvider>
);
