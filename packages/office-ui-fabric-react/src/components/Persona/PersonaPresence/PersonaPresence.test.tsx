/* tslint:disable-next-line:no-unused-variable */
import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { setRTL } from '../../../Utilities';
import * as PersonaTypes from '../Persona.types';
import { PersonaPresence } from './PersonaPresence';

describe('PersonaPresence', () => {
  beforeEach(() => {
    setRTL(false);
  });

  it('renders available', () => {
    const component = renderer.create(<PersonaPresence presence={PersonaTypes.PersonaPresence.online} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders available + out of office', () => {
    const component = renderer.create(<PersonaPresence presence={PersonaTypes.PersonaPresence.online} isOutOfOffice />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders away', () => {
    const component = renderer.create(<PersonaPresence presence={PersonaTypes.PersonaPresence.away} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders away + out of office', () => {
    const component = renderer.create(<PersonaPresence presence={PersonaTypes.PersonaPresence.away} isOutOfOffice />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders busy', () => {
    const component = renderer.create(<PersonaPresence presence={PersonaTypes.PersonaPresence.busy} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders busy + out of office', () => {
    const component = renderer.create(<PersonaPresence presence={PersonaTypes.PersonaPresence.busy} isOutOfOffice />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders do not disturb', () => {
    const component = renderer.create(<PersonaPresence presence={PersonaTypes.PersonaPresence.dnd} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders do not disturb + out of office', () => {
    const component = renderer.create(<PersonaPresence presence={PersonaTypes.PersonaPresence.dnd} isOutOfOffice />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders blocked', () => {
    const component = renderer.create(<PersonaPresence presence={PersonaTypes.PersonaPresence.blocked} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders blocked + out of office', () => {
    // Blocked + out of office does not exist and is the same as regular blocked
    const component = renderer.create(<PersonaPresence presence={PersonaTypes.PersonaPresence.blocked} isOutOfOffice />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders offline', () => {
    const component = renderer.create(<PersonaPresence presence={PersonaTypes.PersonaPresence.offline} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders offline + out of office', () => {
    const component = renderer.create(<PersonaPresence presence={PersonaTypes.PersonaPresence.offline} isOutOfOffice />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders none', () => {
    const component = renderer.create(<PersonaPresence presence={PersonaTypes.PersonaPresence.none} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders none + out of office', () => {
    const component = renderer.create(<PersonaPresence presence={PersonaTypes.PersonaPresence.none} isOutOfOffice />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
