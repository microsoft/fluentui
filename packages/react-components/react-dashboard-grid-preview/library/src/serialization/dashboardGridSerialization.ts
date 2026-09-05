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
  options?: Pick<DashboardGridSaveOptions, 'includeContent' | 'includeData'>,
): DashboardGridSerializedItem => {
  // eslint-disable-next-line @typescript-eslint/no-deprecated -- Reads the legacy nested-grid field during migration serialization.
  const { content, data, props, subGrid, nestedGrid, ...serializable } = item;
  const serializer = item.component ? registry.serializers.get(item.component) : undefined;

  return {
    ...serializable,
    ...(options?.includeData !== false &&
      data !== undefined && {
        data: serializer ? serializer.serialize(data, { gridId, itemId: item.id }) : data,
      }),
    ...(options?.includeContent === true && content !== undefined && { content }),
    props,
    subGrid: subGrid
      ? serializeGridDefinition(registry, `${gridId}::${item.id}::subgrid`, subGrid, options)
      : nestedGrid,
  };
};

const applySerializedGeometry = (
  definition: DashboardGridItemDefinition | undefined,
  layout: DashboardGridSerializedItem,
): DashboardGridItemDefinition => ({
  ...(definition ?? { id: layout.id }),
  id: layout.id,
  column: layout.column,
  row: layout.row,
  columnSpan: layout.columnSpan,
  rowSpan: layout.rowSpan,
  minColumnSpan: layout.minColumnSpan,
  maxColumnSpan: layout.maxColumnSpan,
  minRowSpan: layout.minRowSpan,
  maxRowSpan: layout.maxRowSpan,
  autoPosition: layout.autoPosition,
  movable: layout.movable,
  resizable: layout.resizable,
  locked: layout.locked,
});

export const getDashboardGridSerializableOptions = (
  definition: DashboardGridDefinition,
): DashboardGridSerializableOptions => {
  const preview =
    definition.drag?.preview === 'item' ? 'item' : definition.drag?.preview === 'clone' ? 'clone' : undefined;
  const drag: DashboardGridSerializableOptions['drag'] = definition.drag
    ? {
        handleSelector: definition.drag.handleSelector,
        cancelSelector: definition.drag.cancelSelector,
        preview,
        portal:
          definition.drag.portal === 'body' || definition.drag.portal === 'parent' ? definition.drag.portal : undefined,
        scroll: definition.drag.scroll,
        pause: definition.drag.pause,
      }
    : undefined;
  const acceptExternal =
    typeof definition.acceptExternal === 'boolean' || typeof definition.acceptExternal === 'string'
      ? definition.acceptExternal
      : undefined;
  const removal: DashboardGridSerializableOptions['removal'] = definition.removal
    ? {
        accept: typeof definition.removal.accept === 'string' ? definition.removal.accept : undefined,
        decline: typeof definition.removal.decline === 'string' ? definition.removal.decline : undefined,
      }
    : undefined;

  return {
    ...(definition.columns !== undefined && { columns: definition.columns }),
    ...(definition.responsive !== undefined && { responsive: definition.responsive }),
    ...(definition.rowHeight !== undefined && { rowHeight: definition.rowHeight }),
    ...(definition.rowHeightThrottle !== undefined && {
      rowHeightThrottle: definition.rowHeightThrottle,
    }),
    ...(definition.gap !== undefined && { gap: definition.gap }),
    ...(definition.minRows !== undefined && { minRows: definition.minRows }),
    ...(definition.maxRows !== undefined && { maxRows: definition.maxRows }),
    ...(definition.fixedRows !== undefined && { fixedRows: definition.fixedRows }),
    ...(definition.float !== undefined && { float: definition.float }),
    ...(definition.animate !== undefined && { animate: definition.animate }),
    ...(definition.direction !== undefined && { direction: definition.direction }),
    ...(definition.static !== undefined && { static: definition.static }),
    ...(definition.disableDrag !== undefined && { disableDrag: definition.disableDrag }),
    ...(definition.disableResize !== undefined && {
      disableResize: definition.disableResize,
    }),
    ...(definition.lazyMount !== undefined && { lazyMount: definition.lazyMount }),
    ...(definition.sizeToContent !== undefined && {
      sizeToContent: definition.sizeToContent,
    }),
    ...(definition.printMode !== undefined && { printMode: definition.printMode }),
    ...(definition.collision !== undefined && { collision: definition.collision }),
    ...(definition.compactMode !== undefined && { compactMode: definition.compactMode }),
    ...(drag !== undefined && { drag }),
    ...(definition.resize !== undefined && { resize: definition.resize }),
    ...(acceptExternal !== undefined && { acceptExternal }),
    ...(definition.removable !== undefined && { removable: definition.removable }),
    ...(removal !== undefined && { removal }),
    ...(definition.subGridDefaults !== undefined && {
      subGridDefaults: getDashboardGridSerializableOptions(definition.subGridDefaults),
    }),
    ...(definition.dynamicNesting !== undefined && {
      dynamicNesting: definition.dynamicNesting,
    }),
  };
};

const serializeGridDefinition = (
  registry: DashboardGridRegistry,
  gridId: string,
  definition: DashboardGridDefinition,
  options?: Pick<DashboardGridSaveOptions, 'includeContent' | 'includeData'>,
): DashboardGridSerializedGrid => ({
  version: 1,
  options: getDashboardGridSerializableOptions(definition),
  items: (definition.items ?? []).map(item => serializeDefinition(registry, gridId, item, options)),
});

export const serializeDashboardGrid = (
  store: DashboardGridStore,
  registry: DashboardGridRegistry,
  options?: DashboardGridSaveOptions,
  // eslint-disable-next-line @typescript-eslint/no-deprecated -- Serialization retains the legacy engine envelope during preview migration.
): DashboardGridSerializedState => {
  const saved = store.save(options);
  const definitions = new Map(store.getDefinitions().map(item => [item.id, item]));
  return {
    version: 1,
    options: saved.options,
    items: saved.items.map(item =>
      serializeDefinition(registry, store.id, applySerializedGeometry(definitions.get(item.id), item), options),
    ),
    layouts: saved.layouts,
    engine: saved.engine,
  };
};

export const deserializeDashboardGridItems = (
  // eslint-disable-next-line @typescript-eslint/no-deprecated -- Deserialization accepts the legacy engine envelope during preview migration.
  state: DashboardGridSerializedState,
  registry: DashboardGridRegistry,
  gridId?: string,
): DashboardGridItemDefinition[] =>
  state.items.map(item => {
    const serializer = item.component ? registry.serializers.get(item.component) : undefined;
    return {
      ...item,
      data: serializer ? serializer.deserialize(item.data, { gridId, itemId: item.id }) : item.data,
      subGrid: item.subGrid
        ? {
            ...item.subGrid.options,
            items: deserializeDashboardGridItems(item.subGrid, registry, `${gridId}::${item.id}::subgrid`),
          }
        : undefined,
    };
  });

export const getDashboardGridSerializedItemColumns = (
  // eslint-disable-next-line @typescript-eslint/no-deprecated -- Loading accepts the legacy engine envelope during preview migration.
  state: DashboardGridSerializedState,
): number | undefined => {
  if ('engine' in state) {
    const engine = state.engine;
    if (
      engine !== null &&
      typeof engine === 'object' &&
      'itemColumns' in engine &&
      typeof engine.itemColumns === 'number'
    ) {
      return engine.itemColumns;
    }
  }

  return typeof state.options.columns === 'number' ? state.options.columns : undefined;
};

export const loadSerializedDashboardGrid = (
  store: DashboardGridStore,
  registry: DashboardGridRegistry,
  state: DashboardGridSerializedGrid,
): ReturnType<DashboardGridStore['load']> => {
  store.setSerializableOptions(state.options, true);
  return store.load(deserializeDashboardGridItems(state, registry, store.id), {
    addMissing: true,
    removeMissing: true,
    sourceColumns: getDashboardGridSerializedItemColumns(state),
  });
};
