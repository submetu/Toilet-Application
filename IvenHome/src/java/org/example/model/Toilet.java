package org.example.model;

import java.util.Date;

public class Toilet {

    private int id;
    private String name;
    private String status;
    private String type;
    private String description;
    private String toggleTime; 

    public Toilet() {
    }
    
    public int getId() {
        return id;
    }
    
    public String getName() {
        return name;
    }

    public String getStatus() {
        return status;
    }

    public String getType() { 
        return type;
    }
    
    public String getDescription() {
        return description;
    }
    
    public String getToggleTime(){
        if(toggleTime != null){
           return toggleTime.toString();
        }
        return "Not set yet";
    }

    public void setId(int id) {
        this.id = id;
    }
    
    public void setName(String name) {
        this.name = name;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setType(String type) {
        this.type = type;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    public void setToggleTime(String toggleTime){
        this.toggleTime = toggleTime;
    }
    
}