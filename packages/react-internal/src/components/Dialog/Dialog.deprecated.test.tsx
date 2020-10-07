import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as renderer from 'react-test-renderer';

import { setWarningCallback } from '../../Utilities';
import { DialogBase } from './Dialog.base';

describe('Dialog deprecated props', () => {
  beforeAll(() => {
    // Prevent warn deprecations from failing test
    setWarningCallback(() => {
      /* no-op */
    });
    (ReactDOM.createPortal as any) = jest.fn((element, node) => {
      return element;
    });
  });

  afterEach(() => {
    (ReactDOM.createPortal as any).mockClear();
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
