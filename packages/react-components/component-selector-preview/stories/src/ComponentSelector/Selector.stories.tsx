import * as React from 'react';

import {
  ComponentSelector,
  componentsDefinitions,
  groups,
  questions,
  attributesMapping,
} from '@fluentui/component-selector-preview';

export const Selector = () => {
  const componentsDefinitionsValues = React.useMemo(
    () => Object.entries(componentsDefinitions).map(([key, value]) => value),
    [],
  );
  return (
    <ComponentSelector
      componentsDefinitions={componentsDefinitionsValues}
      groups={groups}
      questions={questions}
      attributesMapping={attributesMapping}
      // componentsImages={componentsImages}
    />
  );
};
