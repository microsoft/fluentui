import * as React from 'react';
import { asAsync } from './asAsync';
import * as renderer from 'react-test-renderer';
import type { ReactTestRenderer, ReactTestRendererJSON } from 'react-test-renderer';

const getChildren = (testRenderer: ReactTestRenderer) => (testRenderer.toJSON() as ReactTestRendererJSON)?.children;

describe('asAsync', () => {
  it('can async load exports', (done: () => undefined) => {
    let _resolve: (result: React.ElementType<{}>) => void = () => undefined;
    let _loadCalled = false;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const loadThingPromise = new Promise<any>((resolve: any) => {
      _resolve = resolve;
    });

    const AsyncThing = asAsync({
      load: () => {
        _loadCalled = true;
        return loadThingPromise;
      },
    });
    const component = renderer.create(<AsyncThing />);

    expect(_loadCalled).toBe(true);
    expect(getChildren(component)).toBeUndefined();
    expect(_resolve).toBeTruthy();

    _resolve(() => <div>thing</div>);

    process.nextTick(() => {
      component.update(<AsyncThing />);

      expect(getChildren(component)![0]).toEqual('thing');
      _loadCalled = false;

      // Test cached case.
      renderer.create(<AsyncThing />);
      expect(_loadCalled).toBe(false);
      expect(getChildren(component)![0]).toEqual('thing');
      done();
    });
  });

  it('can async load with placeholder', (done: () => undefined) => {
    let _resolve: (result: React.ElementType<{}>) => void = () => undefined;
    let _loadCalled = false;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const loadThingPromise = new Promise<any>((resolve: any) => {
      _resolve = resolve;
    });

    const AsyncThing = asAsync({
      load: () => {
        _loadCalled = true;
        return loadThingPromise;
      },
    });
    const component = renderer.create(<AsyncThing asyncPlaceholder={() => <div>placeholder</div>} />);

    expect(_loadCalled).toBe(true);
    expect(getChildren(component)![0]).toEqual('placeholder');
    expect(_resolve).toBeTruthy();

    _resolve(() => <div>thing</div>);

    process.nextTick(() => {
      component.update(<AsyncThing asyncPlaceholder={() => <div>placeholder</div>} />);
      expect(getChildren(component)![0]).toEqual('thing');
      done();
    });
  });
});
