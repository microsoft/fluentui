import { AllRenderTypes, ScenarioRenderTypes } from '@fluentui/scripts-tasks';
/**
 * You don't have to add scenarios to this structure unless
 * you want their render types to differ from the default (mount only).
 *
 * Note:
 * You should not need to have virtual-rerender tests in most cases because mount test provides enough coverage.
 * It is mostly usefual for cases where component has memoization logics. And in case of re-rendering,
 * memoization logic help avoid certain code paths.
 */

export const scenarioRenderTypes: ScenarioRenderTypes = {
  FluentProviderWithTheme: AllRenderTypes,
};
