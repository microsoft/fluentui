// Phase-2 batch conversion workflow (Workflow tool script — run via {scriptPath, args}).
// DRAFT until the react-divider pilot finalizes the cookbook (RUNBOOK Phase 1).
//
// args: { batchName: string, packages: [{ name: 'react-badge', filter: 'Badge Converged', expect: 20 }] }
//   - name: ledger package name; filter/expect: VR story filter + min screenshot count
//     (overseer derives filter from apps/vr-tests-react-components/src/stories/<X>/).
// Overseer contract: tree is clean and committed; VR storybook freshly built from the
// pre-batch commit; overseer updates ledger + commits after reading the return value.
//
// Shared-state constraint: the VR storybook build reflects the WHOLE tree. Baselines
// are captured before any conversion in this batch; candidates after one rebuild.
// Fix iterations rebuild once per round, not per package.

export const meta = {
  name: 'convert-batch',
  description: 'Convert a batch of packages from Griffel to Tailwind+CSS Modules, validate pixel parity',
  phases: [
    { title: 'Baseline', detail: 'per-package VR baseline capture (pre-conversion build)' },
    { title: 'Convert', detail: 'one Opus worker per package, cookbook-driven' },
    { title: 'Validate', detail: 'single storybook rebuild, capture+diff+tests per package' },
    { title: 'Fix', detail: 'bounded fix rounds for failing packages' },
  ],
};

const V = 'migration/griffel-to-tailwind/validation';
const HOOK_NOTE = `HOOKS: a GateGuard hook blocks your first Bash call and every new-file Write with a "[Fact-Forcing Gate]" error — present the requested facts in text, then retry the identical call. A graphify hook mandates 'graphify query' before broad exploration; direct reads of files you modify are fine. Windows: never pass regex args through .cmd shims — use 'node <script.js>'.`;

const RESULT_SCHEMA = {
  type: 'object',
  required: ['status', 'summary'],
  properties: {
    status: { type: 'string', enum: ['converted', 'blocked'] },
    summary: { type: 'string' },
    filesChanged: { type: 'array', items: { type: 'string' } },
    dataAttributesAdded: { type: 'array', items: { type: 'string' } },
    deviations: { type: 'array', items: { type: 'string' } },
    openQuestions: { type: 'array', items: { type: 'string' } },
  },
};

const VERIFY_SCHEMA = {
  type: 'object',
  required: ['vrPassed', 'testsPassed', 'detail'],
  properties: {
    vrPassed: { type: 'boolean' },
    testsPassed: { type: 'boolean' },
    detail: { type: 'string', description: 'diff summary numbers, failing files, test failures' },
  },
};

const pkgs = args.packages;
if (!pkgs?.length) throw new Error('args.packages required');

// ── Phase A: baselines (pre-conversion tree) ─────────────────────────────────
phase('Baseline');
const baselines = await parallel(
  pkgs.map(
    p => () =>
      agent(
        `In C:/Users/ArrayKnight/Code/fluentui run exactly:\n` +
          `node ${V}/capture.mjs --filter "${p.filter}" --out ${V}/baseline/${p.name} --expect ${p.expect}\n` +
          `${HOOK_NOTE}\nReturn the manifest count and whether it met --expect. Do nothing else.`,
        { label: `baseline:${p.name}`, phase: 'Baseline', model: 'sonnet', effort: 'low' },
      ),
  ),
);
log(`baselines: ${baselines.filter(Boolean).length}/${pkgs.length}`);

// ── Phase B: parallel conversion (distinct package dirs — no worktree needed) ─
phase('Convert');
const conversions = await parallel(
  pkgs.map(
    p => () =>
      agent(
        `You are a conversion worker for the Fluent UI Griffel → Tailwind v4 + CSS Modules migration.\n` +
          `Repo: C:/Users/ArrayKnight/Code/fluentui, branch styling/tailwind-css-modules. Your ONLY package: ${p.name}.\n` +
          `READ FIRST: migration/griffel-to-tailwind/CONVERSION_GUIDE.md, then reports/DECISIONS.md, then the package's *.styles.ts files.\n` +
          `Follow the cookbook exactly: module.css per component (@reference '#theme', fui.* layers, :where() variants, logical properties, longhand expansion, literal var(--token)); rewrite use*Styles hooks with clsx; add data-* attributes per the headless vocabulary; extend packages/react-components/react-tailwind-theme/css/variants.css ONLY if a needed variant is missing; package.json sideEffects allowlist + clsx dep + #theme imports entry (copy react-divider's).\n` +
          `Wire the package's jest config with the shared css-module proxy + serializer (copy react-divider's setup). Run 'yarn nx run ${p.name}:test' and review snapshot diffs (only data-* additions allowed) before updating.\n` +
          `Do NOT rebuild the storybook, capture screenshots, or commit. Touch only ${p.name}'s directory (+ variants.css additions).\n` +
          `${HOOK_NOTE}`,
        { label: `convert:${p.name}`, phase: 'Convert', model: 'opus', schema: RESULT_SCHEMA },
      ),
  ),
);

// ── Phase C/D: rebuild once, then validate each package; bounded fix rounds ──
const results = {};
pkgs.forEach((p, i) => {
  results[p.name] = { conversion: conversions[i], verify: null, fixRounds: 0 };
});

const MAX_ROUNDS = 3;
let pending = pkgs.filter((p, i) => conversions[i]?.status === 'converted');
pkgs.forEach((p, i) => {
  if (conversions[i]?.status !== 'converted') results[p.name].final = 'blocked';
});

for (let round = 0; round <= MAX_ROUNDS && pending.length; round++) {
  phase('Validate');
  await agent(
    `In C:/Users/ArrayKnight/Code/fluentui run 'yarn nx run vr-tests-react-components:build-storybook' and report success/failure with the last 20 log lines on failure. ${HOOK_NOTE}`,
    { label: `rebuild-storybook:r${round}`, phase: 'Validate', model: 'sonnet', effort: 'low' },
  );

  const verifications = await parallel(
    pending.map(
      p => () =>
        agent(
          `In C:/Users/ArrayKnight/Code/fluentui run, in order:\n` +
            `1. node ${V}/capture.mjs --filter "${p.filter}" --out ${V}/candidate/${p.name} --expect ${p.expect}\n` +
            `2. node ${V}/diff.mjs --baseline ${V}/baseline/${p.name} --candidate ${V}/candidate/${p.name}\n` +
            `3. yarn nx run ${p.name}:test\n` +
            `${HOOK_NOTE}\nReturn vrPassed (diff exit 0), testsPassed, and detail (summary.json numbers, failing screenshot names, test failures).`,
          { label: `verify:${p.name}:r${round}`, phase: 'Validate', model: 'sonnet', schema: VERIFY_SCHEMA },
        ),
    ),
  );

  const stillFailing = [];
  pending.forEach((p, i) => {
    const v = verifications[i];
    results[p.name].verify = v;
    if (v?.vrPassed && v?.testsPassed) results[p.name].final = 'validated';
    else stillFailing.push(p);
  });

  if (!stillFailing.length || round === MAX_ROUNDS) {
    stillFailing.forEach(p => (results[p.name].final = 'failed-validation'));
    pending = [];
    break;
  }

  phase('Fix');
  await parallel(
    stillFailing.map(
      p => () =>
        agent(
          `Fix the failing Griffel→CSS-Modules conversion of ${p.name} in C:/Users/ArrayKnight/Code/fluentui.\n` +
            `Failure detail: ${JSON.stringify(results[p.name].verify?.detail ?? 'unknown').slice(0, 2000)}\n` +
            `Diff artifacts: ${V}/candidate/${p.name}-diff/ (summary.json + per-failure diff PNGs — read them; the diff PNG shows WHERE pixels differ).\n` +
            `Compare against the Griffel source (git show HEAD -- <styles file>) and CONVERSION_GUIDE.md. Common causes: layer/order mismatch (mergeClasses argument order!), missed logical property, wrong token, missing data-attribute. Fix the CSS/hook; do not rebuild the storybook or capture; do not touch baselines.\n` +
            `${HOOK_NOTE}`,
          { label: `fix:${p.name}:r${round}`, phase: 'Fix', model: 'opus' },
        ),
    ),
  );
  stillFailing.forEach(p => results[p.name].fixRounds++);
  pending = stillFailing;
}

return results;
