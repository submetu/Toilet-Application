
package org.example.websocket;

import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import javax.enterprise.context.ApplicationScoped;
import java.util.HashSet;
import java.util.Set;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.json.JsonObject;
import javax.websocket.Session;
import org.example.model.Toilet;
import java.util.Date;
import java.util.TimeZone;
import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonArrayBuilder;


@ApplicationScoped
public class ToiletSessionHandler {
    private final Set<Session> sessions = new HashSet<>();
    private final Set<Toilet> toilets = new HashSet<>(); 
    private Toilet maleToilet;
    private Toilet femaleToilet;
    private Toilet mixToilet;
    
    ToiletSessionHandler(){
        generateToilets();
    }
    
    private void generateToilets (){
        maleToilet = new Toilet();
        femaleToilet = new Toilet();
        mixToilet = new Toilet();
        
        maleToilet.setId(0);
        maleToilet.setName("Male Toilet");
        maleToilet.setDescription("A toilet for males");
        maleToilet.setType("Regular");
        maleToilet.setStatus("Available");
        
        femaleToilet.setId(1);
        femaleToilet.setName("Female Toilet");
        femaleToilet.setDescription("A toilet for females");
        femaleToilet.setType("Regular");
        femaleToilet.setStatus("Available");
        
        mixToilet.setId(2);
        mixToilet.setName("Mix Toilet");
        mixToilet.setDescription("A toilet for everyone");
        mixToilet.setType("Regular");
        mixToilet.setStatus("Available");
        
        toilets.add(maleToilet);
        toilets.add(femaleToilet);
        toilets.add(mixToilet);
        
    }
    
    public JsonArray getAllToilets(){
         JsonArrayBuilder array = Json.createArrayBuilder();

        for (Toilet toilet : toilets) {
           JsonObject toiletJson = createMessage(toilet);
           array.add(toiletJson);
        }
        JsonArray builtArray = array.build();
        return builtArray;
    }
    
    
    public void addSession(Session session) {
        sessions.add(session);
        JsonArray allToilets = getAllToilets();
        sendToSession(session, allToilets);
    }
     

    public void removeSession(Session session) {
        sessions.remove(session);
    }
  

    public void toggleToilet(int id, String newStatus) {
        Toilet toilet = getToiletById(id);
        if (toilet != null) {
            toilet.setStatus(newStatus);
            toilet.setToggleTime( getCurrentFormattedDate());
            JsonArray updatedMessage = getAllToilets();
            sendToAllConnectedSessions(updatedMessage);
        }
    }
    
    public String getCurrentFormattedDate(){
        TimeZone tz = TimeZone.getTimeZone("UTC");
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ssZ"); 
        df.setTimeZone(tz);
        String nowAsISO = df.format(new Date());
        
        return nowAsISO;
    }

    public Toilet getToiletById(int id) {
        for (Toilet toilet : toilets) {
            if (toilet.getId() == id) {
                return toilet;
            }
        }
        return null;
    }

    public JsonObject createMessage(Toilet toilet) {
        JsonObject addMessage = Json.createObjectBuilder()
                .add("action", "add")
                .add("id", toilet.getId())
                .add("name", toilet.getName())
                .add("type", toilet.getType())
                .add("status", toilet.getStatus())
                .add("description", toilet.getDescription())
                .add("toggleTime", toilet.getToggleTime())
                .build();
        return addMessage;
    }

    private void sendToAllConnectedSessions(Object message) {
        for (Session session : sessions) {
            sendToSession(session, message);
        }
    }

    private void sendToSession(Session session, Object message) {
        try {
            session.getBasicRemote().sendText(message.toString());
        } catch (IOException ex) {
            sessions.remove(session);
            Logger.getLogger(ToiletSessionHandler.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
}