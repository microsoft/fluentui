import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as renderer from 'react-test-renderer';
import { isConformant } from '../../../common/isConformant';

import { SelectedPeopleList } from './SelectedPeopleList';
import type { IExtendedPersonaProps } from './SelectedPeopleList';

describe('SelectedPeopleList', () => {
  describe('Element keying behavior', () => {
    isConformant({
      Component: SelectedPeopleList,
      displayName: 'SelectedPeopleList',
      // Problem: Ref is not supported
      // Solution: Convert to FunctionComponent and support using forwardRef
      disabledTests: [
        'has-top-level-file',
        'component-handles-ref',
        'component-has-root-ref',
        'component-handles-classname',
      ],
    });

    it('renders keyed personas when there is no context menu', () => {
      const r = renderer.create(<SelectedPeopleList />);
      expect(r.root.instance).toBeInstanceOf(SelectedPeopleList);
      const picker: SelectedPeopleList = r.root.instance;
      picker.addItems([
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

      const result = picker.render();
      expect(result).toBeInstanceOf(Array);
      expect(result[0].key).toBe('person-A');
      expect(result[1].key).toBe('person-B');
    });

    it('renders keyed personas when there is a context menu', () => {
      const r = renderer.create(<SelectedPeopleList removeMenuItemText="REMOVE" />);
      expect(r.root.instance).toBeInstanceOf(SelectedPeopleList);
      const picker: SelectedPeopleList = r.root.instance;
      picker.addItems([
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

      const result = picker.render();
      expect(result).toBeInstanceOf(Array);
      expect(result[0].key).toBe('person-A');
      expect(result[1].key).toBe('person-B');
    });

    it('renders keyed personas when items are being edited', () => {
      const getEditingItemText = (i: IExtendedPersonaProps) => i.text || 'lmao oops';
      const ref = React.createRef<SelectedPeopleList>();

      // EditingItem has unlisted constraints on being mounted on an actual DOM.
      // so we can't render it with `renderer` and expect the internal state of the EditingItem to be
      // initialized
      const root = document.createElement('div');
      ReactDOM.render(
        <SelectedPeopleList ref={ref} editMenuItemText="REMOVE" getEditingItemText={getEditingItemText} />,
        root,
      );
      expect(ref.current).not.toBeNull();
      const picker = ref.current;
      if (picker === null) {
        throw new Error('already checked ref instance was not null');
      }
      picker.addItems([
        {
          key: 'person-A',
          text: 'Person A',
          isValid: true,
          isEditing: true,
        },
        {
          key: 'person-B',
          text: 'Person B',
          isValid: true,
        },
      ]);

      const result = picker.render();
      expect(result).toBeInstanceOf(Array);
      expect(result[0].key).toBe('person-A');
      expect(result[1].key).toBe('person-B');
    });
  });
});
