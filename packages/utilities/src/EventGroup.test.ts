import { EventGroup } from './EventGroup';

let { expect } = chai;

describe('EventGroup', () => {
  it('can observe an HTML element event', () => {
    let timesCalled = 0;
    let sourceButton = document.createElement('button');
    let parent = {
      cb: () => {
        timesCalled++;
      }
    };
    let eg = new EventGroup(parent);
    let ev = document.createEvent('HTMLEvents');

    eg.on(sourceButton, 'click', parent.cb);
    ev.initEvent('click', true, true);

    sourceButton.dispatchEvent(ev);
    expect(timesCalled).to.equal(1);

    sourceButton.dispatchEvent(ev);
    expect(timesCalled).to.equal(2);

    eg.dispose();

    sourceButton.dispatchEvent(ev);
    expect(timesCalled).to.equal(2);
  });

  it('can observe an object event', () => {
    let timesCalled = 0;
    let sourceObject = {};
    let parent = {
      cb: () => {
        timesCalled++;
      }
    };

    let parentEvents = new EventGroup(parent);
    let sourceEvents = new EventGroup(sourceObject);

    sourceEvents.declare(['foo', 'bar']);

    expect(EventGroup.isDeclared(sourceObject, 'foo')).to.equal(true);
    expect(EventGroup.isDeclared(sourceObject, 'bar')).to.equal(true);
    expect(EventGroup.isDeclared(sourceObject, 'baz')).to.equal(false);

    parentEvents.on(sourceObject, 'foo, bar', parent.cb);

    expect(EventGroup.isObserved(sourceObject, 'foo')).to.equal(true);
    expect(EventGroup.isObserved(sourceObject, 'bar')).to.equal(true);
    expect(EventGroup.isObserved(sourceObject, 'baz')).to.equal(false);

    sourceEvents.raise('foo');
    expect(timesCalled).to.equal(1);

    sourceEvents.raise('bar');
    expect(timesCalled).to.equal(2);

    parentEvents.dispose();

    sourceEvents.raise('thing');
    expect(timesCalled).to.equal(2);
  });

  it('can bubble object events', () => {
    let rootCalled = 0;
    let childCalled = 0;
    let grandChildCalled = 0;
    let childResponse = true;
    let root = {
      cb: () => {
        rootCalled++;
      }
    };
    let child = {
      parent: root,
      cb: () => {
        childCalled++;
        return childResponse;
      }
    };
    let grandChild = {
      parent: child,
      cb: () => {
        grandChildCalled++;
      }
    };
    let rootEvents = new EventGroup(root);
    let childEvents = new EventGroup(child);
    let grandChildEvents = new EventGroup(grandChild);

    rootEvents.on(root, 'foo', root.cb);
    childEvents.on(child, 'foo', child.cb);
    grandChildEvents.on(grandChild, 'foo', grandChild.cb);

    // bubble up to the root.
    grandChildEvents.raise('foo', null, true);

    expect(rootCalled).to.equal(1);
    expect(childCalled).to.equal(1);
    expect(grandChildCalled).to.equal(1);

    // cancel at the child.
    childResponse = false;
    grandChildEvents.raise('foo', null, true);

    expect(rootCalled).to.equal(1);
    expect(childCalled).to.equal(2);
    expect(grandChildCalled).to.equal(2);

    // dispose all.
    rootEvents.dispose();
    childEvents.dispose();
    grandChildEvents.dispose();

    grandChildEvents.raise('foo', null, true);

    expect(rootCalled).to.equal(1);
    expect(childCalled).to.equal(2);
    expect(grandChildCalled).to.equal(2);
  });

  it('can cancelBubble/preventDefault if false is returned on an element event callback', () => {
    let rootCalled = 0;
    let childCalled = 0;
    let childResponse = true;
    let rootDiv = document.createElement('div');
    let childDiv = document.createElement('div');
    let grandChildButton = document.createElement('button');

    let parent = {
      onRootClick: () => {
        rootCalled++;
      },
      onChildClick: () => {
        childCalled++;
        return childResponse;
      }
    };

    let parentEvents = new EventGroup(parent);

    parentEvents.on(childDiv, 'click', parent.onChildClick);
    parentEvents.on(rootDiv, 'click', parent.onRootClick);

    document.body.appendChild(rootDiv).appendChild(childDiv).appendChild(grandChildButton);

    try {
      let ev = document.createEvent('HTMLEvents');

      ev.initEvent('click', true, true);

      grandChildButton.dispatchEvent(ev);

      // verify we bubble.
      expect(childCalled).to.equal(1, 'child not 1');
      expect(rootCalled).to.equal(1);

      // now return false at the child, shouldn't hit root.
      childResponse = false;
      grandChildButton.dispatchEvent(ev);
      expect(childCalled).to.equal(2);
      expect(rootCalled).to.equal(1);

      parentEvents.dispose();

      grandChildButton.dispatchEvent(ev);

      expect(childCalled).to.equal(2);
      expect(rootCalled).to.equal(1);
    } finally {
      document.body.removeChild(rootDiv);

    }
  });

  it('can selectively remove event handlers', () => {
    let cb1Called = 0;
    let cb2Called = 0;
    let sourceObject = {};
    let parent = {
      cb1: () => {
        cb1Called++;
      },
      cb2: () => {
        cb2Called++;
      }
    };

    let parentEvents = new EventGroup(parent);
    let sourceEvents = new EventGroup(sourceObject);

    parentEvents.on(sourceObject, 'foo', parent.cb1);
    parentEvents.on(sourceObject, 'foo', parent.cb2);

    sourceEvents.raise('foo');
    expect(cb1Called).to.equal(1);
    expect(cb1Called).to.equal(1);

    // remove one.
    parentEvents.off(sourceObject, 'foo', parent.cb1);
    sourceEvents.raise('foo');
    expect(cb1Called).to.equal(1);
    expect(cb2Called).to.equal(2);

    // attach it again.
    parentEvents.on(sourceObject, 'foo', parent.cb1);
    sourceEvents.raise('foo');
    expect(cb1Called).to.equal(2);
    expect(cb2Called).to.equal(3);

    // detatch both based on event name.
    parentEvents.off(sourceObject, 'foo');
    sourceEvents.raise('foo');
    expect(cb1Called).to.equal(2);
    expect(cb2Called).to.equal(3);

    // attach it again.
    parentEvents.on(sourceObject, 'foo', parent.cb1);
    parentEvents.on(sourceObject, 'foo', parent.cb2);
    sourceEvents.raise('foo');
    expect(cb1Called).to.equal(3);
    expect(cb2Called).to.equal(4);

    // detach based on object.
    parentEvents.off(sourceObject);
    sourceEvents.raise('foo');
    expect(cb1Called).to.equal(3);
    expect(cb2Called).to.equal(4);
  });

  it('can raise custom html events', () => {
    let timesCalled = 0;
    let sourceButton = document.createElement('button');
    let parent = {
      cb: () => {
        timesCalled++;
      }
    };
    let eg = new EventGroup(parent);

    eg.on(sourceButton, 'foobar', parent.cb);

    EventGroup.raise(sourceButton, 'foobar');

    expect(timesCalled).to.equal(1);

    EventGroup.raise(sourceButton, 'foobar');
    expect(timesCalled).to.equal(2);

    eg.dispose();

    EventGroup.raise(sourceButton, 'foobar');
    expect(timesCalled).to.equal(2);
  });
});
