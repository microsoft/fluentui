import * as React from 'react';
import { Dropdown, DropdownProps } from '@fluentui/react-northstar';
import { gt, lt } from 'semver';

const pkg = require('@fluentui/react-northstar/package.json');

export function VersionDropdown(props: { width: number }) {
  const currentVersion = pkg.version;
  const [versions, setVersions] = React.useState<string[]>([]);
  React.useEffect(() => {
    fetch('/manifest.json')
      .then(res => res.json())
      .then(manifest => {
        const availableVersions = Object.keys(manifest).reduce((versions, version) => {
          if (manifest[version]) {
            versions.push(version);
          }

          return versions;
        }, []);

        availableVersions.sort((a, b) => {
          if (gt(a, b)) return -1;
          if (lt(a, b)) return 1;
          return 0;
        });

        setVersions(availableVersions);
      });
  }, []);

  if (!versions.length) {
    return null;
  }

  // We make assumptions about routing
  // https://<domain>/<version> should be the basename for each docsite in a multi version scenario
  const onChange = (_, data: DropdownProps) => {
    if (window.location.pathname.split('/')[1] === currentVersion) {
      const newPath = window.location.pathname.replace(currentVersion, data.value as string);
      window.location.pathname = newPath;
    } else {
      window.location.pathname = `/${data.value}`;
    }
  };

  return (
    <Dropdown
      variables={{ width: `${props.width}px` }}
      placeholder="Select package version"
      items={versions}
      onChange={onChange}
      value={currentVersion}
    />
  );
}
