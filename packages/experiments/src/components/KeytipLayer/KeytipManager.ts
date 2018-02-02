import { KeytipLayer } from './KeytipLayer';
import { KeytipTree } from './KeytipTree';
import { IKeytipProps } from '../../Keytip';
import { IKeySequence } from '../../Utilities';

const ktpId = 'ktp';
export class KeytipManager {
  private static _instance: KeytipManager = new KeytipManager();

  public keytipTree: KeytipTree;

  private _layer: KeytipLayer;

  /**
   * Static function to get singleton KeytipManager instance
   */
  public static getInstance(): KeytipManager {
    return this._instance;
  }

  /**
   * Converts a whole set of KeySequences into one ID, which will be the ID for the last keytip sequence specified
   * keySequences should not include the initial keytip 'start' sequence
   * @param keySequences - Full path of IKeySequences for one keytip
   */
  public convertSequencesToID(keySequences: IKeySequence[]): string {
    let id = ktpId;
    for (let keySequence of keySequences) {
      id += '-' + keySequence.keyCodes.join('-');
    }
    return id;
  }

  /**
   * Gets the aria-describedby property for a set of keySequences
   * keySequences should not include the initial keytip 'start' sequence
   * @param keySequences - Full path of IKeySequences for one keytip
   */
  public getAriaDescribedBy(keySequences: IKeySequence[]): string {
    let describedby = this._layer.props.id;
    if (!keySequences.length) {
      // Return just the layer ID
      return describedby;
    }

    for (let i = 0; i < keySequences.length; i++) {
      describedby += ' ' + this.convertSequencesToID(keySequences.slice(0, i + 1));
    }

    return describedby;
  }

  /**
   * Registers a keytip in _layer
   * @param keytipProps - Keytip to register
   */
  public registerKeytip(keytipProps: IKeytipProps): void {
    // Set the 'keytips' property in _layer
    this._layer && this._layer.registerKeytip(keytipProps);
  }

  /**
   * Getter for _layer
   */
  public getLayer(): KeytipLayer {
    return this._layer;
  }

  /**
   * Sets the _layer property and creates a KeytipTree
   * Should be called from the KeytipLayer constructor
   * @param layer - KeytipLayer object
   */
  public setLayer(layer: KeytipLayer): void {
    this._layer = layer;
    this.keytipTree = new KeytipTree(this._layer.props.keytipStartSequences, this._layer.props.keytipExitSequences);
  }

}