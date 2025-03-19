#!/bin/bash

OWNER="$GITHUB_REPOSITORY_OWNER"
REPO="$GITHUB_REPOSITORY"
PR_NUMBER="$GITHUB_EVENT_NUMBER"

function get_pr_details {
    local url="https://api.github.com/repos/${REPO}/pulls/${PR_NUMBER}"
    local response=$(curl -s -H "Authorization: Bearer $GITHUB_TOKEN" "${url}")
    echo "${response}"
}

function main {
    local files_per_commit=10
    local lines_per_commit=600
    echo "#####################################"
    echo "#########  Configuration  ###########"
    echo "- Files changed per commit: ${files_per_commit}"
    echo "- Lines changed per commit: ${lines_per_commit}"
    echo "####################################"
    echo "####################################"

    local pr_details=$(get_pr_details)
    if [ -n "${pr_details}" ]; then
        local pr_title=$(echo "${pr_details}" | jq -r '.title')
        local pr_body=$(echo "${pr_details}" | jq -r '.body')

        if [[ "${pr_title}" == Revert* ]] || [[ "${pr_body}" == *"This reverts commit"* ]]; then
            echo "🔄 PR is a revert. Skip checks."
            exit 0
        fi

        local lines_changed=$(echo "${pr_details}" | jq '.additions + .deletions')
        local files_changed=$(echo "${pr_details}" | jq '.changed_files')
        local commits_count=$(echo "${pr_details}" | jq '.commits')
        echo "Files changed: ${files_changed}"
        echo "Lines changed: ${lines_changed}"
        echo "Commits count: ${commits_count}"
        # 10 files changed each 1 commit
        if [ "${files_changed}" -gt $((commits_count * files_per_commit)) ]; then
          if [ "${lines_changed}" -gt $((files_changed * 2)) ]; then
            echo "Too many 'lines' changed relative to commits"
            exit 1
          fi
        fi
    else
        echo "Failed to fetch PR details"
        exit 1
    fi
}

main

