import { IsFocusVisibleClassName, initializeFocusRects } from './initializeFocusRects';
import { setFocusVisibility } from './setFocusVisibility';
import * as getWindow from './dom/getWindow';

describe('setFocusVisibility', () => {
  let classNames: string[] = [];

  // tslint:disable-next-line:no-any
  const mockWindow: { [key: string]: any } = {
    addEventListener: (name: string, callback: Function) => {
      mockWindow[name] = callback;
    },
    document: {
      body: {
        classList: {
          contains: (name: string) => classNames.indexOf(name) > -1,
          add: (name: string) => classNames.push(name),
          remove: (name: string) => classNames.splice(classNames.indexOf(name), 1),
          toggle: (name: string, val: boolean) => {
            const hasClass = classNames.indexOf(name) > -1;
            if (hasClass !== val) {
              if (hasClass) {
                classNames.splice(classNames.indexOf(name), 1);
              } else {
                classNames.push(name);
              }
            }
          }
        }
      }
    }
  };
  const mockTarget = {
    ownerDocument: {
      defaultView: mockWindow
    }
  };

  beforeEach(() => {
    spyOn(getWindow, 'getWindow').and.returnValue(mockWindow);
    classNames = [];
    initializeFocusRects(mockWindow as Window);
  });

  it('sets focus', () => {
    setFocusVisibility(true);
    expect(classNames.indexOf(IsFocusVisibleClassName) > -1).toEqual(true);
  });

  it('removes focus', () => {
    setFocusVisibility(true);
    expect(classNames.indexOf(IsFocusVisibleClassName) > -1).toEqual(true);
    setFocusVisibility(false);
    expect(classNames.indexOf(IsFocusVisibleClassName) > -1).toEqual(false);
  });

  it('sets focus with target specified', () => {
    setFocusVisibility(true, mockTarget as Element);
    expect(classNames.indexOf(IsFocusVisibleClassName) > -1).toEqual(true);
  });

  it('removes focus with target specified', () => {
    setFocusVisibility(true, mockTarget as Element);
    expect(classNames.indexOf(IsFocusVisibleClassName) > -1).toEqual(true);
    setFocusVisibility(false, mockTarget as Element);
    expect(classNames.indexOf(IsFocusVisibleClassName) > -1).toEqual(false);
  });
});
