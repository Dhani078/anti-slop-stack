# CI/CD Integration Guide

anti-slop-stack integrates into any continuous integration pipeline as a blocking quality gate.

## GitHub Actions

Use the official composite action:

```yaml
name: Code Quality Gate

on: [push, pull_request]

jobs:
  anti-slop:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
      - name: Run Anti-Slop Audit
        uses: Dhani078/anti-slop-stack@v1
        with:
          path: 'src'
          fail-on-violation: 'true'
```

## GitLab CI

Add to `.gitlab-ci.yml`:

```yaml
anti_slop_gate:
  image: node:22-alpine
  stage: test
  script:
    - npx anti-slop ci src/
  rules:
    - if: $CI_PIPELINE_SOURCE == 'merge_request_event'
    - if: $CI_COMMIT_BRANCH == 'main'
```

## Bitbucket Pipelines

Add to `bitbucket-pipelines.yml`:

```yaml
pipelines:
  pull-requests:
    '**':
      - step:
          name: Anti-Slop Quality Gate
          image: node:22
          script:
            - npx anti-slop ci src/
```

## Docker Container

Run directly inside containerized build environments:

```bash
docker run --rm -v $(pwd):/app -w /app node:22-alpine npx anti-slop ci src/
```
