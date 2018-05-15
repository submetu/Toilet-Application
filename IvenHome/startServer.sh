#!/bin/bash


/usr/local/glassfish4/bin/asadmin start-domain
/usr/local/glassfish4/bin/asadmin -u admin deploy /IvenHome.war 
echo "Stop Domain"
/usr/local/glassfish4/bin/asadmin stop-domain
echo "Start domain"
/usr/local/glassfish4/bin/asadmin start-domain --verbose
