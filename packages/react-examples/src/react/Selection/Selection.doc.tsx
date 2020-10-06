import * as React from 'react';
import { IDocPageProps } from '@fluentui/react-internal/lib/common/DocPage.types';
import { SelectionBasicExample } from './Selection.Basic.Example';

const SelectionBasicExampleCode = require('!raw-loader!@fluentui/react-examples/src/react/Selection/Selection.Basic.Example.tsx') as string;

export const SelectionPageProps: IDocPageProps = {
  title: 'Selection',
  componentName: 'SelectionExample',
  componentUrl: 'https://github.com/microsoft/fluentui/tree/master/packages/react/src/utilities/selection',
  examples: [
    {
      title: 'Basic Selection Example',
      code: SelectionBasicExampleCode,
      view: <SelectionBasicExample />,
    },
  ],
  overview: require<string>('!raw-loader!@fluentui/react-examples/src/react/Selection/docs/SelectionOverview.md'),
  isHeaderVisible: true,
};
