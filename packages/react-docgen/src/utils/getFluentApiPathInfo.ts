import * as path from 'path';
import { FluentApiPathInfo, ComponentFileInfo } from '@fluentui/react-docgen-types';
// This file MUST NOT depend on react-docgen-typescript (or local fork)!

export function getFluentApiPathInfo(
  displayName: string,
  absPath: string,
  fileInfo: ComponentFileInfo,
): FluentApiPathInfo {
  const dirname = path.basename(path.dirname(absPath));

  // add parent/child info
  const isParent = fileInfo.filenameWithoutExt === dirname;

  const isChild = !isParent;
  const parentDisplayName = isParent ? undefined : dirname;
  // "Field" for "FormField" since it is accessed as "Form.Field" in the API
  const subcomponentName = isParent ? undefined : displayName.replace(parentDisplayName!, '');

  // where this component should be exported in the api
  const apiPath = isChild ? `${parentDisplayName}.${subcomponentName}` : displayName;

  return {
    apiPath,
    isChild,
    isParent,
    parentDisplayName,
    subcomponentName,
  };
}
