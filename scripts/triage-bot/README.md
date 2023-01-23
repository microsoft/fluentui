# Triage Bot

Package for automated issues triage.

> Note: contains logic which needs to be used from within https://github.com/actions/github-script

## Setup

1. Create bot config file `.github/triage-bot.config.json`

```json
{
  "$schema": "../scripts/triage-bot/triage-bot.schema.json",
  "params": [
    {
      "keyword": "(@fluentui/react-northstar)",
      "labels": ["Fluent UI react-northstar (v0)"],
      "assignees": ["team-1"]
    },
    { "keyword": "(@fluentui/react)", "labels": ["Fluent UI react (v8)"], "assignees": ["team-2"] },
    {
      "keyword": "(@fluentui/react-components)",
      "labels": ["Fluent UI react-components (v9)"],
      "assignees": ["team-3"]
    }
  ]
}
```

2. Create GH workflow

```yml
name: Triage Bot
on:
  issues:
    types:
      - opened

jobs:
  triage-issue-manual:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/github-script@v6
        with:
          script: |
            const config = require('./.github/triage-bot.config.json');
            const run = require('./scripts/triage-bot');
            await run({github,context,core,config});
```

### Outcome

Now on every issue creation, based on project we have chosen, bot will label and add assignees defined by our config automatically

<img width="584" alt="picking library during issue creation" src="https://user-images.githubusercontent.com/1223799/191800000-f73df978-b389-4218-9da7-288cacd32874.png">
