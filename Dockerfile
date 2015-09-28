FROM debian:jessie
VOLUME /data
RUN apt-get update
RUN apt-get -y install curl
RUN curl --silent --location https://deb.nodesource.com/setup_0.12 | bash 
RUN apt-get install -y nodejs
RUN npm install -g typescript  
RUN npm install -g webpack
RUN apt-get -y install nginx
RUN apt-get -y install vim
RUN rm /etc/nginx/sites-available/default
RUN rm /etc/nginx/sites-enabled/default
COPY galactic-nginx.conf /etc/nginx/conf.d/galactic-nginx.conf
EXPOSE 80
ENTRYPOINT nginx && cd /data/ts/ && tsc --watch

