import { FluentApiPathInfo } from '@fluentui/react-docgen-types';

export function getFluentComponentClassName(displayName: string, apiPathInfo: FluentApiPathInfo): string {
  const { isChild, subcomponentName, parentDisplayName } = apiPathInfo;
  return (isChild
    ? (subcomponentName || '').includes('Group')
      ? `ui-${parentDisplayName}s`
      : `ui-${parentDisplayName}__${subcomponentName}`
    : `ui-${displayName}`
  ).toLowerCase();
}
