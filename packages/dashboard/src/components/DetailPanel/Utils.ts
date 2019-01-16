const _isReactComponent = (content?: any): content is JSX.Element => {
  return !!content && !!(content as JSX.Element).type && !!(content as any).$$typeof;
};

export { _isReactComponent };
