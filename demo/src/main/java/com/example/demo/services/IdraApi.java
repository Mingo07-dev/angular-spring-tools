package com.example.demo.services;

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
public class IdraApi {
    
    @Autowired
    RestTemplate restTemplate;

    String BearerToken = "";
    public ResponseEntity<String> login(String url, Object jsonData){

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        
        HttpEntity<Object> entity = new HttpEntity<>(jsonData, headers);
        
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, entity, String.class);
        BearerToken = response.getBody();
        System.out.println(BearerToken);
        return response;
    }
    
    public ResponseEntity<GenericJsonConverter[]> getData(String url){

        HttpHeaders headers = new HttpHeaders();
        // headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(BearerToken);
        
        HttpEntity<Object> entity = new HttpEntity<>(headers);
        
        ResponseEntity<GenericJsonConverter[]> response = restTemplate.exchange(url, HttpMethod.GET, entity, GenericJsonConverter[].class);
        return response;
    }
    
    public ResponseEntity<String> getDataString(String url){

        HttpHeaders headers = new HttpHeaders();
        // headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(BearerToken);
        
        HttpEntity<Object> entity = new HttpEntity<>(headers);
        
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
        return response;
    }

    public ResponseEntity<String> post(String url, Object jsonData){

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(BearerToken);
        
        HttpEntity<Object> entity = new HttpEntity<>(jsonData, headers);
        
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, entity, String.class);
        return response;
    }

    public ResponseEntity<String> postHash(String url, Map<String, Object> jsonData){

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(BearerToken);
        
        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(jsonData, headers);
        
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, entity, String.class);
        
        return response;
    }
}
