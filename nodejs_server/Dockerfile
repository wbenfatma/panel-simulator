from node:8-alpine

WORKDIR /opt/server
COPY . .
RUN npm install --silent

# our app is running on port 5000 within the container, so need to expose it
EXPOSE 5000

# the command that starts our app
CMD ["npm", "start"]
