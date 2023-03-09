const isCI = Boolean(process.env.TF_BUILD);

exports.isCI = isCI;
