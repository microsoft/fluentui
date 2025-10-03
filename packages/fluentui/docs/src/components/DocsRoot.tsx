import * as _ from 'lodash';
import * as React from 'react';
import { useParams } from 'react-router-dom';

import ComponentDoc from '../components/ComponentDoc';
import PageNotFound from '../views/PageNotFound';
import componentInfoContext from '../utils/componentInfoContext';
import { containsAccessibility } from './ComponentDoc/ComponentDocAccessibility';

const getNonEmptyTabs = info => {
  const tabs = ['Definition'];

  tabs.push('Props');

  if (containsAccessibility(info)) {
    tabs.push('Accessibility');
  }

  return tabs;
};

export default function DocsRoot() {
  const params = useParams<{ name: string; type: string }>();

  const displayName = _.startCase(params.name).replace(/ /g, '');
  if (params.type === 'behaviors') {
    return null;
  }
  const info = componentInfoContext.byDisplayName[displayName];
  const tabs = getNonEmptyTabs(info);

  if (info) return <ComponentDoc info={info} tabs={tabs} />;

  return <PageNotFound />;
}
