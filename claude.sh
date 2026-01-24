#!/bin/bash

FILES="CLAUDE.md docs/"

if [ "$1" = "down" ]; then
    # Remove files
    echo "Removing $FILES..."
    rm -rf $FILES
else
    # Checkout files from claude branch
    echo "Bringing files from claude branch..."
    git checkout claude -- $FILES
    git restore --staged $FILES
fi