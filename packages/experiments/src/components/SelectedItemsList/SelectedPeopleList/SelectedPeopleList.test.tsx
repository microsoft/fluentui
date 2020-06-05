import * as React from 'react';
import { create } from 'react-test-renderer';

import { SelectedPeopleList, ISelectedPeopleList } from './SelectedPeopleList';
import { IPersonaProps } from 'office-ui-fabric-react/lib/components/Persona/Persona.types';
import { SelectedItemsList } from '../SelectedItemsList';

const removeItems = jest.fn();

export interface ISimple {
  key: string;
  name: string;
}

describe('SelectedPeopleList', () => {
  it('renders nothing if nothing is provided', () => {
    const pickerRef: React.RefObject<ISelectedPeopleList> = React.createRef();
    const rendered = create(<SelectedPeopleList ref={pickerRef} />);
    expect(rendered.toJSON()).toMatchSnapshot();
  });

  it('renders personas that are passed in', () => {
    const pickerRef: React.RefObject<ISelectedPeopleList> = React.createRef();
    const rendered = create(
      <SelectedPeopleList selectedItems={[{ text: 'Person A' }, { text: 'Person B' }]} ref={pickerRef} />,
    );

    const personANodes = rendered.root.findAll(x => !!x.children.length && x.children.indexOf('Person A') !== -1);
    const personBNodes = rendered.root.findAll(x => !!x.children.length && x.children.indexOf('Person B') !== -1);
    expect(personANodes.length).toEqual(1);
    expect(personBNodes.length).toEqual(1);

    expect(rendered.toJSON()).toMatchSnapshot();
  });

  it('renders personas that are passed in as default', () => {
    const pickerRef: React.RefObject<ISelectedPeopleList> = React.createRef();
    const rendered = create(
      <SelectedPeopleList defaultSelectedItems={[{ text: 'Person A' }, { text: 'Person B' }]} ref={pickerRef} />,
    );

    const personANodes = rendered.root.findAll(x => !!x.children.length && x.children.indexOf('Person A') !== -1);
    const personBNodes = rendered.root.findAll(x => !!x.children.length && x.children.indexOf('Person B') !== -1);
    expect(personANodes.length).toEqual(1);
    expect(personBNodes.length).toEqual(1);

    expect(rendered.toJSON()).toMatchSnapshot();
  });

  it('remove personas', () => {
    const onChange = (items: IPersonaProps[] | undefined): void => {
      console.log(items!.length);
    };
    const pickerRef: React.RefObject<ISelectedPeopleList> = React.createRef();
    const rendered = create(
      <SelectedPeopleList
        selectedItems={[{ text: 'Person A' }, { text: 'Person B' }]}
        ref={pickerRef}
        onItemsRemoved={removeItems}
        onChange={onChange}
      />,
    );

    expect(pickerRef.current).toBeTruthy();

    pickerRef.current?.addItems([{ text: 'Person A' }, { text: 'Person B' }]);
    //  expect(removeItems).toHaveBeenCalledTimes(1);
  });
});
