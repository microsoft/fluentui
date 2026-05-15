import * as React from 'react';
import { getFileTypeIconAsUrl, getFileTypeIconProps } from '@fluentui/react-file-type-icons';

export const V8UtilityInterop = (): React.ReactElement => {
  const iconProps = getFileTypeIconProps({ extension: 'docx', size: 16, imageFileType: 'svg' });
  const iconUrl = getFileTypeIconAsUrl({ extension: 'docx', size: 16, imageFileType: 'svg' });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <section>
        <h3 style={{ margin: 0 }}>
          {`getFileTypeIconProps({ extension: 'docx', size: 16, imageFileType: 'svg' })`} returns:
        </h3>
        <pre style={{ marginLeft: 16 }}>{JSON.stringify(iconProps, null, 2)}</pre>
      </section>
      <section>
        <h3 style={{ margin: 0 }}>
          {`getFileTypeIconAsUrl({ extension: 'docx', size: 16, imageFileType: 'svg' })`} returns:
        </h3>
        <div style={{ marginLeft: 16 }}>url: {iconUrl}</div>
      </section>
      <section>
        <h3 style={{ margin: 0 }}>Use with {`<img>`} tag:</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 16 }}>
          <img src={iconUrl} alt="" width={16} height={16} />
          <span>&lt;img&gt; rendered from getFileTypeIconAsUrl</span>
        </div>
      </section>
    </div>
  );
};

V8UtilityInterop.parameters = {
  docs: {
    description: {
      story: [
        'Utility functions retained from `@fluentui/react-file-type-icons` v8 share the same resolver as the v9 `FileTypeIcon` component, so an extension or `FileIconType` always maps to the same asset whichever entry point you use. They exist to keep existing call sites compiling during a v8 → v9 migration.',
        '',
        '- `getFileTypeIconAsUrl` — resolved asset URL. Use for `<img>`, CSS `background-image`, or non-React surfaces.',
        '- `getFileTypeIconAsHTMLString` — `<img>` HTML string. Use for server-rendered or string-templating contexts.',
        '- `getFileTypeIconProps` — `{ iconName }` for callers that still pipe icon names through their own renderer.',
        '',
        'Also exported for source-compat only: `initializeFileTypeIcons` (registers assets with the legacy icon registry — only needed if you still render via the v8 `<Icon>` component), `FileIconType` enum, and `FileTypeIconMap`.',
        '',
        'For new code, prefer `<FileTypeIcon>`; reach for the utilities only when you need a raw URL/HTML string or are migrating an existing call site incrementally.',
      ].join('\n'),
    },
  },
};

V8UtilityInterop.storyName = 'v8 Compatibility';
