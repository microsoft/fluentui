import * as React from 'react';
import { Icons, TooltipLinkList, WithTooltip, IconButton } from '@storybook/components';
import { VERSION_ID } from './constants';

export interface VersionPickerItem {
  id: string;
  title: string;
  onClick: () => void;
  value: string;
  active: boolean;
}

function createVersionItems(value: VersionEntry[]): VersionPickerItem[] {
  return value.map(item => {
    return {
      id: item.version,
      title: item.version,
      onClick: () => {
        const href = `https://${item.commit}--${process.env.STORYBOOK_CHROMATIC_APPID}.chromatic.com`;
        window.parent.location.href = href;
      },
      value: item.version,
      active: process.env.STORYBOOK_PACKAGE_VERISION === item.version,
    };
  });
}

interface VersionEntry {
  version: string;
  commit: string;
}

export const VersionPicker = () => {
  const [versions, setVersions] = React.useState<VersionEntry[]>([]);

  React.useEffect(() => {
    fetch(`${process.env.STORYBOOK_VERSION_API_BASEURL}/api/GetVersions`)
      .then(res => res.json())
      .then(json => {
        setVersions(json);
      });
  }, []);

  const renderTooltip = React.useCallback(() => {
    return <TooltipLinkList links={createVersionItems(versions)} />;
  }, [versions]);

  return (
    <>
      <WithTooltip placement="top" trigger="click" closeOnClick tooltip={renderTooltip}>
        <IconButton key={VERSION_ID} title="Change Fluent theme">
          <Icons icon="chevrondown" />
          Version: {process.env.STORYBOOK_PACKAGE_VERISION}
        </IconButton>
      </WithTooltip>
    </>
  );
};
