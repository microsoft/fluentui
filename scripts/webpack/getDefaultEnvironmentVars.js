const getVariables = options => {
  const variables = {};

  for (const key of Object.keys(options)) {
    const envValue = process.env[key];

    variables[key] = JSON.stringify(envValue !== undefined ? envValue : options[key]);
  }

  return variables;
};

module.exports = isProduction => ({
  'process.env': {
    NODE_ENV: JSON.stringify(isProduction ? 'production' : process.env.NODE_ENV || 'development'),

    ...getVariables({
      DEPLOYBASEPATH: '',
      E2E_PORT: 8082,
      OFFICIALRELEASE: false,
      PERF: false,
      PERF_PORT: 8081,
      PORT: 8080,
      SCREENER_API_KEY: '',
      SKIP_ERRORS: false,
    }),
  },
});
