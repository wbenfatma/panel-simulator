FROM nginx:alpine

RUN  apk update \
     && apk add openssl \
     && rm -rf /var/cache/apk/*

RUN mkdir -p /etc/nginx/ssl \
    && rm /etc/nginx/conf.d/default.conf


ADD conf.d/ /etc/nginx/conf.d

# Copy generated mkcert key/certificat -->  /etc/nginx/ssl/
ADD certs/  /etc/nginx/ssl/

EXPOSE 80
EXPOSE 443
