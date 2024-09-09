### What is cherry picking?

https://git-scm.com/docs/git-cherry-pick

### How can I cherry pick?

Say there is a bug fix made in Fabric 7.0 that you need in Fabric 6.0. Here are the steps you can take to cherry pick that commit into Fabric 6.0.

1. Open up the PR that made the bug fix and copy the commit hash.

2. In your forked repo, check out a branch off of the `6.0` branch.

```
git fetch upstream 6.0
git checkout upstream/6.0
git checkout -b myBranch
```

3. Cherry pick the changes into this branch by passing in the commit hash you saved earlier in step 1

```
git cherry-pick <commit-hash>
```

The chances that you will encounter some conflicts with several snapshot files are very high and also possible some conflicts in other files. A recommended approach to deal with those conflicts is to:

- For snapshot files: accept anything just to resolve the conflict and finalize the cherry pick commit.
- For any other file (which is not likely to happen): resolve the conflict without losing any of the current or incoming logic in the process.

4. Following step 3, in case you had some conflicts with snapshot files, best thing to do is run the `npm run update-snapshots` command in the root directory of the repo to make sure the snapshots are updated against the current 6.0 branch. In case you had a conflict with a snapshot file from the `a11y-tests` package you would need to build to that package first with `npm run buildfast -- --min` (which will skip the tests during the build) and after run `npm run update-a11y`.

5. Remove the change file that came with the cherry pick commit and run `npm run change` to generate a new one with your credentials and a description of the change mentioning that this is a cherry pick of a commit from Fabric 7 master branch to Fabric 6 along with the original description.

6. Push your changes and open a PR against the `6.0` branch.
