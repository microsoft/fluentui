import * as _ from 'lodash';
import * as React from 'react';

export type ExampleContextValue = {
  activeAnchorName: string;
  onExamplePassed: (anchorName: string) => void;
};

const ExampleContext = React.createContext<ExampleContextValue>({
  activeAnchorName: '',
  onExamplePassed: _.noop,
});

export default ExampleContext;
