# Getting started
## IMPORTANT
Run the script `prepare.sh`, it will install homebrew (for linux), mkcert (for linux) and generate the certificates `panel.local`.<br>
Add the addresses to your hosts file (see [hosts](#hosts))<br>


## Usage
Once the certificates are generated and you added the address to your hosts, you can:
- start the panel-simulator --> `docker-compose up` (`-d` to be able to close the terminal and still have the panel running)
- stop the app --> `docker-compose down`
<br>
<br>

# Other

## Hosts
hosts file is usually here:
- `/etc/hosts` for Mac & Linux
- `C:\Windows\System32\drivers\etc\hosts` for Windows
  
Add this line to the hosts file:
- `127.0.0.1    panel.local`
<br>
