import * as React from 'react';
import { Dropdown, DropdownProps } from '@fluentui/react-northstar';

const pkg = require('@fluentui/react-northstar/package.json');

export function VersionDropdown(props: { width: number }) {
  const currentVersion = pkg.version;

  if (
    !window.sessionStorage.fluentuiDocsiteVersions ||
    window.sessionStorage.fluentuiDocsiteVersions.indexOf(currentVersion) === -1
  ) {
    return null;
  }

  const items = [...JSON.parse(window.sessionStorage.fluentuiDocsiteVersions)];

  // We make assumptions about routing
  // https://<domain>/<version> should be the basename for each docsite in a multi version scenario
  const onChange = (_, data: DropdownProps) => (window.location.pathname = `/${data.value}`);

  return (
    <Dropdown
      variables={{ width: `${props.width}px` }}
      placeholder="Select package version"
      items={items}
      onChange={onChange}
      value={currentVersion}
    />
  );
}
