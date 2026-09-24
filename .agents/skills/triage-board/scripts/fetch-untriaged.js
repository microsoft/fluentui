#!/usr/bin/env node
// Fetch all items from the Fluent UI Unified board (microsoft/projects/395),
// page through them via GraphQL, and emit JSONL of items that match the
// board's "By team" view (view 6) filter:
//   - content is an Issue (skip DraftIssue, PullRequest)
//   - issue is OPEN
//   - Team field is unset
//   - Status is not "✅ Done"
//   - Labels do not include Help Wanted ✨ / Type: Epic / Needs: Triage :mag: / Resolution: Soft Close
//
// Usage:
//   node fetch-untriaged.js              # JSONL to stdout
//   node fetch-untriaged.js --count      # just print the count
//
// Requires the GitHub CLI (`gh`) installed and authenticated. Run the
// SKILL.md preflight first.

const { execFileSync } = require('node:child_process');

const PROJECT_NUMBER = 395;
const ORG = 'microsoft';
const PAGE_SIZE = 100;
const MAX_PAGES = 20;

const EXCLUDE_LABELS = new Set(['Help Wanted ✨', 'Type: Epic', 'Needs: Triage :mag:', 'Resolution: Soft Close']);

const QUERY = `
query ($cursor: String) {
  organization(login: "${ORG}") {
    projectV2(number: ${PROJECT_NUMBER}) {
      items(first: ${PAGE_SIZE}, after: $cursor) {
        pageInfo { hasNextPage endCursor }
        nodes {
          id
          content {
            __typename
            ... on Issue {
              number title url state body
              repository { nameWithOwner }
              assignees(first: 5) { nodes { login } }
              labels(first: 20) { nodes { name } }
            }
            ... on DraftIssue { title }
            ... on PullRequest { number title url state }
          }
          fieldValues(first: 30) {
            nodes {
              __typename
              ... on ProjectV2ItemFieldSingleSelectValue {
                field { ... on ProjectV2SingleSelectField { name } }
                name
              }
            }
          }
        }
      }
    }
  }
}`;

function ghGraphQL(cursor) {
  const args = ['api', 'graphql', '-f', `query=${QUERY}`];
  if (cursor) args.push('-F', `cursor=${cursor}`);
  const out = execFileSync('gh', args, { encoding: 'utf8', maxBuffer: 32 * 1024 * 1024 });
  return JSON.parse(out);
}

function isUntriagedOpenIssue(item) {
  const c = item.content;
  if (!c || c.__typename !== 'Issue' || c.state !== 'OPEN') return false;

  const labels = new Set((c.labels?.nodes ?? []).map(l => l.name));
  for (const ex of EXCLUDE_LABELS) if (labels.has(ex)) return false;

  let hasTeam = false;
  let statusDone = false;
  for (const fv of item.fieldValues?.nodes ?? []) {
    const fieldName = fv.field?.name;
    if (fieldName === 'Team') hasTeam = true;
    if (fieldName === 'Status' && fv.name === '✅ Done') statusDone = true;
  }
  return !hasTeam && !statusDone;
}

function main() {
  const countOnly = process.argv.includes('--count');

  let cursor = null;
  let total = 0;
  for (let page = 0; page < MAX_PAGES; page++) {
    const resp = ghGraphQL(cursor);
    if (resp.errors) {
      console.error('GraphQL errors:', JSON.stringify(resp.errors, null, 2));
      process.exit(1);
    }
    const items = resp.data.organization.projectV2.items;
    for (const node of items.nodes) {
      if (isUntriagedOpenIssue(node)) {
        total++;
        if (!countOnly) process.stdout.write(JSON.stringify(node) + '\n');
      }
    }
    if (!items.pageInfo.hasNextPage) break;
    cursor = items.pageInfo.endCursor;
  }

  if (countOnly) console.log(total);
  else console.error(`# ${total} untriaged item(s)`);
}

main();
