**Test:**

- nx run-many --target=test --parallel=4 / 26m 9s
- 🚅 nx run-many --target=test --parallel=8 --maxWorkers=4 / 23m 34s
- nx run-many --target=test --parallel=8 --maxWorkers=2 / 25m 34s
- nx run-many --target=test --parallel=8 --maxWorkers=4 && v9 jest has maxWorkers=4 / 29m 11s
- nx run-many --target=test --parallel=8 --maxWorkers=4 && v9 jest has maxWorkers=4 && ts-jest isolatedModules / 31m 56s

  - this doesn't make any sense, the test time should have been the same as the fastest or even faster (23m)

- lage test / (constantly fails on ssr-test (TimeoutError: Navigation timeout of 10000 ms exceeded)
  )
  - 27m 5s
  - 33m 50s

### react-components

~~All packages use native jest so no perf bottlenecks caused by test execution. ✅~~

🔥 v9 packages are not using maxWorkers which might cause OOM and other issues on CI !!!!

- fixed by setting maxWorkers on CI

### react

- used `runInBand` on CI !!!!! (update: without that it will never finish because memory leaks, we will use maxThreadWorkers=4)

| Run type                       | time       | command                                                                 |
| ------------------------------ | ---------- | ----------------------------------------------------------------------- |
| current                        | 263 s      | `just test --runInBand --no-cache`                                      |
| current (CI)                   | 15m 10.01s | part of `lage build test lint type-check`                               |
| without runInBand              | 85 s       | `just test --no-cache`                                                  |
| without runInBand (+ raw jest) | 82 s       | `jest --no-cache`                                                       |
| without runInBand (CI)         | ?          | part of `lage build test lint type-check`. This will never finish on CI |

**Tests contain memory leaks**

> discovered on CI when pipeline was executed via nx:

```
worker process has failed to exit gracefully and has been force exited. This is likely caused by tests leaking due to improper teardown. Try running with --detectOpenHandles to find leaks. Active timers can also cause this, ensure that .unref() was called on them.
```

### react-northstar

| Run type                                | time  | command                                                                    |
| --------------------------------------- | ----- | -------------------------------------------------------------------------- |
| current                                 | 382 s | `gulp test --config ./jest.config.js --coverage --maxWorkers=2 --no-cache` |
| without codecov                         | 348 s | `gulp test --config ./jest.config.js --maxWorkers=2 --no-cache`            |
| without codecov,maxWorkers              | 232 s | `gulp test --config ./jest.config.js --no-cache`                           |
| without codecov,maxWorkers (+ raw jest) | 196 s | `jest --config ./jest.config.js --no-cache`                                |

#### More data:

**70% of the test scenarios are very slow** - triggering jest warnings:

```
 PASS  test/specs/components/Skeleton/SkeletonButton-test.tsx (10.063 s)
 PASS  test/specs/components/Skeleton/SkeletonAvatar-test.tsx (10.126 s)
 PASS  test/specs/components/Chat/ChatMessageReadStatus-test.tsx (9.917 s)
 PASS  test/specs/components/Carousel/CarouselNavigationItem-test.tsx (10.338 s)
 PASS  test/specs/components/Button/ButtonContent-test.tsx (9.267 s)
 PASS  test/specs/components/Attachment/AttachmentDescription-test.tsx (9.598 s)
 PASS  test/specs/components/Toolbar/ToolbarMenuItemIcon-test.ts (9.674 s)
 PASS  test/specs/components/Dropdown/DropdownItem-test.tsx (9.877 s)
 PASS  test/specs/components/Toolbar/ToolbarMenu-test.tsx (10.047 s)
 PASS  test/specs/components/Toolbar/ToolbarMenuDivider-test.ts (9.796 s)
 PASS  test/specs/components/Toolbar/ToolbarItemWrapper-test.tsx (9.426 s)
 PASS  test/specs/components/Breadcrumb/Breadcrumb-test.ts (11.22 s)
 PASS  test/specs/components/Breadcrumb/BreadcrumbDivider-test.ts (9.089 s)
 PASS  test/specs/components/SplitButton/SplitButtonToggle-test.tsx (9.46 s)
 PASS  test/specs/components/Alert/AlertDismissAction-test.tsx (10.006 s)
 PASS  test/specs/components/List/ListItemContentMedia-test.tsx (9.923 s)
 PASS  test/specs/components/Skeleton/SkeletonInput-test.tsx (9.283 s)
 PASS  test/specs/components/Skeleton/SkeletonShape-test.tsx (9.819 s)
 PASS  test/specs/components/Chat/ChatMessageContent-test.tsx (11.646 s)
 PASS  test/specs/components/Menu/MenuItemIndicator-test.tsx (11.176 s)
```

**Tests contain memory leaks**

> discovered while executing via raw `jest` instead `gulp`

```
A worker process has failed to exit gracefully and has been force exited. This is likely caused by tests leaking due to improper teardown. Try running with --detectOpenHandles to find leaks. Active timers can also cause this, ensure that .unref() was called on them.
```
