FROM node:12.2.0-alpine as built_dependencies
WORKDIR /app
COPY ./backend /app/src
RUN cd /app/src && rm -f package-lock.json && yarn --production=false
RUN cd /app/src && npx babel . --out-dir ../server --ignore ./node_modules --copy-files --source-maps
RUN cd /app/server && rm -Rf node_modules/
RUN cd /app/server && yarn --prod
COPY wait-for.sh /app/wait-for.sh


