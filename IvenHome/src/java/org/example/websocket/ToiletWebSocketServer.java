package org.example.websocket;

import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.enterprise.context.ApplicationScoped;
import javax.websocket.server.ServerEndpoint;
import javax.inject.Inject;
import javax.json.JsonReader;
import javax.json.Json;
import javax.json.JsonObject;
import org.example.model.Toilet; 
import java.io.StringReader;
import java.util.logging.Level;
import java.util.logging.Logger;



@ApplicationScoped
@ServerEndpoint("/actions")
public class ToiletWebSocketServer {
    @Inject
    private ToiletSessionHandler sessionHandler;
    
     @OnOpen
        public void open(Session session) {
            sessionHandler.addSession(session);
    }

    @OnClose
        public void close(Session session) {
             sessionHandler.removeSession(session);
    }

    @OnError
        public void onError(Throwable error) {
            Logger.getLogger(ToiletWebSocketServer.class.getName()).log(Level.SEVERE, null, error);
    }

    @OnMessage
        public void handleMessage(String message, Session session) {
            try (JsonReader reader = Json.createReader(new StringReader(message))) {
                JsonObject jsonMessage = reader.readObject();

                String action = jsonMessage.getString("action");
                
                if ("toggle".equals(action)) {
                    int id = (int) jsonMessage.getInt("id");
                    String newStatus = (String) jsonMessage.getString("newStatus");
                    sessionHandler.toggleToilet(id,newStatus);
                }
                
            }
            
        }
}