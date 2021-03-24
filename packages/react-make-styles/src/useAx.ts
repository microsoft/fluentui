import { ax } from '@fluentui/make-styles';
import { useFluent } from '@fluentui/react-provider';

export function useAx(...classNames: (string | false | undefined)[]): string;

export function useAx(): string {
  const { dir } = useFluent();

  return ax(dir, arguments);
}
