## Road to v9 stable roadmap:

![v9 release schedule diagram](https://user-images.githubusercontent.com/1223799/171665131-ab045ef6-341f-4c0c-8a82-2d7b82d75395.png)

## Local machine setup

> **Prerequisit:**
>
> you have the `origin` and `upstream` remotes configured per the [setup instructions](https://github.com/microsoft/fluentui/wiki/Setup#setting-the-upstream-remote

```sh
# Fetch changes from `upstream` github.com/microsoft/fluentui
git fetch upstream
# Create a local `9.0-rc` branch starting from the upstream `9.0-rc` branch
git checkout upstream/9.0-rc
# Get latest changes to your local machine
git pull upstream 9.0-rc
# Branch out from 9.0-rc and start developing
git checkout -b <my-branch-name>
```

## PR workflow setup

1. Push your branch changes

```sh
git push -u origin <my-branch-name>
```

2. Create PR against `9.0-rc`

![PR setup UI. Target your PR against 9.0-rc branch](https://user-images.githubusercontent.com/1223799/171664240-3c844b18-7be2-4fa9-a6a8-938db965955a.png)

3. After CI passes and you got all required approval. Merge

## Getting updates back to master

Based on your contribution to 9.0-rc branch it might be required to get the fix/change it to master ASAP. If that's the case, please create a PR against master via chery-pick of particular commit. The PR workflow follows standard practices.

## Merging `9.0-rc` back to master/ End of life

To merge back to master following workflow should be applied:

1. checkout `9.0-rc` branch and fetch latest updates to your local machine
2. drop following commits (you can use `git rebase -i` for example):

- [1st commit - enabling automatic PR pipeline runs](https://github.com/microsoft/fluentui/commit/8ff995e3aadda6551a72a8a96d5cd58159b2f624).
- [2nd commit - setting beachball branch](https://github.com/microsoft/fluentui/pull/23642)
  - NOTE: this one is not merged yet thus linking PR that will originate the commit hash

3. if you used rebase you'll need to force push.
4. create PR against `master`
5. once the pipeline passes and you get approval, merge
6. delete `9.0-rc`
