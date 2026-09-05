import { createDashboardGridItemHostRegistry } from './itemHostRegistry';

describe('createDashboardGridItemHostRegistry', () => {
  it('keeps a stable host while it is reparented', () => {
    const registry = createDashboardGridItemHostRegistry();
    const parking = document.createElement('div');
    const source = document.createElement('div');
    const target = document.createElement('div');
    document.body.append(parking, source, target);
    registry.setParkingElement(parking);

    const host = registry.attach('item', source);
    expect(host?.parentElement).toBe(source);

    registry.park('item', source);
    expect(host?.parentElement).toBe(parking);

    expect(registry.attach('item', target)).toBe(host);
    expect(host?.parentElement).toBe(target);
  });

  it('returns stable snapshots until a record changes', () => {
    const registry = createDashboardGridItemHostRegistry();
    const first = registry.getSnapshot();
    expect(registry.getSnapshot()).toBe(first);

    registry.setContent('item', 'content', 'grid');
    expect(registry.getSnapshot()).not.toBe(first);
  });
});
