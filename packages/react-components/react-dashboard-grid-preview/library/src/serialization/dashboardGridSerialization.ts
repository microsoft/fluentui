import type { DashboardGridRegistry } from '../provider/DashboardGridRegistry.types';
import type {
  DashboardGridItemDefinition,
  DashboardGridDefinition,
  DashboardGridSerializableOptions,
  DashboardGridSerializedGrid,
  DashboardGridSerializedItem,
  DashboardGridSerializedState,
  DashboardGridSaveOptions,
  DashboardGridStore,
} from '../state/DashboardGridStore.types';

const serializeDefinition = (
  registry: DashboardGridRegistry,
  gridId: string,
  item: DashboardGridItemDefinition,
): DashboardGridSerializedItem => {
  const { content, data, props, subGrid, nestedGrid, ...serializable } = item;
  const serializer = item.component ? registry.serializers.get(item.component) : undefined;

  return {
    ...serializable,
    data: serializer ? serializer.serialize(data, { gridId, itemId: item.id }) : data,
    props,
    subGrid: subGrid
      ? serializeGridDefinition(registry, `${gridId}::${item.id}::subgrid`, subGrid)
      : nestedGrid,
  };
};

const getSerializableOptions = (
  definition: DashboardGridDefinition,
): DashboardGridSerializableOptions => ({
  columns: definition.columns,
  minRows: definition.minRows,
  maxRows: definition.maxRows,
  fixedRows: definition.fixedRows,
  float: definition.float,
  disableDrag: definition.disableDrag,
  disableResize: definition.disableResize,
  printMode: definition.printMode,
});

const serializeGridDefinition = (
  registry: DashboardGridRegistry,
  gridId: string,
  definition: DashboardGridDefinition,
): DashboardGridSerializedGrid => ({
  version: 1,
  options: getSerializableOptions(definition),
  items: (definition.items ?? []).map(item =>
    serializeDefinition(registry, gridId, item),
  ),
});

export const serializeDashboardGrid = (
  store: DashboardGridStore,
  registry: DashboardGridRegistry,
  options?: DashboardGridSaveOptions,
): DashboardGridSerializedState => {
  const saved = store.save(options);
  return {
    version: 1,
    options: saved.options,
    items: store.getDefinitions().map(item => serializeDefinition(registry, store.id, item)),
    layouts: saved.layouts,
    engine: saved.engine,
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
      subGrid: item.subGrid
        ? {
            ...item.subGrid.options,
            items: deserializeDashboardGridItems(item.subGrid, registry, `${gridId}::${item.id}::subgrid`),
          }
        : undefined,
    };
  });

export const loadSerializedDashboardGrid = (
  store: DashboardGridStore,
  registry: DashboardGridRegistry,
  state: DashboardGridSerializedState,
) => store.load(deserializeDashboardGridItems(state, registry, store.id));
