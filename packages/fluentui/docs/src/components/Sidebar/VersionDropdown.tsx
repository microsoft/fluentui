import * as React from 'react';
import { Dropdown, DropdownProps } from '@fluentui/react-northstar';
import { gt, lt } from 'semver';

const pkg = require('@fluentui/react-northstar/package.json');

/**
 * A dropdown component that fetches available versions of the docsite from a hosted manifest file and renders available versions
 * Makes assumptions about docsite routing and hosting
 *
 * @param props Component props
 */
export function VersionDropdown(props: { width: number }) {
  const [versions, setVersions] = React.useState<string[]>([]);
  React.useEffect(() => {
    fetch('/manifest.json') // Assume that the manifest is hosted in the same blob storage
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        // No need to do anything apart from fail silently for now
        return {};
      })
      .then((manifest: VersionManifest) => {
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

  const currentVersion = pkg.version;

  // We make assumptions about routing
  // https://<domain>/<version> should be the basename for each docsite in a multi version scenario
  const onChange = (_, data: DropdownProps) => {
    const versionInPath = window.location.pathname.split('/')[1];
    if (versionInPath === currentVersion || versionInPath === '0.0.0-nightly') {
      const newPath = window.location.pathname.replace(versionInPath, data.value as string);
      window.location.pathname = newPath;
    } else {
      window.location.pathname = `/${data.value}`;
    }
  };

  return (
    <Dropdown
      variables={{ width: `${props.width}px` }}
      items={versions}
      onChange={onChange}
      value={window.location.pathname.split('/')[1] === '0.0.0-nightly' ? '0.0.0-nightly' : currentVersion}
      aria-label="Choose fluent version"
    />
  );
}

/** Schema for the manifest file as a type */
type VersionManifest = Record<string, boolean>;
