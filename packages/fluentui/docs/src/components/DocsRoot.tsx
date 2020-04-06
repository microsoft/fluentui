import * as _ from 'lodash';
import * as PropTypes from 'prop-types';
import * as React from 'react';

import ComponentDoc from '../components/ComponentDoc';
import PageNotFound from '../views/PageNotFound';
import componentInfoContext from '../utils/componentInfoContext';
import { containsAccessibility } from './ComponentDoc/ComponentDocAccessibility';

class DocsRoot extends React.Component<any, any> {
  static propTypes = {
    children: PropTypes.node,
    match: PropTypes.shape({
      params: PropTypes.shape({
        name: PropTypes.string.isRequired,
        tab: PropTypes.string.isRequired,
      }),
    }),
  };

  state = {};

  getNonEmptyTabs(info) {
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
    if (match.params.type === 'behaviors') {
      return null;
    }
    const info = componentInfoContext.byDisplayName[displayName];
    const tabs = this.getNonEmptyTabs(info);

    if (info) return <ComponentDoc info={info} tabs={tabs} />;

    return <PageNotFound />;
  }
}

export default DocsRoot;
