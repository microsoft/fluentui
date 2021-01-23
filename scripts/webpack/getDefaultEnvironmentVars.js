const getVariables = options => {
  const variables = {};

  for (const key of Object.keys(options)) {
    const envValue = process.env[key];

    variables[key] = JSON.stringify(envValue !== undefined ? envValue : options[key]);
  }

  return variables;
};

module.exports = isProduction => ({
  'proces.env': {
    NODE_ENV: JSON.stringify(isProduction ? 'production' : 'development'),

    ...getVariables({
      DEPLOYBASEPATH: '',
      E2E_PORT: 8082,
      OFFICIALRELEASE: false,
      PERF: false,
      PERFPORT: 8081,
      PORT: 8080,
      SCREENER_API_KEY: '',
      SKIP_ERRORS: false,
    }),
  },
});
