import * as React from 'react';
import { create } from 'react-test-renderer';

import { SelectedItemsList } from './SelectedItemsList';

export interface ISimple {
  key: string;
  name: string;
}

describe('SelectedItemsList', () => {
  describe('SelectedItemsList', () => {
    const renderNothing = () => <></>;

    it('renders SelectedItemsList correctly', () => {
      const component = create(<SelectedItemsList onRenderItem={renderNothing} />);
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
