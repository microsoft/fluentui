import type { DashboardGridRegistry } from '../provider/DashboardGridRegistry.types';
import type {
  DashboardGridItemDefinition,
  DashboardGridSerializedItem,
  DashboardGridSerializedState,
  DashboardGridStore,
} from '../state/DashboardGridStore.types';

const serializeDefinition = (
  registry: DashboardGridRegistry,
  gridId: string,
  item: DashboardGridItemDefinition,
): DashboardGridSerializedItem => {
  const { content, data, props, ...serializable } = item;
  const serializer = item.component ? registry.serializers.get(item.component) : undefined;

  return {
    ...serializable,
    data: serializer ? serializer.serialize(data, { gridId, itemId: item.id }) : data,
    props,
  };
};

export const serializeDashboardGrid = (
  store: DashboardGridStore,
  registry: DashboardGridRegistry,
): DashboardGridSerializedState => {
  const saved = store.save();
  return {
    ...saved,
    items: store.getDefinitions().map(item => serializeDefinition(registry, store.id, item)),
  };
};

export const deserializeDashboardGridItems = (
  state: DashboardGridSerializedState,
  registry: DashboardGridRegistry,
  gridId?: string,
): DashboardGridItemDefinition[] =>
  state.items.map(item => {
    const serializer = item.component ? registry.serializers.get(item.component) : undefined;
    return {
      ...item,
      data: serializer
        ? serializer.deserialize(item.data, { gridId, itemId: item.id })
        : item.data,
    };
  });

export const loadSerializedDashboardGrid = (
  store: DashboardGridStore,
  registry: DashboardGridRegistry,
  state: DashboardGridSerializedState,
) => store.load(deserializeDashboardGridItems(state, registry, store.id));
