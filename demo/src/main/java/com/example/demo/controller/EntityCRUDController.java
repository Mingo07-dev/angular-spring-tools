package com.example.demo.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.models.GenericJsonConverter;
import com.example.demo.services.IdraApi;
import com.example.demo.services.OrionApi;

@CrossOrigin(origins = {"http://localhost:4200", "*"})
@RestController
public class EntityCRUDController {

    private List<Map<String,Object>> notifications = new ArrayList<>();

    @Autowired
    OrionApi orionApi;

    @GetMapping("/api/0.1/get/context/information")
    public Object getEntity(){

        ResponseEntity<GenericJsonConverter[]> response = orionApi.getAllEntities("http://localhost:1026/v2/entities");

        return response.getBody();
    }
    
    @PostMapping("/api/0.1/post/context/information")
    public Boolean postEntity(@RequestBody GenericJsonConverter jsonEntity){
        
        Boolean response = orionApi.createEntity("http://localhost:1026/v2/entities", jsonEntity.getLabel().get("jsonData"));
        
        return response;
    }

    
    @PostMapping("/api/0.1/post/subscribe/entity")
    public Boolean subscribeToEntityByID(@RequestBody GenericJsonConverter jsonEntity){
        Map<String, Object> body = new HashMap<>();
        body.put("description", "Notify of all temperatures changes");

        body.put("subject", Map.of(
            "entities", List.of(Map.of(
                "id", jsonEntity.getLabel().get("entity")
                ))
            )
        );
        body.put("condition", List.of(Map.of(
                "attrs", jsonEntity.getLabel().get("attrs")
                )
            )
        );

        Map<String, Object> notification = new HashMap<>();
        notification.put(
            "http", Map.of(
            "url", "http://host.docker.internal:8082/api/0.1/get/subscription/updates"
            )
        );
        notification.put(
            "attrs", jsonEntity.getLabel().get("attrs")
        );
        body.put("notification",notification);
        System.out.println(body);


        Boolean response = orionApi.subscribeEntityByID("http://localhost:1026/v2/subscriptions/", body);
        
        return response;
    }

    
    
    @PostMapping("/api/0.1/get/subscription/updates")
    public void getSubscriptionUpdates(@RequestBody GenericJsonConverter notify){
        notifications.add(notify.getLabel());
    }
    
    @GetMapping("/api/0.1/get/notifications")
    public Object getNotifications(){
        List<Map<String,Object>> tempNot = new ArrayList<>();
        tempNot.addAll(this.notifications);
        this.notifications.clear();
        return tempNot;
    }
}
