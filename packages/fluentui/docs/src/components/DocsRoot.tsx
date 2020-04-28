import * as _ from 'lodash';
import * as PropTypes from 'prop-types';
import * as React from 'react';

import ComponentDoc from '../components/ComponentDoc';
import PageNotFound from '../views/PageNotFound';
import componentInfoContext from '../utils/componentInfoContext';
import { containsAccessibility } from './ComponentDoc/ComponentDocAccessibility';
import { FluentComponentInfo } from '@fluentui/react-docgen';
import { RouteComponentProps } from 'react-router-dom';

class DocsRoot extends React.Component<RouteComponentProps<{ name: string; tab: string }>> {
  static propTypes = {
    children: PropTypes.node,
    match: PropTypes.shape({
      params: PropTypes.shape({
        name: PropTypes.string.isRequired,
        tab: PropTypes.string.isRequired,
      }),
    }),
  };

  getNonEmptyTabs(info: FluentComponentInfo) {
    const tabs = ['Definition'];

    tabs.push('Props');

    if (containsAccessibility(info)) {
      tabs.push('Accessibility');
    }

    return tabs;
  }

  render() {
    const { match } = this.props;
    const displayName = _.startCase(match.params.name).replace(/ /g, '');
    const info = componentInfoContext.byDisplayName[displayName];
    const tabs = this.getNonEmptyTabs(info);

    if (info) return <ComponentDoc info={info} tabs={tabs} />;

    return <PageNotFound />;
  }
}

export default DocsRoot;
