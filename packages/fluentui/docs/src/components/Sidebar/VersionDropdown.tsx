import * as React from 'react';
import { gt, lt } from 'semver';

import { Dropdown, DropdownProps, Flex } from '@fluentui/react-northstar';

const pkg = require('@fluentui/react-northstar/package.json');

export const FLUENT_NIGHTLY_VERSION = '0.0.0-nightly';

/**
 * A dropdown component that fetches available versions of the docsite from a hosted manifest file and renders available versions
 * Makes assumptions about docsite routing and hosting
 */
export function VersionDropdown() {
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

  const currentVersion = pkg.version;

  // We make assumptions about routing
  // https://<domain>/<version> should be the basename for each docsite in a multi version scenario
  const onChange = (_, data: DropdownProps) => {
    const versionInPath = window.location.pathname.split('/')[1];
    if (versionInPath === currentVersion || versionInPath === FLUENT_NIGHTLY_VERSION) {
      const newPath = window.location.pathname.replace(versionInPath, data.value as string);
      window.location.pathname = newPath;
    } else {
      window.location.pathname = `/${data.value}`;
    }
  };

  return (
    <Flex.Item align="stretch">
      <Dropdown
        fluid
        disabled={!versions.length}
        items={versions}
        onChange={onChange}
        // nightly released docsite's package.json is the latest version instead of '0.0.0-nightly'.
        // The checking here is for version dropdown to display correctly for '0.0.0-nightly'
        value={
          window.location.pathname.split('/')[1] === FLUENT_NIGHTLY_VERSION ? FLUENT_NIGHTLY_VERSION : currentVersion
        }
        aria-label="Choose Fluent UI version"
      />
    </Flex.Item>
  );
}

/** Schema for the manifest file as a type */
type VersionManifest = Record<string, boolean>;
