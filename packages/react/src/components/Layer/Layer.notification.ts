const _layersByHostId: { [hostId: string]: (() => void)[] } = {};

let _defaultHostSelector: string | undefined;

/**
 * Register a layer for a given host id
 * @param hostId Id or Node of the layer host
 * @param layer Layer instance
 */
export function registerLayer(hostId: string | Node, callback: () => void) {
  const nodeName = typeof hostId === 'string' ? hostId : (hostId as Node).nodeName;
  if (!_layersByHostId[nodeName]) {
    _layersByHostId[nodeName] = [];
  }

  _layersByHostId[nodeName].push(callback);
}

/**
 * Unregister a layer for a given host id
 * @param hostId Id or Node of the layer host
 * @param layer Layer instance
 */
export function unregisterLayer(hostId: string | Node, callback: () => void) {
  const nodeName = typeof hostId === 'string' ? hostId : (hostId as Node).nodeName;
  if (_layersByHostId[nodeName]) {
    const idx = _layersByHostId[nodeName].indexOf(callback);
    if (idx >= 0) {
      _layersByHostId[nodeName].splice(idx, 1);
      if (_layersByHostId[nodeName].length === 0) {
        delete _layersByHostId[nodeName];
      }
    }
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
