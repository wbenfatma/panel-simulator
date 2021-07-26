#!/bin/sh


# Need an if else depending on environment..
# check that https://gist.github.com/judy2k/7656bfe3b322d669ef75364a46327836
echo "install.sh"
apt-get update

# Install dependencies for homebrew
apt-get install build-essential procps curl file git -y

# Install homebrew
git clone https://github.com/Homebrew/brew ~/.linuxbrew/Homebrew

# Install mkcert
~/.linuxbrew/bin/brew install mkcert
~/.linuxbrew/bin/mkcert -install

# Create certificate
echo "Create certificats"
rm -rf certs/
mkdir certs
cd certs
~/.linuxbrew/bin/mkcert panel.local
mv panel.local-key.pem local.key
mv panel.local.pem local.crt
echo "Certificats created!"
