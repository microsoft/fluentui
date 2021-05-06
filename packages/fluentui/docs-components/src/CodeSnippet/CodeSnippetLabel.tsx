import * as React from 'react';

import { useCopyToClipboard } from '../CopyToClipboard';
import { CodeSnippetProps } from './types';

type CopySnippetLabelProps = Pick<CodeSnippetProps, 'copyable' | 'label' | 'mode'> & {
  value: string;
};

const checkIcon = (
  <svg style={{ height: '.7rem', width: '0.7rem' }} viewBox="0 0 512 512">
    <path
      fill="currentColor"
      d="M461.6,109.6l-54.9-43.3c-1.7-1.4-3.8-2.4-6.2-2.4c-2.4,0-4.6,1-6.3,2.5L194.5,323c0,0-78.5-75.5-80.7-77.7  c-2.2-2.2-5.1-5.9-9.5-5.9c-4.4,0-6.4,3.1-8.7,5.4c-1.7,1.8-29.7,31.2-43.5,45.8c-0.8,0.9-1.3,1.4-2,2.1c-1.2,1.7-2,3.6-2,5.7  c0,2.2,0.8,4,2,5.7l2.8,2.6c0,0,139.3,133.8,141.6,136.1c2.3,2.3,5.1,5.2,9.2,5.2c4,0,7.3-4.3,9.2-6.2L462,121.8  c1.2-1.7,2-3.6,2-5.8C464,113.5,463,111.4,461.6,109.6z"
    />
  </svg>
);

const copyIcon = (
  <svg style={{ height: '.7rem', width: '0.7rem' }} viewBox="0 0 16 16">
    <path d="M2,0v1v2H0v13h13v-2h2h1V1V0H3H2z M15,1v12h-2V3H3V1H15z" fill="currentColor " />
  </svg>
);

export const CodeSnippetLabel: React.FunctionComponent<CopySnippetLabelProps> = props => {
  const { copyable, label, mode, value } = props;
  const hasLabel = label !== false;

  const [active, onCopy] = useCopyToClipboard(value);

  return (
    hasLabel && (
      <div
        onClick={copyable ? onCopy : undefined}
        style={{
          border: '1px solid #ccc',
          color: '#ccc',
          cursor: copyable ? 'pointer' : 'default',
          display: 'flex',
          fontSize: '0.8rem',
          fontFamily: 'monospace',
          lineHeight: 1,
          padding: '0.2rem 0.35rem',
          position: 'absolute',
          right: '0.8rem',
          top: '0.8rem',
          zIndex: 100,
        }}
        title={copyable ? 'Copy' : undefined}
      >
        <div>{label || mode}</div>
        {copyable && <div style={{ marginLeft: '5px' }}>{active ? checkIcon : copyIcon}</div>}
      </div>
    )
  );
};
