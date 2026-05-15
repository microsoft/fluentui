import * as React from 'react';
import { FileTypeIcon, getFileTypeIconAsUrl, getFileTypeIconProps } from '@fluentui/react-file-type-icons';

export const V8UtilityInterop = (): React.ReactElement => {
  const iconProps = getFileTypeIconProps({ extension: 'docx', size: 16, imageFileType: 'svg' });
  const iconUrl = getFileTypeIconAsUrl({ extension: 'docx', size: 16, imageFileType: 'svg' });

  return (
    <div>
      <div>
        <strong>Legacy utility output</strong>
      </div>
      <div>iconName: {iconProps.iconName}</div>
      <div>url: {iconUrl}</div>
      <div>
        <strong>Recommended component output</strong>
      </div>
      <div>
        <FileTypeIcon extension="docx" size={16} imageFileType="svg" /> <span>FileTypeIcon extension="docx"</span>
      </div>
    </div>
  );
};

V8UtilityInterop.parameters = {
  docs: {
    description: {
      story:
        'Shows parity between utility resolvers and component rendering. Prefer FileTypeIcon for new UI, and keep utility APIs for incremental migration paths.',
    },
  },
};
