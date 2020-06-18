import * as React from 'react';
import * as renderer from 'react-test-renderer';

import { SelectedPeopleList, IExtendedPersonaProps } from './SelectedPeopleList';
import { IBaseSelectedItemsList } from '..';

describe('SelectedPeopleList', () => {
  describe('Element keying behavior', () => {
    it('renders keyed personas when there is no context menu', async () => {
      const picker = React.createRef<IBaseSelectedItemsList<IExtendedPersonaProps>>();
      const wrapper = renderer.create(<SelectedPeopleList componentRef={picker} />);
      await picker.current!.addItems([
        {
          key: 'person-A',
          text: 'Person A',
          isValid: true,
        },
        {
          key: 'person-B',
          text: 'Person B',
          isValid: true,
        },
      ]);

      const result = wrapper.root.findAll(node => !!node.props.text, { deep: false });
      expect(result).toBeInstanceOf(Array);
      expect(result[0].props.text).toBe('Person A');
      expect(result[1].props.text).toBe('Person B');
    });

    it('renders keyed personas when there is a context menu', async () => {
      const picker = React.createRef<IBaseSelectedItemsList<IExtendedPersonaProps>>();
      const wrapper = renderer.create(<SelectedPeopleList removeMenuItemText="REMOVE" componentRef={picker} />);
      await picker.current!.addItems([
        {
          key: 'person-A',
          text: 'Person A',
          isValid: true,
        },
        {
          key: 'person-B',
          text: 'Person B',
          isValid: true,
        },
      ]);

      const result = wrapper.root.findAll(node => !!node.props.text, { deep: false });
      expect(result).toBeInstanceOf(Array);
      expect(result[0].props.text).toBe('Person A');
      expect(result[1].props.text).toBe('Person B');
    });
  });
});
