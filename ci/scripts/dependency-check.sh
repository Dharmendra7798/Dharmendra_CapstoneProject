#!/bin/bash
set -e

echo "🔍 Starting OWASP Dependency Check..."

# Directory where reports will be saved
OUTPUT_DIR="dependency-check-report"
mkdir -p $OUTPUT_DIR

# Download OWASP Dependency Check if not already present
if [ ! -f "./dependency-check/bin/dependency-check.sh" ]; then
  echo "⬇️ Downloading OWASP Dependency Check..."
  wget https://github.com/jeremylong/DependencyCheck/releases/download/v9.1.0/dependency-check-9.1.0-release.zip -O dc.zip
  unzip -q dc.zip
  mv dependency-check ./dependency-check
  rm -f dc.zip
fi

# Run dependency check (adjust for your language stack)
./dependency-check/bin/dependency-check.sh \
  --project "MERN-App" \
  --scan . \
  --format "HTML" \
  --out $OUTPUT_DIR

echo "✅ Dependency check completed. Report saved to: $OUTPUT_DIR/dependency-check-report.html"