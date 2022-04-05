import { quickStartUrl } from './constants';

const warning = {
  message: `You probably forgot to use a 'Provider'. Check ${quickStartUrl} for correct usage.`,
  wasLogged: false,
};

export const logProviderMissingWarning = (): void => {
  if (!warning.wasLogged) {
    /* eslint-disable-next-line no-console */
    console.error(warning.message);
    warning.wasLogged = true;
  }
};
