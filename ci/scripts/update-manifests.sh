#!/bin/bash
set -e

FRONTEND_IMAGE=$1
BACKEND_IMAGE=$2

# Update frontend deployment
sed -i "s|image: .*frontend.*|image: $FRONTEND_IMAGE:latest|" ./k8s/apps/frontend-deployment.yaml

# Update backend deployment
sed -i "s|image: .*backend.*|image: $BACKEND_IMAGE:latest|" ./k8s/apps/backend-deployment.yaml

# Commit and push
git config user.email "jenkins@example.com"
git config user.name "Jenkins CI"
git add ./k8s/*.yaml
git commit -m "Update frontend & backend images to latest"
git push origin main