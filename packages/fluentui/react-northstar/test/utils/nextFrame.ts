export default () =>
  new Promise(resolve =>
    setTimeout(() => {
      resolve();
    }),
  );
