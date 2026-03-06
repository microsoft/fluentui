import { Button, FluentProvider } from '@fluentui/react-components';
import type { ButtonProps, ColumnDef } from '@fluentui/react-components';

type MyButtonProps = ButtonProps & {
  tooltip?: string;
};

const meta: { component: typeof Button } = {
  component: Button,
};

// Generic type usage — ColumnDef with type argument
type UserColumn = ColumnDef<{ name: string; age: number }>;
type ProductColumn = ColumnDef<{ id: number; price: number }>;

export const App = () => (
  <FluentProvider>
    <Button>Click</Button>
  </FluentProvider>
);
