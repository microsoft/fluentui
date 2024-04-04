export type CarouselStore = {
  addValue: (value: string) => void;
  insertValue: (value: string, prev: string | null) => void;
  removeValue: (value: string) => void;
  subscribe: (listener: () => void) => () => void;
  getSnapshot: () => string[];
  getIndex: (index: number) => string;
};

export type CarouselItem = {
  el: HTMLElement;
  value: string | null;
};
