const server = {
  command: 'yarn just e2e:server',
  launchTimeout: 10000,
  port: 3456,
  waitOnScheme: {
    delay: 1000,
  },
};

const e2eServer = process.env.JEST_E2E_SERVER;
const headless = process.env.JEST_E2E_HEADLESS;
const profile = process.env.JEST_E2E_PROFILE;

if (profile) {
  console.log(`puppeteer log: ${profile}`);
}

module.exports = {
  ...(e2eServer && { server }),
  launch: {
    ...(profile && {
      args: [
        '--flag-switches-begin',
        '--no-sandbox',
        `--js-flags=--logfile=${profile} --prof --jitless --no-opt `,
        '--flag-switches-end',
      ],
    }),
    dumpio: true,
    headless,
  },
  browserContext: 'default',
};
