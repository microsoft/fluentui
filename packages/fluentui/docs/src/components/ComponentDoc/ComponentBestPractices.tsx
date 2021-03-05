import * as _ from 'lodash';
import * as PropTypes from 'prop-types';
import * as React from 'react';

import { exampleBestPracticesContext } from '../../contexts/exampleBestPracticesContext';
import ExampleSection from '../ComponentDoc/ExampleSection';

interface ComponentBestPracticesProps {
  displayName: string;
}

export default class ComponentBestPractices extends React.Component<ComponentBestPracticesProps, any> {
  static propTypes = {
    displayName: PropTypes.string.isRequired,
  };

  render() {
    const { displayName } = this.props;

    const bestPracticesPath = _.find(exampleBestPracticesContext.keys(), path =>
      new RegExp(`\/${displayName}\/BestPractices\/${displayName}BestPractices\.tsx$`).test(path),
    );

    if (!bestPracticesPath) {
      return null;
    }

    const bestPracticesElement = React.createElement(exampleBestPracticesContext(bestPracticesPath).default) as any;
    if (!bestPracticesElement) {
      return null;
    }

    return <ExampleSection title="Best practices">{bestPracticesElement}</ExampleSection>;
  }
}
