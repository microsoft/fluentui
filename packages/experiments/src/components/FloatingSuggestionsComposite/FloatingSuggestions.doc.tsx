import * as React from 'react';
import { IDocPageProps } from 'office-ui-fabric-react/src/common/DocPage.types';

import { FloatingPeopleSuggestionsExample } from './examples/FloatingPeopleSuggestions.Example';

const FloatingPeoplePickerSuggestionsExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/FloatingSuggestionsComposite/examples/FloatingPeopleSuggestions.Example.tsx') as string;

export const FloatingPeopleSuggestionsCompositePageProps: IDocPageProps = {
  title: 'FloatingPeopleSuggestions',
  componentName: 'FloatingPeopleSuggestions',
  componentUrl:
    'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/experiments/src/components/FloatingSuggestionsComposite/FloatingPeopleSuggestions',
  examples: [
    {
      title: 'Floating people suggestions',
      code: FloatingPeoplePickerSuggestionsExampleCode,
      view: <FloatingPeopleSuggestionsExample />
    }
  ],
  propertiesTablesSources: [
    require<string>('!raw-loader!experiments/src/components/loatingSuggestionsComposite/FloatingPeopleSuggestions.types.ts')
  ],
  overview: '',
  bestPractices: '',
  isHeaderVisible: true,
  isFeedbackVisible: true
};
