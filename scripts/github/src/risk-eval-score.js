// @ts-check

const assert = require('node:assert/strict');
const { existsSync, readFileSync } = require('node:fs');
const { join } = require('node:path');

const { hash, save, azureEndpoint, azureToken, readUsage, totalUsage, price } = require('./risk-eval-label');
const { askRiskModel, riskModelApi } = require('./risk-model');
const { classifyRisk } = require('./risk-tiers');
const { escalate } = require('./risk-tiers-workflow');

/** @typedef {import('./risk-eval-label').Usage} Usage */
/** @typedef {{ number: number; reference: number; codeOnly: number; withAi: number; summary: string; sent: boolean; assessed: boolean; modelTier?: number; usage?: Usage }} Result */

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

/** @param {import('./risk-eval-label').LabelRow[]} rows */
function pairGroups(rows) {
  if (!rows.some(row => row.pairId !== undefined)) {
    return [];
  }
  /** @type {Map<string, import('./risk-eval-label').LabelRow[]>} */
  const groups = new Map();
  for (const row of rows) {
    const id = row.pairId;
    assert.ok(typeof id === 'string' && id.trim(), 'Every paired case needs a pairId.');
    groups.set(id, [...(groups.get(id) || []), row]);
  }
  for (const group of groups.values()) {
    assert.equal(group.length, 2, 'Each pair must contain exactly two cases.');
    const floors = group.map(row => classifyRisk(row.pull.files, { changedFiles: row.pull.changedFiles }).tier);
    assert.ok(floors[0] < 3 && floors[0] === floors[1], 'Pair members must have the same sub-3 deterministic tier.');
    const paths = group.map(row =>
      row.pull.files
        .flatMap(file => (file.previous_filename ? [file.filename, file.previous_filename] : [file.filename]))
        .sort(),
    );
    assert.deepEqual(paths[0], paths[1], 'Pair members must change the same paths.');
    const expected = group.map(row => {
      assert.ok(row.reference && [0, 1, 2, 3].includes(row.reference.tier), 'Pair reference tier is invalid.');
      return row.reference.tier;
    });
    assert.ok(
      expected.includes(floors[0]) && expected.some(tier => tier > floors[0]),
      'A pair must preserve the baseline tier in one case and require escalation in the other.',
    );
  }
  return [...groups.values()];
}

/** @param {Result[]} rows @param {ReturnType<typeof pairGroups>} groups @param {'codeOnly' | 'withAi'} key */
function pairedMetrics(rows, groups, key) {
  const byNumber = new Map(rows.map(row => [row.number, row]));
  let baselineMatched = 0;
  let higherRiskMatched = 0;
  let bothCorrect = 0;
  for (const group of groups) {
    const results = group
      .map(row => {
        const result = byNumber.get(row.pull.number);
        assert.ok(result, 'Missing paired result.');
        return result;
      })
      .sort((a, b) => a.reference - b.reference);
    const baseline = results[0][key] === results[0].reference;
    const higherRisk = results[1][key] === results[1].reference;
    baselineMatched += Number(baseline);
    higherRiskMatched += Number(higherRisk);
    bothCorrect += Number(baseline && higherRisk);
  }
  return { pairs: groups.length, bothCorrect, baselineMatched, higherRiskMatched };
}

/** @param {Result[]} rows @param {import('./risk-eval-label').LabelRow[]} labels */
function validateResults(rows, labels) {
  assert.ok(Array.isArray(rows), 'Checkpoint results must be an array.');
  const inputs = new Map(labels.map(row => [row.pull.number, row]));
  const seen = new Set();
  for (const result of rows) {
    assert.ok(
      result && Number.isSafeInteger(result.number) && inputs.has(result.number),
      'Checkpoint has a foreign result.',
    );
    assert.ok(!seen.has(result.number), 'Checkpoint has duplicate results.');
    seen.add(result.number);
    const input = inputs.get(result.number);
    assert.ok(input?.reference);
    assert.equal(result.reference, input.reference.tier, 'Checkpoint reference differs from frozen labels.');
    const floor = classifyRisk(input.pull.files, { changedFiles: input.pull.changedFiles }).tier;
    assert.equal(result.codeOnly, floor, 'Checkpoint deterministic tier differs from current classifier.');
    assert.ok(floor < 3 || !result.sent, 'Protected results must not invoke the model.');
    assert.ok(
      typeof result.assessed === 'boolean' && typeof result.sent === 'boolean',
      'Checkpoint assessment status is invalid.',
    );
    assert.ok(
      Number.isInteger(result.withAi) && result.withAi >= floor && result.withAi <= 3,
      'Checkpoint final tier violates the deterministic floor.',
    );
    if (result.usage) {
      validateUsageRecord(result.usage);
      assert.ok(result.sent, 'Checkpoint usage requires a sent request.');
    }
    if (result.assessed) {
      assert.ok(
        floor < 3 &&
          result.sent &&
          result.usage &&
          Number.isInteger(result.modelTier) &&
          Number(result.modelTier) >= 0 &&
          Number(result.modelTier) <= 3,
        'Checkpoint accepted answer is incomplete.',
      );
      assert.equal(
        result.withAi,
        Math.max(floor, Number(result.modelTier)),
        'Checkpoint final tier differs from the accepted answer.',
      );
    } else {
      assert.equal(result.modelTier, undefined, 'Unassessed result must not contain an accepted model tier.');
      assert.equal(result.withAi, Math.max(floor, 2), 'Checkpoint fallback tier is invalid.');
    }
  }
}

/** @param {Usage} usage */
function validateUsageRecord(usage) {
  assert.ok(Number.isSafeInteger(usage.cachedInputTokens), 'Checkpoint cached token count is missing or invalid.');
  readUsage({
    input_tokens: usage.inputTokens,
    input_tokens_details: { cached_tokens: usage.cachedInputTokens },
    output_tokens: usage.outputTokens,
  });
}

/** @param {string} labelsFile @param {string} outputFile */
async function scorePulls(labelsFile, outputFile) {
  const labelsText = readFileSync(labelsFile, 'utf8');
  /** @type {import('./risk-eval-label').Labels} */
  const labels = JSON.parse(labelsText);
  assert.ok(
    labels.version === 1 &&
      Array.isArray(labels.rows) &&
      Array.isArray(labels.numbers) &&
      Array.isArray(labels.calls) &&
      labels.rows.length === labels.numbers.length &&
      labels.rows.every(
        row =>
          row.reference && Number.isInteger(row.reference.tier) && row.reference.tier >= 0 && row.reference.tier <= 3,
      ),
    'Finish expert labeling first.',
  );
  assert.equal(new Set(labels.rows.map(row => row.pull.number)).size, labels.numbers.length);
  assert.deepEqual(
    labels.rows.map(row => row.pull.number).sort((a, b) => a - b),
    [...labels.numbers].sort((a, b) => a - b),
    'Reference sample IDs do not match.',
  );
  const pairs = pairGroups(labels.rows);
  const endpoint = azureEndpoint(process.env.RISK_MODEL_ENDPOINT);
  const deployment = process.env.RISK_MODEL_DEPLOYMENT;
  const model = process.env.RISK_MODEL_ID;
  const api = riskModelApi(process.env.RISK_MODEL_API);
  const delayMs = Number(process.env.RISK_EVAL_DELAY_MS || 0);
  assert.ok(
    Number.isSafeInteger(delayMs) && delayMs >= 0 && delayMs <= 60_000,
    'RISK_EVAL_DELAY_MS must be an integer from 0 to 60000.',
  );
  assert.ok(deployment && model, 'Set RISK_MODEL_DEPLOYMENT and RISK_MODEL_ID.');
  const classifierHash = hash(
    ['risk-tiers.js', 'risk-model.js', 'risk-tiers-workflow.js']
      .map(name => readFileSync(join(__dirname, name), 'utf8'))
      .join('\n') + readFileSync(join(__dirname, '../../../.github/risk-tiers.json'), 'utf8'),
  );
  const config = {
    datasetHash: hash(labelsText),
    classifierHash,
    deployment,
    model,
    api,
    endpointHash: hash(endpoint),
    ...(delayMs ? { delayMs } : {}),
  };
  /** @type {{ config: typeof config; rows: Result[]; calls: import('./risk-eval-label').Call[]; report?: unknown }} */
  const output = existsSync(outputFile)
    ? JSON.parse(readFileSync(outputFile, 'utf8'))
    : { config, rows: [], calls: [] };
  assert.deepEqual(
    output.config,
    config,
    'Use a new results file when inputs, classifier code, or model configuration change.',
  );
  validateResults(output.rows, labels.rows);
  assert.ok(Array.isArray(output.calls), 'Checkpoint calls must be an array.');
  for (const call of output.calls) {
    assert.ok(
      call && labels.numbers.includes(call.number) && typeof call.sent === 'boolean',
      'Invalid checkpoint call.',
    );
    if (call.usage) {
      assert.ok(call.sent, 'Checkpoint usage requires a sent request.');
      validateUsageRecord(call.usage);
    }
    assert.ok(call.model === undefined || typeof call.model === 'string', 'Invalid checkpoint model identity.');
  }
  for (const result of output.rows) {
    const calls = output.calls.filter(call => call.number === result.number && call.sent);
    if (result.sent) {
      assert.ok(calls.length > 0, 'Checkpoint result has no supporting call.');
      assert.deepEqual(result.usage, calls[calls.length - 1]?.usage, 'Checkpoint result and call usage disagree.');
    }
    if (result.assessed) {
      assert.equal(
        calls[calls.length - 1]?.model?.toLowerCase(),
        model.toLowerCase(),
        'Checkpoint accepted answer has no verified model identity.',
      );
    }
  }
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
      assessed: false,
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
          api,
          onUsage: (usage, verifiedModel) => {
            assert.ok(call);
            call.usage = usage;
            call.model = verifiedModel;
            result.usage = usage;
            save(outputFile, output);
          },
          getToken: async () => {
            if (delayMs) {
              await new Promise(resolve => {
                setTimeout(resolve, delayMs);
              });
            }
            return azureToken();
          },
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
        result.assessed = true;
        result.modelTier = answer.tier;
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
      `Scored ${pairs.length ? 'case ' : '#'}${result.number}: code ${result.codeOnly}, code + AI ${
        result.withAi
      }, reference ${result.reference}.`,
    );
  }
  validateResults(output.rows, labels.rows);
  assert.equal(output.rows.length, labels.numbers.length, 'Result count differs from the frozen sample.');
  assert.equal(new Set(output.rows.map(row => row.number)).size, labels.numbers.length, 'Result sample mismatch.');
  const expertUsage = totalUsage(labels.calls.flatMap(call => (call.usage ? [call.usage] : [])));
  const riskUsage = totalUsage(output.calls.flatMap(call => (call.usage ? [call.usage] : [])));
  const expertUnknown = labels.calls.filter(call => call.sent && !call.usage).length;
  const riskUnknown = output.calls.filter(call => call.sent && !call.usage).length;
  const riskUnverified = output.calls.filter(
    call => call.sent && call.usage && call.model?.toLowerCase() !== model.toLowerCase(),
  ).length;
  const expertPrice = price(expertUsage, 'RISK_EXPERT');
  const riskPrice = price(riskUsage, 'RISK_MODEL');
  if (riskUnverified) {
    riskPrice.estimatedUsd = null;
  }
  /** @param {'codeOnly' | 'withAi'} key */
  const referencePairs = key =>
    labels.rows.map(label => {
      const result = output.rows.find(row => row.number === label.pull.number);
      assert.ok(result && label.reference);
      return { reference: label.reference.tier, predicted: result[key] };
    });
  output.report = {
    expert: {
      usage: expertUsage,
      callsWithUnknownUsage: expertUnknown,
      pricing: expertPrice,
      estimatedUsd: expertUnknown ? null : expertPrice.estimatedUsd,
    },
    codeOnly: {
      ...metrics(referencePairs('codeOnly')),
      ...(pairs.length ? { wilson95: undefined, paired: pairedMetrics(output.rows, pairs, 'codeOnly') } : {}),
      usage: { inputTokens: 0, cachedInputTokens: 0, outputTokens: 0 },
      estimatedUsd: 0,
    },
    codePlusAi: {
      api,
      ...metrics(referencePairs('withAi')),
      ...(pairs.length ? { wilson95: undefined, paired: pairedMetrics(output.rows, pairs, 'withAi') } : {}),
      usage: riskUsage,
      calls: output.calls.filter(call => call.sent).length,
      callsWithUnknownUsage: riskUnknown,
      callsWithUnverifiedModel: riskUnverified,
      unassessed: output.rows.filter(row => row.codeOnly < 3 && !row.assessed).length,
      pricing: riskPrice,
      estimatedUsd: riskUnknown ? null : riskPrice.estimatedUsd,
    },
    note:
      'Offline classifier replay; all sample PRs are authorized for the model. No GitHub writes. Expert cost is separate. Unknown prices are null, not zero.' +
      (pairs.length
        ? ' Constructed pairs use local case IDs, not GitHub PRs. They are not independent population samples; no sampling confidence interval is reported.'
        : ''),
  };
  save(outputFile, output);
  console.log(JSON.stringify(output.report, null, 2));
}

module.exports = { metrics, pairGroups, pairedMetrics, scorePulls, validateResults };

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
