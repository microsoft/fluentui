import * as React from 'react';

export interface IShowOnlyExamplesContext {
  showOnlyExamples: boolean;
}

export const ShowOnlyExamplesContext = React.createContext<IShowOnlyExamplesContext>({
  showOnlyExamples: false
});
