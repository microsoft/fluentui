export const nextFrame = () =>
  new Promise<void>(resolve =>
    setTimeout(() => {
      resolve();
    }),
  );
