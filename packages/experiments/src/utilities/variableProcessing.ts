export type IComponentStyleVariables<TComponentViewProps, TComponentStyleVariablesTypes> =
  | TComponentStyleVariablesTypes
  | ((props: TComponentViewProps) => TComponentStyleVariablesTypes)
  | undefined;

export function resolveStyleVariables<
  TViewProps,
  TStyleVariablesTypes,
  TStyleVariables extends IComponentStyleVariables<TViewProps, TStyleVariablesTypes>
>(props: TViewProps, ...variableArray: TStyleVariables[]): TStyleVariablesTypes {
  return Object.assign(
    {},
    ...variableArray.map(variables => (typeof variables === 'function' ? (variables as Function)(props) : variables))
  );
}
