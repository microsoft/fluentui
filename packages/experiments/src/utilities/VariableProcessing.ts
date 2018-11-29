export type IComponentStyleVariables<TComponentViewProps, TComponentStyleVariablesTypes> =
  | TComponentStyleVariablesTypes
  | ((props: TComponentViewProps) => TComponentStyleVariablesTypes)
  | undefined;

export function resolveStyleVariables<
  TViewProps,
  TStyleVariablesTypes,
  TStyleVariables extends IComponentStyleVariables<TViewProps, TStyleVariablesTypes>
>(props: TViewProps, componentStyleVariables: TStyleVariablesTypes, userStyleVariables: TStyleVariables): TStyleVariablesTypes {
  if (typeof userStyleVariables === 'function') {
    componentStyleVariables = { ...(componentStyleVariables as any), ...(userStyleVariables as Function)(props) };
  } else if (userStyleVariables !== undefined) {
    componentStyleVariables = { ...(componentStyleVariables as any), ...(userStyleVariables as any) };
  }

  return componentStyleVariables;
}
