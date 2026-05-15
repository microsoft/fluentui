import * as React from 'react';
import { getFileTypeIconAsUrl, getFileTypeIconProps } from '@fluentui/react-file-type-icons';

export const V8UtilityInterop = (): React.ReactElement => {
  const iconProps = getFileTypeIconProps({ extension: 'docx', size: 16, imageFileType: 'svg' });
  const iconUrl = getFileTypeIconAsUrl({ extension: 'docx', size: 16, imageFileType: 'svg' });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div>
        <strong>Parameters:</strong>
      </div>
      <div>iconName: {iconProps.iconName}</div>
      <div>url: {iconUrl}</div>
      <div>
        <strong>Result:</strong>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <img src={iconUrl} alt="" width={16} height={16} />
        <span>&lt;img&gt; rendered from getFileTypeIconAsUrl</span>
      </div>
    </div>
  );
};

V8UtilityInterop.parameters = {
  docs: {
    description: {
      story: [
        'The `FileTypeIcon` component and the package&apos;s utility functions for v8 backwards compatibility share the same resolver, so an extension or `FileIconType` always maps to the same asset whichever entry point you use.',
        '',
        'Utility APIs preserved for back-compat with legacy Fluent v8 apps:',
        '',
        '- `getFileTypeIconProps` — returns `{ iconName }` for callers that still build icons through their own pipeline.',
        '- `getFileTypeIconAsUrl` — returns the resolved asset URL, useful for `<img>`, CSS `background-image`, or non-React surfaces.',
        '- `getFileTypeIconAsHTMLString` — returns an `<img>` HTML string for server-rendered or string-based templating contexts.',
        '- `initializeFileTypeIcons` — registers icon assets with the legacy icon font/registry. Not required when only `<FileTypeIcon>` is used.',
        '- `FileIconType` enum and `FileTypeIconMap` — exported unchanged so existing maps and switch statements keep compiling.',
        '',
        'For new code, prefer `<FileTypeIcon>`; reach for the utilities only when you need a raw URL/HTML string or are migrating an existing call site incrementally.',
      ].join('\n'),
    },
  },
};

V8UtilityInterop.storyName = 'v8 Compatibility';
