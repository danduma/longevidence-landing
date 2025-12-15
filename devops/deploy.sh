#!/bin/bash
set -e

# Get the script directory (absolute path)
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

# Set variables directly
IP_ADDRESS="49.12.8.100"
SSH_CERTIFICATE_PATH="$SCRIPT_DIR/devops/ssh/hetzner1"
USER_NAME="root"

# Function to run SSH command with certificate
run_ssh_command() {
    ssh -o StrictHostKeyChecking=no -i "$SSH_CERTIFICATE_PATH" root@$IP_ADDRESS "$1"
}

# Build the landing page
echo "Building landing page..."
cd "$SCRIPT_DIR/.." && npm run build && cd "$SCRIPT_DIR"

# Rsync the built files to the server
echo "Deploying static files to server..."
rsync -avz --delete -e "ssh -i $SSH_CERTIFICATE_PATH -o StrictHostKeyChecking=no" \
    "$SCRIPT_DIR/../dist/" root@$IP_ADDRESS:/opt/longevidence/

echo "Deployment complete!"
echo "longevidence.org and longevidence.app should now be serving the static landing page"