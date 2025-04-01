import * as React from 'react';

import * as componentsDefinitions from './components-definitions/index';
import groups from './selection-logic/Groups.json';
import questions from './selection-logic/Questions.json';
import attributesMapping from './selection-logic/AttributesMapping.json';
import * as componentsImages from './components-images/index';

import { ComponentSelector } from './ComponentSelector';

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
      componentsImages={componentsImages}
    />
  );
};
