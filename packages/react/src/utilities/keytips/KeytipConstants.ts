export const KTP_PREFIX = 'ktp';
export const KTP_SEPARATOR = '-';
export const KTP_FULL_PREFIX = KTP_PREFIX + KTP_SEPARATOR;
export const DATAKTP_TARGET = 'data-ktp-target';
export const DATAKTP_EXECUTE_TARGET = 'data-ktp-execute-target';
export const DATAKTP_ARIA_TARGET = 'data-ktp-aria-target';
export const KTP_LAYER_ID = 'ktp-layer-id';
export const KTP_ARIA_SEPARATOR = ', ';

// Events
export namespace KeytipEvents {
  export const KEYTIP_ADDED = 'keytipAdded';
  export const KEYTIP_REMOVED = 'keytipRemoved';
  export const KEYTIP_UPDATED = 'keytipUpdated';
  export const PERSISTED_KEYTIP_ADDED = 'persistedKeytipAdded';
  export const PERSISTED_KEYTIP_REMOVED = 'persistedKeytipRemoved';
  export const PERSISTED_KEYTIP_EXECUTE = 'persistedKeytipExecute';
  export const ENTER_KEYTIP_MODE = 'enterKeytipMode';
  export const EXIT_KEYTIP_MODE = 'exitKeytipMode';
}
