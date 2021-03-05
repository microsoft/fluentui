import { NodeRef } from '../types';

export class RefStack {
  private set = new Set<NodeRef>();

  public getContextRefs = (ref: NodeRef): NodeRef[] => {
    const nodes = Array.from(this.set);
    const refId = nodes.indexOf(ref);

    return nodes.slice(refId);
  };

  public register = (ref: NodeRef): void => {
    this.set.add(ref);
  };

  public unregister = (ref: NodeRef): void => {
    this.set.delete(ref);
  };
}
