import * as React from 'react';
import { render } from '@testing-library/react';
import { setRTL } from '../../../Utilities';
import * as PersonaTypes from '../Persona.types';
import { PersonaPresence } from './PersonaPresence';
import { isConformant } from '../../../common/isConformant';

describe('PersonaPresence', () => {
  beforeEach(() => {
    setRTL(false);
  });

  it('renders available', () => {
    const { container } = render(<PersonaPresence presence={PersonaTypes.PersonaPresence.online} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders available + out of office', () => {
    const { container } = render(<PersonaPresence presence={PersonaTypes.PersonaPresence.online} isOutOfOffice />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders away', () => {
    const { container } = render(<PersonaPresence presence={PersonaTypes.PersonaPresence.away} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders away + out of office', () => {
    const { container } = render(<PersonaPresence presence={PersonaTypes.PersonaPresence.away} isOutOfOffice />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders busy', () => {
    const { container } = render(<PersonaPresence presence={PersonaTypes.PersonaPresence.busy} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders busy + out of office', () => {
    const { container } = render(<PersonaPresence presence={PersonaTypes.PersonaPresence.busy} isOutOfOffice />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders do not disturb', () => {
    const { container } = render(<PersonaPresence presence={PersonaTypes.PersonaPresence.dnd} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders do not disturb + out of office', () => {
    const { container } = render(<PersonaPresence presence={PersonaTypes.PersonaPresence.dnd} isOutOfOffice />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders blocked', () => {
    const { container } = render(<PersonaPresence presence={PersonaTypes.PersonaPresence.blocked} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders blocked + out of office', () => {
    // Blocked + out of office does not exist and is the same as regular blocked
    const { container } = render(<PersonaPresence presence={PersonaTypes.PersonaPresence.blocked} isOutOfOffice />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders offline', () => {
    const { container } = render(<PersonaPresence presence={PersonaTypes.PersonaPresence.offline} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders offline + out of office', () => {
    const { container } = render(<PersonaPresence presence={PersonaTypes.PersonaPresence.offline} isOutOfOffice />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders none', () => {
    const { container } = render(<PersonaPresence presence={PersonaTypes.PersonaPresence.none} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders none + out of office', () => {
    const { container } = render(<PersonaPresence presence={PersonaTypes.PersonaPresence.none} isOutOfOffice />);
    expect(container.firstChild).toMatchSnapshot();
  });

  isConformant({
    Component: PersonaPresence,
    displayName: 'PersonaPresence',
    disabledTests: ['exported-top-level', 'has-top-level-file', 'component-handles-classname'],
  });
});
