import * as React from 'react';
import { Markdown } from '@fluentui/react-docsite-components';
import { mergeStyles } from '@fluentui/react/lib/Styling';

const rootClass = mergeStyles({
  marginTop: -20,
  padding: 40,
});

export const GettingStartedPage: React.FunctionComponent = () => {
  return (
    <div className={rootClass}>
      <Markdown>{require<string>('!raw-loader?esModule=false!@fluentui/react-charting/README.md')}</Markdown>
    </div>
  );
};
