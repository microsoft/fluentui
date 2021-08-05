import * as _ from 'lodash';
import * as PropTypes from 'prop-types';
import * as React from 'react';

import { exampleIndexContext } from '../../contexts/exampleIndexContext';

import { List, Segment } from '@fluentui/react-northstar';
import { componentAPIs } from './ComponentSourceManager';

import ContributionPrompt from './ContributionPrompt';

interface ComponentExamplesProps {
  displayName: string;
}

function getExamplesElement(displayName: string) {
  // rule #1
  const indexPath = _.find(exampleIndexContext.keys(), path => new RegExp(`\/${displayName}\/index\.tsx$`).test(path));
  if (!indexPath) {
    return null;
  }

  const ExamplesElement = React.createElement(exampleIndexContext(indexPath).default) as any;
  if (!ExamplesElement) {
    return null;
  }

  return ExamplesElement;
}

export class ComponentExamples extends React.Component<ComponentExamplesProps, any> {
  static propTypes = {
    displayName: PropTypes.string.isRequired,
  };

  render() {
    return this.renderExamples();
  }

  /**
   * RULES for a component with displayName=MyComponent:
   * 1. create a file at ./docs/src/examples/components/MyComponent/index.tsx referencing all MyComponent examples (except for Usage examples)
   * 2. all example file names must contain the word 'Example'; e.g.: MyComponentExampleCircular.tsx
   * 3. all example files must be under ./docs/src/examples/components/MyComponent path; e.g.: ./docs/src/examples/components/MyComponent/SomeType/SomeExample.tsx
   * 4. for every ./docs/src/examples/components/{...}/{...}MyComponent{...}Example{...}.tsx there needs to be a shorthand version of it:
   *              ./docs/src/examples/components/{...}/{...}MyComponent{...}Example{...}.shorthand.tsx
   */
  renderExamples = (): JSX.Element | null => {
    const { displayName } = this.props;

    const ExamplesElement = getExamplesElement(displayName);
    if (!ExamplesElement) {
      return null;
    }

    return ExamplesElement;
  };

  renderMissingShorthandExamples = (missingPaths: string[]) => {
    return this.renderElementWrappedInGrid(
      <ContributionPrompt>
        <div>Looks like we're missing examples at following paths:</div>
        <List items={missingPaths} />
      </ContributionPrompt>,
    );
  };

  renderElementWrappedInGrid = (Element: JSX.Element) => <Segment content={Element} />;

  getMissingExamplePaths(displayName: string, allPaths: string[]): string[] {
    const examplesPattern = `\./${displayName}/[\\w/]+Example`;
    const [normalExtension, shorthandExtension] = [
      componentAPIs.children.fileSuffix,
      componentAPIs.shorthand.fileSuffix,
    ].map(pattern => `${pattern}.source.json`);

    const [normalRegExp, shorthandRegExp] = [normalExtension, shorthandExtension].map(
      extension => new RegExp(`${examplesPattern}${extension}$`),
    );

    const expectedShorthandExamples = allPaths
      .filter(path => normalRegExp.test(path))
      .map(path => path.replace(normalExtension, shorthandExtension));
    const actualShorthandExamples = allPaths.filter(path => shorthandRegExp.test(path));

    return _.difference(expectedShorthandExamples, actualShorthandExamples).map(exampleFile =>
      exampleFile.replace(/\.source\.json$/, '.tsx'),
    );
  }
}
