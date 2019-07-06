import * as React from 'react';
import { asAsync } from './asAsync';
import { mount } from 'enzyme';

describe('asAsync', () => {
  it('can async load exports', (done: () => undefined) => {
    let _resolve: (result: React.ReactType<{}>) => void = () => undefined;
    let _loadCalled = false;
    // tslint:disable-next-line:no-any
    const loadThingPromise = new Promise<any>((resolve: any) => {
      _resolve = resolve;
    });

    const AsyncThing = asAsync({
      load: () => {
        _loadCalled = true;
        return loadThingPromise;
      }
    });
    const wrapper = mount(<AsyncThing />);

    expect(_loadCalled).toBe(true);
    expect(wrapper.text()).toBeNull();
    expect(_resolve).toBeTruthy();

    _resolve(() => <div>thing</div>);

    process.nextTick(() => {
      expect(wrapper.text()).toEqual('thing');
      _loadCalled = false;

      // Test cached case.
      mount(<AsyncThing />);
      expect(_loadCalled).toBe(false);
      expect(wrapper.text()).toEqual('thing');
      done();
    });
  });

  it('can async load with placeholder', (done: () => undefined) => {
    let _resolve: (result: React.ReactType<{}>) => void = () => undefined;
    let _loadCalled = false;
    // tslint:disable-next-line:no-any
    const loadThingPromise = new Promise<any>((resolve: any) => {
      _resolve = resolve;
    });

    const AsyncThing = asAsync({
      load: () => {
        _loadCalled = true;
        return loadThingPromise;
      }
    });
    // tslint:disable:jsx-no-lambda
    const wrapper = mount(<AsyncThing asyncPlaceholder={() => <div>placeholder</div>} />);

    expect(_loadCalled).toBe(true);
    expect(wrapper.text()).toEqual('placeholder');
    expect(_resolve).toBeTruthy();

    _resolve(() => <div>thing</div>);

    process.nextTick(() => {
      expect(wrapper.text()).toEqual('thing');
      done();
    });
  });
});
