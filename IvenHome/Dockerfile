
FROM glassfish:latest

MAINTAINER Subhan "hire@subhannaeem.com"

COPY ./dist/IvenHome.war /
COPY startServer.sh /
COPY ./Frontendbuild/ /usr/local/glassfish4/glassfish/domains/domain1/docroot/

EXPOSE 8080

ENTRYPOINT ["/startServer.sh"]
