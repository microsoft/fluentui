import * as React from 'react';
import { DebugPanelData } from './DebugPanelData';
import { filter } from './utils';
import { deepmerge } from '@fluentui/styles';

interface DebugPanelItemProps {
  data: any;
  valueKey?: string;
  commentKey?: string;
  idKey?: string;
  commentKeyPredicate?: (val: any) => boolean;
}

export const DebugPanelItem: React.FC<DebugPanelItemProps> = props => {
  const [value, setValue] = React.useState('');
  const { data: propData, valueKey, commentKey, commentKeyPredicate, idKey } = props;

  const reversedData = JSON.parse(JSON.stringify(propData)).reverse();

  const data = valueKey ? reversedData.map(v => v[valueKey]) : reversedData;
  const comments = commentKey ? reversedData.map(v => v[commentKey]) : [];
  const ids = idKey ? reversedData.map(v => v[idKey]) : [];

  const mergedThemes = [];

  mergedThemes.push({}); // init

  for (let i = 1; i < data.length; i++) {
    mergedThemes.push(deepmerge(mergedThemes[i - 1], data[i - 1]));
  }

  return (
    <>
      <input
        onChange={e => setValue(e.target.value)}
        style={{
          padding: '2px 4px',
          marginBottom: '4px',
          width: '100%',
          border: '1px solid #ccc',
          background: 'none',
        }}
        placeholder="Filter"
      />
      {data.map((theme, idx) => {
        const filteredTheme = value === '' ? theme : filter(theme, value);

        return (
          <pre
            key={idx}
            style={{
              position: 'relative',
              marginBottom: '4px',
              borderTop: idx > 0 ? '1px solid #ddd' : 'none',
            }}
          >
            {ids && ids[idx] && <div style={{ position: 'absolute', right: 0, color: '#707070' }}>{ids[idx]}</div>}
            <DebugPanelData
              data={filteredTheme}
              comments={comments[idx]}
              commentKeyPredicate={commentKeyPredicate}
              overrides={mergedThemes[idx]}
              highlightKey={value}
            />
          </pre>
        );
      })}
    </>
  );
};
