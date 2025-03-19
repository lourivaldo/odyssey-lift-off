#!/usr/bin/env bash

set -e

SRC_BRANCH=${GITHUB_HEAD_REF:-$(git branch --show-current)}

if [[ "$SRC_BRANCH" =~ ^(main|beta|master|mercashop-beta|cons-eng-beta|mkt-intel-beta|foundation-beta|mercashop-beta|industry-beta|cons-eng-beta|mkt-intel-beta|foundation-beta|(refactor|ci|perf|revert|chore|feature|test|(bug|hot)fix|ci)(/[a-zA-Z0-9]+([-_][a-zA-Z0-9]+)*){1,2}|release/[0-9]+(\.[0-9]+)*(-(alpha|beta|rc)[0-9]*)?)$ ]]; then
  echo "Branch match pattern: "$SRC_BRANCH
else
  echo "Branch no match pattern: "$SRC_BRANCH
  exit 1;
fi