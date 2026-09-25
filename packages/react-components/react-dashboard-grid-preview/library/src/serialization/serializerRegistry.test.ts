import { createDashboardGridSerializerRegistry } from './serializerRegistry';

describe('createDashboardGridSerializerRegistry', () => {
  it('registers, serializes, deserializes, and unregisters serializers', () => {
    const registry = createDashboardGridSerializerRegistry();
    const unregister = registry.register('number', {
      serialize: value => String(value),
      deserialize: value => Number(value),
    });

    expect(registry.serialize('number', 2)).toBe('2');
    expect(registry.deserialize('number', '3')).toBe(3);

    unregister();
    expect(registry.get('number')).toBeUndefined();
  });
});
