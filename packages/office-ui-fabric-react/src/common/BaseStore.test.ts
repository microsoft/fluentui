import { BaseStore } from './BaseStore';

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

    expect(hasChanged).toBe(true);
  });

  it('can unsubscribe', () => {
    let test = new TestStore();
    let hasChanged = false;
    let disposable = test.subscribe(() => hasChanged = true);

    disposable.dispose();
    test.doThings();

    expect(hasChanged).toBe(false);
  });

});