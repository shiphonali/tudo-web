#!/bin/bash
# TUDO — double-click launcher. Starts a local server and opens the site.
cd "$(dirname "$0")" || exit 1
PORT=8000
# find a free port starting at 8000
while lsof -nP -iTCP:$PORT -sTCP:LISTEN >/dev/null 2>&1; do PORT=$((PORT+1)); done
echo "──────────────────────────────────────────────"
echo "  TUDO is starting at http://localhost:$PORT"
echo "  Keep this window open while browsing."
echo "  Close it (or press Ctrl+C) to stop the site."
echo "──────────────────────────────────────────────"
python3 -m http.server $PORT >/dev/null 2>&1 &
SERVER_PID=$!
sleep 1
open "http://localhost:$PORT/index.html"
trap "kill $SERVER_PID 2>/dev/null" EXIT
wait $SERVER_PID
