import * as React from 'react';
import { Markdown } from '@uifabric/example-app-base';
import { mergeStyleSets, DefaultPalette } from 'office-ui-fabric-react/lib/Styling';

const classNames = mergeStyleSets({
  root: {
    marginTop: -20,
    padding: 40
  },
  banner: {
    padding: '1px 20px',
    margin: -20,
    marginBottom: 20,
    borderBottom: '1px solid ' + DefaultPalette.neutralTertiaryAlt,
    selectors: {
      h1: { marginBottom: 0 },
      h3: { marginTop: 0, marginBottom: 20 }
    }
  }
});

export const GettingStartedPage: React.StatelessComponent = () => {
  return (
    <div className={classNames.root}>
      <div className={classNames.banner}>
        <h1>office-ui-fabric-react</h1>
        <h3>A library of reusable, generic React components</h3>
      </div>
      <Markdown>{require<string>('!raw-loader!./docs/GettingStartedOverview.md')}</Markdown>
    </div>
  );
};
