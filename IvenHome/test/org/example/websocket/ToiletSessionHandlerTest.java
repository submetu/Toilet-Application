/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.example.websocket;

import java.io.StringReader;
import java.util.HashSet;
import java.util.Set;
import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObject;
import javax.json.JsonReader;
import javax.websocket.Session;
import org.example.model.Toilet;
import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import static org.junit.Assert.*;
import static org.mockito.Mockito.*;

/**
 *
 * @author subhan
 */
public class ToiletSessionHandlerTest {
    
    private  Set<Toilet> toilets;
    private Toilet testToilet;
    private ToiletSessionHandler instance;
    
    public ToiletSessionHandlerTest() {
    }
    
    @BeforeClass
    public static void setUpClass() {
         Set<Toilet> toilets = new HashSet<>(); 
         Toilet maleToilet = new Toilet();
         maleToilet.setId(0);
         maleToilet.setName("Male Toilet");
         maleToilet.setDescription("A toilet for males");
         maleToilet.setType("Regular");
         maleToilet.setStatus("Available");
         toilets.add(maleToilet);
    }
    
    @AfterClass
    public static void tearDownClass() {
    }
    
    @Before
    public void setUp() {
        instance = new ToiletSessionHandler();
        int testToiletId = 0;
        testToilet = instance.getToiletById(testToiletId);
    }
    
    @After
    public void tearDown() {
    }
    
    /**
     * Test of getToiletById method, of class ToiletSessionHandler.
     */
    @Test
    public void testGetToiletById() {
         System.out.println("GetToiletById");       
         assertEquals(testToilet.getId(),0);
    }
 
    /**
     * Test of createMessage method, of class ToiletSessionHandler.
     */
    @Test
    public void testCreateMessage(){
        System.out.println("CreateMessage");
        
        String expectedString = "{\"action\":\"add\",\"id\":0,\"name\":\"Male Toilet\",\"type\":\"Regular\",\"status\":\"Available\",\"description\":\"A toilet for males\",\"toggleTime\":\"Not set yet\"}";
        JsonReader reader = Json.createReader(new StringReader(expectedString));
        JsonObject expectedMessage = reader.readObject();
        
        JsonObject testMessage = instance.createMessage(testToilet);
        
        assertEquals(expectedMessage,testMessage);
    }
   
    
   
}
