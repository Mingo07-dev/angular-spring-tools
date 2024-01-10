package com.example.demo.services;

import java.util.Collections;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import com.example.demo.models.GenericJsonConverter;

@Service
public class OrionApi {

    @Autowired
    RestTemplate restTemplate;
    
    public ResponseEntity<GenericJsonConverter[]> getAllEntities(String url){

        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
        HttpEntity<String> entity = new HttpEntity<>(headers);
        

        ResponseEntity<GenericJsonConverter[]> response = restTemplate.exchange(url, HttpMethod.GET, entity, GenericJsonConverter[].class);

        return response;

    }

    
    public Boolean createEntity(String url, Object jsonData){

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        // HttpEntity<String> entity = new HttpEntity<>(headers);
        HttpEntity<Object> entity = new HttpEntity<>(jsonData, headers);
        
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, entity, String.class);

        if(HttpStatus.CREATED.equals(response.getStatusCode())){
            return true;
        } else{
            return false;
        }
    }

    
    public Boolean subscribeEntityByID(String url, Map<String, Object> jsonData){

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(jsonData, headers);
        
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, entity, String.class);
            
        System.out.println(response);
        return true;
        // if(HttpStatus.CREATED.equals(response.getStatusCode())){
        //     return true;
        // } else{
        //     return false;
        // }
    }
}
