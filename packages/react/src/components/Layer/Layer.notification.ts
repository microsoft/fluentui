import { ILayerHost } from './LayerHost.types';

const _layersByHostId: { [hostId: string]: (() => void)[] } = {};
const _layerHostsById: { [hostId: string]: ILayerHost[] } = {};

const defaultHostId = 'fluent-default-layer-host';
let _defaultHostSelector: string | undefined = `#${defaultHostId}`;

/**
 * Register a layer for a given host id
 * @param hostId Id of the layer host
 * @param layer Layer instance
 */
export function registerLayer(hostId: string, callback: () => void) {
  if (!_layersByHostId[hostId]) {
    _layersByHostId[hostId] = [];
  }

  _layersByHostId[hostId].push(callback);

  const layerHosts = _layerHostsById[hostId];

  if (layerHosts) {
    for (const layerHost of layerHosts) {
      layerHost.notifyLayersChanged();
    }
  }
}

/**
 * Unregister a layer for a given host id
 * @param hostId Id of the layer host
 * @param layer Layer instance
 */
export function unregisterLayer(hostId: string, callback: () => void) {
  const layers = _layersByHostId[hostId];

  if (layers) {
    const idx = layers.indexOf(callback);
    if (idx >= 0) {
      layers.splice(idx, 1);

      if (layers.length === 0) {
        delete _layersByHostId[hostId];
      }
    }
  }

  const layerHosts = _layerHostsById[hostId];

  if (layerHosts) {
    for (const layerHost of layerHosts) {
      layerHost.notifyLayersChanged();
    }
  }
}

/**
 * Gets the number of layers currently registered with a host id.
 * @param hostId Id of the layer host.
 * @returns The number of layers currently registered with the host.
 */
export function getLayerCount(hostId: string): number {
  const layers = _layerHostsById[hostId];

  return layers ? layers.length : 0;
}

/**
 * Gets the Layer Host instance associated with a hostId, if applicable.
 * @param hostId
 * @returns A component ref for the associated layer host.
 */
export function getLayerHost(hostId: string): ILayerHost | undefined {
  const layerHosts = _layerHostsById[hostId];

  return (layerHosts && layerHosts[0]) || undefined;
}

/**
 * Registers a Layer Host with an associated hostId.
 * @param hostId Id of the layer host
 * @param layerHost layer host instance
 */
export function registerLayerHost(hostId: string, layerHost: ILayerHost): void {
  const layerHosts = _layerHostsById[hostId] || (_layerHostsById[hostId] = []);

  // Insert this at the start of an array to avoid race conditions between mount and unmount.
  // If a LayerHost is re-mounted, and mount of the new instance may occur before the unmount of the old one.
  // Putting the new instance at the start of this array ensures that calls to `getLayerHost` will immediately
  // get the new one even if the old one is around briefly.
  layerHosts.unshift(layerHost);
}

/**
 * Unregisters a Layer Host from the associated hostId.
 * @param hostId Id of the layer host
 * @param layerHost layer host instance
 */
export function unregisterLayerHost(hostId: string, layerHost: ILayerHost): void {
  const layerHosts = _layerHostsById[hostId];

  if (layerHosts) {
    const idx = layerHosts.indexOf(layerHost);

    if (idx >= 0) {
      layerHosts.splice(idx, 1);
    }

    if (layerHosts.length === 0) {
      delete _layerHostsById[hostId];
    }
  }
}

/**
 * When no default layer host is provided, this function is executed to create the default host.
 */
export function createDefaultLayerHost(doc: Document): Node | null {
  const host = doc.createElement('div');
  host.setAttribute('id', defaultHostId);
  (host as HTMLElement).style.cssText = 'position:fixed;z-index:1000000';

  doc?.body.appendChild(host);

  return host;
}

/**
 * This function can be optionally called to clean up the default layer host as needed.
 */
export function cleanupDefaultLayerHost(doc: Document) {
  const host = doc.querySelector(`#${defaultHostId}`);

  if (host) {
    doc.removeChild(host);
  }
}

/**
 * Used for notifying applicable Layers that a host is available/unavailable and to re-evaluate Layers that
 * care about the specific host.
 */
export function notifyHostChanged(id: string) {
  if (_layersByHostId[id]) {
    _layersByHostId[id].forEach(callback => callback());
  }
}

/**
 * Sets the default target selector to use when determining the host in which
 * Layered content will be injected into. If not provided, an element will be
 * created at the end of the document body.
 *
 * Passing in a falsy value will clear the default target and reset back to
 * using a created element at the end of document body.
 */
export function setDefaultTarget(selector?: string) {
  _defaultHostSelector = selector;
}

/**
 * Get the default target selector when determining a host
 */
export function getDefaultTarget(): string | undefined {
  return _defaultHostSelector;
}
