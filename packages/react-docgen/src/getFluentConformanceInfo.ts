import { ComponentFileInfo, FluentApiPathInfo, FluentComponentInfo } from '@fluentui/react-docgen-types';
import { getComponentFileInfo, getFluentApiPathInfo, getFluentComponentClassName, getDocBlock } from './utils/index';
// This file MUST NOT depend on react-docgen-typescript (or local fork)!

/**
 * Component info used in Fluent UI conformance tests.
 */
export type FluentConformanceInfo = ComponentFileInfo &
  FluentApiPathInfo &
  Pick<FluentComponentInfo, 'componentClassName' | 'docblock'>;

/**
 * Basic component info also used in the conformance tests (no dependency on `react-docgen-typescript`).
 * @param displayName - Component name
 * @param absPath - Path to the component's file
 */
export function getFluentConformanceInfo(displayName: string, absPath: string): FluentConformanceInfo {
  const fileInfo = getComponentFileInfo(absPath);
  const apiPathInfo = getFluentApiPathInfo(displayName, absPath, fileInfo);

  return {
    ...fileInfo,
    ...apiPathInfo,
    componentClassName: getFluentComponentClassName(displayName, apiPathInfo),
    docblock: getDocBlock(absPath),
  };
}
