import * as React from 'react';
import { find, isOverridden } from './utils';

interface DebugPanelDataProps {
  data: any;
  overrides?: any;
  comments?: any;
  indent?: number;
  highlightKey?: string;
  commentKeyPredicate?: (val: any) => boolean;
}

export const DebugPanelData: React.FC<DebugPanelDataProps> = props => {
  const { data, indent = 2, highlightKey, overrides, comments, commentKeyPredicate } = props;

  const isValidComment = typeof comments === 'string' && commentKeyPredicate && commentKeyPredicate(comments);

  if (typeof data === 'undefined') {
    return isValidComment ? <abbr title={comments}>undefined</abbr> : <span>undefined</span>;
  }

  if (data === null || typeof data !== 'object') {
    return isValidComment ? <abbr title={comments}>{JSON.stringify(data)}</abbr> : <span>{JSON.stringify(data)}</span>;
  }

  return (
    <>
      {'{'}
      {Object.keys(data).map((key, idx) => {
        const value = data[key];

        const comment = comments && comments[key];

        const highlight = find(data, key, highlightKey);
        const overridden = isOverridden(data, key, overrides);

        return (
          <div key={key}>
            <span style={{ background: highlight ? 'rgb(255,255,224)' : '' }}>
              {' '.repeat(indent)}
              <span style={{ textDecoration: overridden ? 'line-through' : 'none' }}>
                <span style={{ color: typeof value === 'object' ? 'grey' : '#b82519' }}>{key}</span>
                {': '}
                <DebugPanelData
                  data={value}
                  comments={comment}
                  commentKeyPredicate={commentKeyPredicate}
                  indent={indent + 2}
                  overrides={overrides ? overrides[key] : null}
                  highlightKey={highlightKey}
                />
              </span>
              {','}
            </span>
          </div>
        );
      })}
      {`${indent > 2 ? ' '.repeat(indent - 2) : ''}}`}
    </>
  );
};
