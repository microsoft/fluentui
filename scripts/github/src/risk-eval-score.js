// @ts-check

const assert = require('node:assert/strict');
const { existsSync, readFileSync } = require('node:fs');
const { join } = require('node:path');

const { hash, save, azureEndpoint, azureToken, totalUsage, price } = require('./risk-eval-label');
const { askRiskModel } = require('./risk-model');
const { classifyRisk } = require('./risk-tiers');
const { escalate } = require('./risk-tiers-workflow');

/** @typedef {import('./risk-eval-label').Usage} Usage */
/** @typedef {{ number: number; reference: number; codeOnly: number; withAi: number; summary: string; sent: boolean; usage?: Usage }} Result */

/** @param {{ reference: number; predicted: number }[]} pairs */
function metrics(pairs) {
  assert.ok(pairs.length, 'Cannot score an empty sample.');
  for (const pair of pairs) {
    assert.ok(
      [pair.reference, pair.predicted].every(tier => Number.isInteger(tier) && tier >= 0 && tier <= 3),
      'Invalid tier.',
    );
  }
  const n = pairs.length;
  const matches = pairs.filter(pair => pair.reference === pair.predicted).length;
  const p = matches / n;
  const z = 1.96;
  const divisor = 1 + (z * z) / n;
  const center = (p + (z * z) / (2 * n)) / divisor;
  const margin = (z * Math.sqrt((p * (1 - p)) / n + (z * z) / (4 * n * n))) / divisor;
  return {
    prs: n,
    matches,
    exactMatchRate: p,
    wilson95: { lower: center - margin, upper: center + margin },
    meanTierDifference: pairs.reduce((sum, pair) => sum + pair.predicted - pair.reference, 0) / n,
  };
}

/** @param {string} labelsFile @param {string} outputFile */
async function scorePulls(labelsFile, outputFile) {
  const labelsText = readFileSync(labelsFile, 'utf8');
  /** @type {import('./risk-eval-label').Labels} */
  const labels = JSON.parse(labelsText);
  assert.ok(
    labels.version === 1 && labels.rows.length === labels.numbers.length && labels.rows.every(row => row.reference),
    'Finish expert labeling first.',
  );
  assert.equal(new Set(labels.rows.map(row => row.pull.number)).size, labels.numbers.length);
  const endpoint = azureEndpoint(process.env.RISK_MODEL_ENDPOINT);
  const deployment = process.env.RISK_MODEL_DEPLOYMENT;
  const model = process.env.RISK_MODEL_ID;
  assert.ok(deployment && model, 'Set RISK_MODEL_DEPLOYMENT and RISK_MODEL_ID.');
  const classifierHash = hash(
    ['risk-tiers.js', 'risk-model.js', 'risk-tiers-workflow.js']
      .map(name => readFileSync(join(__dirname, name), 'utf8'))
      .join('\n') + readFileSync(join(__dirname, '../../../.github/risk-tiers.json'), 'utf8'),
  );
  const config = { datasetHash: hash(labelsText), classifierHash, deployment, model, endpointHash: hash(endpoint) };
  /** @type {{ config: typeof config; rows: Result[]; calls: import('./risk-eval-label').Call[]; report?: unknown }} */
  const output = existsSync(outputFile)
    ? JSON.parse(readFileSync(outputFile, 'utf8'))
    : { config, rows: [], calls: [] };
  assert.deepEqual(
    output.config,
    config,
    'Use a new results file when inputs, classifier code, or model configuration change.',
  );
  save(outputFile, output);
  for (const row of labels.rows) {
    if (output.rows.some(existing => existing.number === row.pull.number)) {
      continue;
    }
    assert.ok(row.reference);
    const deterministic = classifyRisk(row.pull.files, { changedFiles: row.pull.changedFiles });
    /** @type {Result} */
    const result = {
      number: row.pull.number,
      reference: row.reference.tier,
      codeOnly: deterministic.tier,
      withAi: deterministic.tier,
      summary: '',
      sent: false,
    };
    const assessment = await escalate({
      pull: { labels: [{ name: 'ai-review' }] },
      deterministic,
      getTrust: async () => ({ trusted: true }),
      getDiff: async () => {
        if (row.pull.diffSource === 'git') {
          throw new Error('GitHub full-diff API rejected this PR; preserve the production unassessed fallback.');
        }
        return row.pull.diff;
      },
      raise: true,
      assessRisk: async input => {
        /** @type {import('./risk-eval-label').Call | undefined} */
        let call;
        const answer = await askRiskModel(input, {
          endpoint,
          deployment,
          model,
          getToken: async () => azureToken(),
          fetcher: (...args) => {
            result.sent = true;
            call = { number: row.pull.number, sent: true, at: new Date().toISOString() };
            output.calls.push(call);
            save(outputFile, output);
            return fetch(...args);
          },
        });
        result.usage = {
          inputTokens: answer.inputTokens,
          cachedInputTokens: answer.cachedInputTokens,
          outputTokens: answer.outputTokens,
        };
        assert.ok(call);
        call.usage = result.usage;
        call.model = answer.model;
        return answer;
      },
    });
    result.withAi = assessment.tier;
    result.summary = assessment.summary;
    output.rows.push(result);
    save(outputFile, output);
    console.log(
      `Scored #${result.number}: code ${result.codeOnly}, code + AI ${result.withAi}, reference ${result.reference}.`,
    );
  }
  assert.equal(new Set(output.rows.map(row => row.number)).size, labels.numbers.length, 'Result sample mismatch.');
  const expertUsage = totalUsage(labels.calls.flatMap(call => (call.usage ? [call.usage] : [])));
  const riskUsage = totalUsage(output.calls.flatMap(call => (call.usage ? [call.usage] : [])));
  const expertUnknown = labels.calls.filter(call => call.sent && !call.usage).length;
  const riskUnknown = output.calls.filter(call => call.sent && !call.usage).length;
  const expertPrice = price(expertUsage, 'RISK_EXPERT');
  const riskPrice = price(riskUsage, 'RISK_MODEL');
  output.report = {
    expert: {
      usage: expertUsage,
      callsWithUnknownUsage: expertUnknown,
      pricing: expertPrice,
      estimatedUsd: expertUnknown ? null : expertPrice.estimatedUsd,
    },
    codeOnly: {
      ...metrics(output.rows.map(row => ({ reference: row.reference, predicted: row.codeOnly }))),
      usage: { inputTokens: 0, cachedInputTokens: 0, outputTokens: 0 },
      estimatedUsd: 0,
    },
    codePlusAi: {
      ...metrics(output.rows.map(row => ({ reference: row.reference, predicted: row.withAi }))),
      usage: riskUsage,
      calls: output.calls.filter(call => call.sent).length,
      callsWithUnknownUsage: riskUnknown,
      unassessed: output.rows.filter(row => row.codeOnly < 3 && !row.usage).length,
      pricing: riskPrice,
      estimatedUsd: riskUnknown ? null : riskPrice.estimatedUsd,
    },
    note: 'Offline classifier replay; all sample PRs are authorized for the model. No GitHub writes. Expert cost is separate. Unknown prices are null, not zero.',
  };
  save(outputFile, output);
  console.log(JSON.stringify(output.report, null, 2));
}

module.exports = { metrics, scorePulls };

if (require.main === module) {
  const [labelsFile, outputFile] = process.argv.slice(2);
  if (!labelsFile || !outputFile) {
    console.error('Usage: risk-eval-score <local-labels.json> <local-results.json>');
    process.exitCode = 1;
  } else {
    scorePulls(labelsFile, outputFile).catch(error => {
      console.error(error.message);
      process.exitCode = 1;
    });
  }
}
