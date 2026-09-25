const fs = require('node:fs');
const Module = require('node:module');

const output = process.env.FLUENTUI_CLI_PROBE_OUTPUT;
const typeScriptModules = new Set();
const generatorModules = new Set();
const load = Module._load;

Module._load = function (request, parent, isMain) {
  if (
    request === 'typescript' ||
    request.startsWith('typescript/') ||
    request === 'ts-morph' ||
    request.startsWith('ts-morph/')
  ) {
    typeScriptModules.add(request);
  }
  let resolved;
  try {
    resolved = Module._resolveFilename(request, parent, isMain);
  } catch {
    resolved = request;
  }
  if (
    request === '@fluentui/api-metadata/generator' ||
    String(resolved).includes('/@fluentui/api-metadata/dist/src/generator')
  ) {
    generatorModules.add(request);
  }
  return load.call(this, request, parent, isMain);
};

if (output) {
  process.on('exit', () => {
    fs.writeFileSync(
      output,
      `${JSON.stringify(
        {
          typeScriptModules: [...typeScriptModules].sort(),
          generatorModules: [...generatorModules].sort(),
        },
        null,
        2,
      )}\n`,
    );
  });
}
