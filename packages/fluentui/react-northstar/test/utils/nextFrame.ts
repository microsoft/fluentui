export const nextFrame = () =>
  new Promise(resolve =>
    setTimeout(() => {
      resolve();
    }),
  );
