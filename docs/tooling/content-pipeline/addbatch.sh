#!/bin/bash
# Usage: addbatch.sh <new_xxx.js>  (from anywhere). Merges into next dataN.js and registers it in index.html.
cd /home/user/the-story-of-art
S=/tmp/claude-0/-home-user/baf04f03-9a29-57d0-91e0-c59665f7425b/scratchpad
N=$(ls data*.js | sed 's/data\([0-9]*\).js/\1/' | sort -n | tail -1); N=$((N+1))
node /home/user/proposal/merge.js $S/$1 data$N.js || exit 1
sed -i "s#<script src=\"data$((N-1)).js\"></script>#<script src=\"data$((N-1)).js\"></script>\n<script src=\"data$N.js\"></script>#" index.html
echo "$1 -> data$N.js" >> /home/user/proposal/progress.md
