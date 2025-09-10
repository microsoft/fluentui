import * as React from 'react';
import * as renderer from 'react-test-renderer';

import { resetIds, setWarningCallback } from '../../Utilities';
import { DialogBase } from './Dialog.base';

jest.mock('react-dom', () => {
  return {
    ...jest.requireActual('react-dom'),
    createPortal: jest.fn((node: any) => node),
  };
});

describe('Dialog deprecated props', () => {
  beforeAll(() => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const noop = () => {};
    // Prevent warn deprecations from failing test
    setWarningCallback(noop);
  });

  beforeEach(() => {
    resetIds();
  });

  afterAll(() => {
    setWarningCallback();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders Dialog with className', () => {
    const component = renderer.create(
      <DialogBase
        className="Dialog"
        isOpen
        dialogContentProps={{ title: 'Sample title', subText: 'Sample subtext' }}
      />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders Dialog with containerClassName', () => {
    const component = renderer.create(
      <DialogBase
        containerClassName="Container"
        isOpen
        dialogContentProps={{ title: 'Sample title', subText: 'Sample subtext' }}
      />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders Dialog with isBlocking set to true', () => {
    const component = renderer.create(
      <DialogBase isBlocking isOpen dialogContentProps={{ title: 'Sample title', subText: 'Sample subtext' }} />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders Dialog with isDarkOverlay set to true', () => {
    const component = renderer.create(
      <DialogBase isDarkOverlay isOpen dialogContentProps={{ title: 'Sample title', subText: 'Sample subtext' }} />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
