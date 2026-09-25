// @ts-check
'use strict';

const fs = require('node:fs');
const path = require('node:path');

/**
 * Merge a prefixed static build into the artifact uploaded beneath that same host prefix.
 * @param {string} appRoot
 * @param {string} destination
 * @param {string} hostingBase
 * @returns {boolean}
 */
function prepareFumadocs(appRoot, destination, hostingBase) {
  const client = path.join(appRoot, 'dist/client');

  if (!fs.existsSync(client)) {
    return false;
  }

  if (!/^\/(?:[a-zA-Z0-9_-]+\/)*$/.test(hostingBase)) {
    throw new Error(`Invalid DOCSITE_BASE_PATH: ${hostingBase}`);
  }

  const routes = path.join(client, hostingBase.slice(1), 'docs');

  for (const file of ['react/index.html', 'headless/index.html', 'search-index.json', 'llms.txt']) {
    if (!fs.existsSync(path.join(routes, file))) {
      throw new Error(`Missing Fumadocs staging output: ${path.join(routes, file)}`);
    }
  }

  fs.cpSync(path.join(client, 'docs/assets'), path.join(destination, 'docs/assets'), { recursive: true });
  fs.cpSync(routes, path.join(destination, 'docs'), { recursive: true });

  const publicRoot = path.join(appRoot, 'public');

  for (const file of fs.readdirSync(publicRoot, { recursive: true })) {
    if (typeof file !== 'string' || !fs.statSync(path.join(publicRoot, file)).isFile()) {
      continue;
    }

    if (['index.html', '__spa-fallback.html', 'pr-deploy-site.js', 'pr-deploy-site.css'].includes(file)) {
      throw new Error(`Fumadocs public asset conflicts with staging site: ${file}`);
    }

    const target = path.join(destination, file);

    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.copyFileSync(path.join(client, file), target);
  }

  return true;
}

module.exports = { prepareFumadocs };

if (require.main === module) {
  prepareFumadocs(
    path.resolve(__dirname, '..'),
    path.resolve(__dirname, '../../pr-deploy-site/dist'),
    process.env.DOCSITE_BASE_PATH || '/',
  );
}
