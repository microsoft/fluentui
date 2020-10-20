import * as React from 'react';
import { Dropdown, DropdownProps } from '@fluentui/react-northstar';

const pkg = require('@fluentui/react-northstar/package.json');

export function VersionDropdown(props: { width: number }) {
  const currentVersion = pkg.version;
  window.sessionStorage.fluentuiDocsiteVersions = JSON.stringify(['0.51.0', '0.47.0']);

  if (
    !window.sessionStorage.fluentuiDocsiteVersions ||
    window.sessionStorage.fluentuiDocsiteVersions.indexOf(currentVersion) === -1
  ) {
    return null;
  }

  const items = [...JSON.parse(window.sessionStorage.fluentuiDocsiteVersions)];
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
