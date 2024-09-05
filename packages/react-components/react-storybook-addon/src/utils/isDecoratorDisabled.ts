import type { FluentParameters, FluentStoryContext } from '../hooks';

type DecoratorName = NonNullable<FluentParameters['reactStorybookAddon']>['disabledDecorators'][number];

export function isDecoratorDisabled(context: FluentStoryContext, decoratorName: DecoratorName): boolean {
  return context.parameters.reactStorybookAddon?.disabledDecorators?.includes(decoratorName) ?? false;
}
