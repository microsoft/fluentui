export type GroupFallbacks = {
  [key: string]: GroupFallback;
};

export type GroupFallback = {
  [key: string]: {
    fluent?: string | null;
    generic?: string | null;
    primitive?: string | null;
  };
};

export type GenericFallback = {
  [key: string]: {
    fluent?: string | null;
    primitive?: string | null;
  };
};
