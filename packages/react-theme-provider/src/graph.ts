// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const graphGet = (graphNode: Map<any, any>, path: any[]): any | undefined => {
  let current = graphNode;

  for (const key of path) {
    current = current.get(key);
    if (!current) {
      return;
    }
  }
  return current;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const graphSet = (graphNode: Map<any, any>, path: any[], value: any) => {
  for (let i = 0; i < path.length - 1; i++) {
    const key = path[i];

    let current = graphNode.get(key);

    if (!current) {
      current = new Map();

      graphNode.set(key, current);
    }

    graphNode = current;
  }

  graphNode.set(path[path.length - 1], value);
};
