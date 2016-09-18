import { BaseStore } from './BaseStore';

let { expect } = chai;

class TestStore extends BaseStore {
  public doThings() {
    this.emitChange();
  }
}

describe('BaseStore', () => {
  it('can emit changes', () => {
    let test = new TestStore();
    let hasChanged = false;

    test.subscribe(() => hasChanged = true);
    test.doThings();

    expect(hasChanged).to.be.true;
  });

  it('can unsubscribe', () => {
    let test = new TestStore();
    let hasChanged = false;
    let unsubscribe = test.subscribe(() => hasChanged = true);

    unsubscribe();
    test.doThings();

    expect(hasChanged).to.be.false;
  });

});