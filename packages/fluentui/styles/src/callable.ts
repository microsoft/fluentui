const callable = (possibleFunction: any) => (...args: any[]) => {
  return typeof possibleFunction === 'function' ? possibleFunction(...args) : possibleFunction;
};

export default callable;
