import { ax } from '@fluentui/make-styles';
import { useFluent } from '@fluentui/react-provider';

export function useAx(...classNames: (string | false | undefined)[]): string;

export function useAx(): string {
  const { dir } = useFluent();

  // arguments are parsed manually to avoid double loops as TS & Babel transforms rest via an additional loop
  // @see https://babeljs.io/docs/en/babel-plugin-transform-parameters
  // eslint-disable-next-line prefer-rest-params
  return ax(dir, (arguments as unknown) as string[]);
}
