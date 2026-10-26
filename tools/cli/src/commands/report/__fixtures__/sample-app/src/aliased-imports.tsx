import { Button as FluentButton, useToastController as useToast } from '@proj/react-components';
import type { ButtonProps as FluentButtonProps, ColumnDef as FluentColumnDef } from '@proj/react-components';

export type AliasedColumn = FluentColumnDef<string>;

export function AliasedImports(props: FluentButtonProps) {
  const { dispatchToast } = useToast();

  return <FluentButton onClick={dispatchToast}>{props.children}</FluentButton>;
}
