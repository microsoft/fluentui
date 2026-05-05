# GraphQL snippets for the board

All snippets assume the user is authenticated with a non-EMU token that has `read:project` (and `write:project` for mutations) plus repo-level write access to the three linked repos. Run the preflight check from `SKILL.md` first.

## Fetch untriaged items (paginated)

The board has 600+ items; this query pages 100 at a time. Keep calling with `after: <endCursor>` until `hasNextPage` is false, then filter client-side for open issues with no `Team` value.

```graphql
query ($cursor: String) {
  organization(login: "microsoft") {
    projectV2(number: 395) {
      items(first: 100, after: $cursor) {
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          id
          content {
            __typename
            ... on Issue {
              number
              title
              url
              state
              body
              repository {
                nameWithOwner
              }
              assignees(first: 5) {
                nodes {
                  login
                }
              }
              labels(first: 20) {
                nodes {
                  name
                }
              }
            }
            ... on DraftIssue {
              title
            }
            ... on PullRequest {
              number
              title
              url
              state
            }
          }
          fieldValues(first: 30) {
            nodes {
              __typename
              ... on ProjectV2ItemFieldSingleSelectValue {
                field {
                  ... on ProjectV2SingleSelectField {
                    name
                  }
                }
                name
              }
            }
          }
        }
      }
    }
  }
}
```

Minimal bash + python pagination:

```bash
cursor=""
> /tmp/board-items.jsonl
for i in $(seq 1 20); do
  if [ -z "$cursor" ]; then
    resp=$(gh api graphql -f query="$(cat /tmp/board-query.graphql)")
  else
    resp=$(gh api graphql -f query="$(cat /tmp/board-query.graphql)" -F cursor="$cursor")
  fi
  echo "$resp" > /tmp/board-page.json
  python3 - <<'PY'
import json
d = json.load(open('/tmp/board-page.json'))
items = d['data']['organization']['projectV2']['items']
with open('/tmp/board-items.jsonl','a') as out:
  for n in items['nodes']:
    out.write(json.dumps(n) + '\n')
with open('/tmp/board-meta.json','w') as m:
  json.dump({'hasNext': items['pageInfo']['hasNextPage'],
             'cursor': items['pageInfo']['endCursor']}, m)
PY
  has_next=$(python3 -c "import json; print(json.load(open('/tmp/board-meta.json'))['hasNext'])")
  cursor=$(python3 -c "import json; print(json.load(open('/tmp/board-meta.json'))['cursor'])")
  [ "$has_next" != "True" ] && break
done
```

## Client-side filter: untriaged open issues (matches view 6)

This mirrors the canonical "By team" view's filter. Keep this in sync with the view — see `SKILL.md` for how to refetch the view's filter string if it ever drifts.

```python
import json

EXCLUDE_LABELS = {
    'Help Wanted ✨',
    'Type: Epic',
    'Needs: Triage :mag:',
    'Resolution: Soft Close',
}

def is_untriaged_open_issue(item):
    c = item.get('content') or {}
    if c.get('__typename') != 'Issue':
        return False
    if c.get('state') != 'OPEN':
        return False
    labels = {l['name'] for l in c.get('labels', {}).get('nodes', [])}
    if labels & EXCLUDE_LABELS:
        return False
    has_team = False
    status_done = False
    for fv in item.get('fieldValues', {}).get('nodes', []):
        f = fv.get('field') or {}
        if f.get('name') == 'Team':
            has_team = True
        if f.get('name') == 'Status' and fv.get('name') == '✅ Done':
            status_done = True
    if has_team or status_done:
        return False
    return True

with open('/tmp/board-items.jsonl') as f:
    untriaged = [json.loads(line) for line in f if is_untriaged_open_issue(json.loads(line))]
```

## Set the Team field on an item

```bash
gh api graphql -f query='
mutation($projectId:ID!, $itemId:ID!, $fieldId:ID!, $optionId:String!) {
  updateProjectV2ItemFieldValue(input:{
    projectId: $projectId,
    itemId: $itemId,
    fieldId: $fieldId,
    value: { singleSelectOptionId: $optionId }
  }) { projectV2Item { id } }
}' \
  -f projectId="PVT_kwDOAF3p4s4AD4d_" \
  -f itemId="<PVTI_...>" \
  -f fieldId="PVTSSF_lADOAF3p4s4AD4d_zgCPFLY" \
  -f optionId="<option id from team-mapping.md>"
```

`gh project item-edit` can do the same thing if the token has write access, but the GraphQL form above is more transparent (you see exactly which field and option you're setting) and it's one less CLI subcommand for the skill to remember.

## Clear the Team field (undo a wrong set)

When a mistake slips past the approval gate and needs to be undone:

```bash
gh api graphql -f query='
mutation($projectId:ID!, $itemId:ID!, $fieldId:ID!) {
  clearProjectV2ItemFieldValue(input:{
    projectId: $projectId,
    itemId: $itemId,
    fieldId: $fieldId
  }) { projectV2Item { id } }
}' \
  -f projectId="PVT_kwDOAF3p4s4AD4d_" \
  -f itemId="<PVTI_...>" \
  -f fieldId="PVTSSF_lADOAF3p4s4AD4d_zgCPFLY"
```

## Add a GitHub-issue assignee

```bash
gh issue edit <num> --repo <owner/repo> --add-assignee <login>
```

Only call this when the recommendation has a specific login AND the issue has no existing assignee. If the user to assign is not a member of the repo org, the call will fail with `could not add assignee` — skip that item and move on.

## Fetch CODEOWNERS for a sibling repo

CODEOWNERS path may vary by repo. Most Microsoft repos keep it at `.github/CODEOWNERS`; some use `CODEOWNERS` at the root or `docs/CODEOWNERS`. Start with `.github/CODEOWNERS`:

```bash
gh api repos/microsoft/<repo>/contents/.github/CODEOWNERS \
  -H "Accept: application/vnd.github.raw" 2>/dev/null
```

If that returns 404, try the other locations. Cache the result in memory for the remainder of the session — the file is typically 100–500 lines and you'll re-check it for many items.
