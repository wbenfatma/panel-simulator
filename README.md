# Getting started
## IMPORTANT
Execute prepare.sh script to install dependencies and create certificates
Add the addresses to your hosts file (see [hosts](#hosts))<br>


## Usage
Once the certificates are generated and you added the addresses to your hosts, you can:
- start the panel-simulator --> `docker-compose up` (`-d` to be able to close the terminal and still have the panel running)
- stop the app --> `docker-compose down`
<br>
<br>

# Other

## Certs
Install `homebrew` and [`mkcert`](https://github.com/FiloSottile/mkcert) (DON'T forget this command: `mkcert -install` ) then execute the script `certs.sh` (Unix: `sh certs.sh`)<br>
It will create a `certs` folder and files needed to use all `panel.local` urls with HTTPS <br>

## Hosts
hosts file is usually here:
- `/etc/hosts` for Mac & Linux
- `C:\Windows\System32\drivers\etc\hosts` for Windows
  
Add those addresses:
- panel.local
<br>
