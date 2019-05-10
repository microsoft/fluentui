import * as React from 'react';
import { act, create } from 'react-test-renderer';

import { SelectedPeopleList, ISelectedPeopleList } from './SelectedPeopleList';

describe('SelectedPeopleList', () => {
  describe('Element keying behavior', () => {
    it('renders personas when there is no context menu', () => {
      const pickerRef: React.RefObject<ISelectedPeopleList> = React.createRef();
      const rendered = create(<SelectedPeopleList ref={pickerRef} />);
      act(() => {
        pickerRef.current &&
          pickerRef.current.addItems([
            {
              text: 'Person A'
            },
            {
              text: 'Person B'
            }
          ]);
      });

      const result = rendered.root.children;
      expect(result).toBeInstanceOf(Array);
      // expect(result).toEqual([{ text: 'PersonA' }, { text: 'PersonB' }]);
    });

    // it('renders keyed personas when there is a context menu', () => {
    //   const r = renderer.create(<SelectedPeopleList />);
    //   expect(r.root.instance).toBeInstanceOf(SelectedPeopleList);
    //   const picker: ISelectedPeopleList = r.root.instance;
    //   picker.addItems([
    //     {
    //       text: 'Person A'
    //     },
    //     {
    //       text: 'Person B'
    //     }
    //   ]);

    //   const result = picker.render();
    //   expect(result).toBeInstanceOf(Array);
    //   expect(result[0].text).toBe('Person A');
    //   expect(result[1].text).toBe('Person B');
    // });

    // it('renders keyed personas when items are being edited', () => {
    //   const getEditingItemText = (i: IExtendedPersonaProps) => i.text || 'lmao oops';
    //   const ref = React.createRef<SelectedPeopleList>();

    //   // editingitem has unlisted constraints on being mounted on an actual DOM.
    //   // so we can't render it with `renderer` and expect the internal state of the EditingItem to be
    //   // initialized
    //   const root = document.createElement('div');
    //   ReactDOM.render(<SelectedPeopleList ref={ref} editMenuItemText="REMOVE" getEditingItemText={getEditingItemText} />, root);
    //   expect(ref.current).not.toBeNull();
    //   const picker = ref.current;
    //   if (picker === null) {
    //     throw new Error('already checked ref instance was not null');
    //   }
    //   picker.addItems([
    //     {
    //       text: 'Person A',
    //       isValid: true,
    //       isEditing: true
    //     },
    //     {
    //       text: 'Person B'
    //     }
    //   ]);

    //   const result = picker.render();
    //   expect(result).toBeInstanceOf(Array);
    //   expect(result[0].text).toBe('Person A');
    //   expect(result[1].text).toBe('Person B');
    // });
  });
});
