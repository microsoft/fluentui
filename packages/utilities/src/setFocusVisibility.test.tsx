import * as React from 'react';
import { FocusRects } from './useFocusRects';
import { IsFocusHiddenClassName, IsFocusVisibleClassName, setFocusVisibility } from './setFocusVisibility';
import * as getWindow from './dom/getWindow';
import { mount, ReactWrapper } from 'enzyme';

describe('setFocusVisibility', () => {
  let wrapper: ReactWrapper;
  let classNames: string[] = [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mockWindow: { [key: string]: any } = {
    addEventListener: (name: string, callback: Function) => {
      mockWindow[name] = callback;
    },
    removeEventListener: (name: string, callback: Function) => {
      if (mockWindow[name] === callback) {
        mockWindow[name] = undefined;
      }
    },
    document: {
      body: {
        classList: {
          contains: (name: string) => classNames.indexOf(name) > -1,
          add: (name: string) => classNames.indexOf(name) < 0 && classNames.push(name),
          remove: (name: string) => classNames.indexOf(name) > -1 && classNames.splice(classNames.indexOf(name), 1),
          toggle: (name: string, val: boolean) => {
            const hasClass = classNames.indexOf(name) > -1;
            if (hasClass !== val) {
              if (hasClass) {
                classNames.splice(classNames.indexOf(name), 1);
              } else {
                classNames.push(name);
              }
            }
          },
        },
      },
    },
  };
  const mockTarget = {
    ownerDocument: {
      defaultView: mockWindow,
    },
  };

  beforeEach(() => {
    jest.spyOn(getWindow, 'getWindow').mockReturnValue(mockWindow as Window);
    classNames = [];

    wrapper = mount(<FocusRects />);
  });

  afterEach(() => wrapper.unmount());

  it('hints to show focus', () => {
    setFocusVisibility(true);
    expect(classNames.indexOf(IsFocusHiddenClassName) > -1).toEqual(false);
    expect(classNames.indexOf(IsFocusVisibleClassName) > -1).toEqual(true);
  });

  it('hints to hide focus', () => {
    setFocusVisibility(true);
    expect(classNames.indexOf(IsFocusHiddenClassName) > -1).toEqual(false);
    expect(classNames.indexOf(IsFocusVisibleClassName) > -1).toEqual(true);
    setFocusVisibility(false);
    expect(classNames.indexOf(IsFocusHiddenClassName) > -1).toEqual(true);
    expect(classNames.indexOf(IsFocusVisibleClassName) > -1).toEqual(false);
  });

  it('hints to show focus with target specified', () => {
    setFocusVisibility(true, mockTarget as Element);
    expect(classNames.indexOf(IsFocusHiddenClassName) > -1).toEqual(false);
    expect(classNames.indexOf(IsFocusVisibleClassName) > -1).toEqual(true);
  });

  it('hints to hide focus with target specified', () => {
    setFocusVisibility(true, mockTarget as Element);
    expect(classNames.indexOf(IsFocusHiddenClassName) > -1).toEqual(false);
    expect(classNames.indexOf(IsFocusVisibleClassName) > -1).toEqual(true);
    setFocusVisibility(false, mockTarget as Element);
    expect(classNames.indexOf(IsFocusHiddenClassName) > -1).toEqual(true);
    expect(classNames.indexOf(IsFocusVisibleClassName) > -1).toEqual(false);
  });
});
