package com.example.demo.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.server.resource.web.BearerTokenResolver;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.example.demo.models.GenericJsonConverter;
import com.example.demo.services.IdraApi;
import com.jayway.jsonpath.InvalidJsonException;

import de.gwdg.metadataqa.api.calculator.CalculatorFacade;
import de.gwdg.metadataqa.api.configuration.MeasurementConfiguration;
import de.gwdg.metadataqa.api.schema.BaseSchema;
import de.gwdg.metadataqa.api.schema.Format;
import de.gwdg.metadataqa.api.schema.Schema;


@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class Idra {

    
    @Autowired
    IdraApi idraApi;
    
    @PostMapping("/api/0.1/idra/login")
    public Boolean logIn(@RequestBody GenericJsonConverter jsonEntity){

        ResponseEntity<String> response = idraApi.login("http://localhost:8080/Idra/api/v1/administration/login", jsonEntity.getLabel().get("jsonData"));
        Boolean res = false;
        if(HttpStatus.OK.equals(response.getStatusCode())){
            res = true;
        }
        return res;
    }
    
    @GetMapping("/api/0.1/idra/get/catalogues")
    public GenericJsonConverter[] getCatalogues(){

        ResponseEntity<GenericJsonConverter[]> response = idraApi.getData("http://localhost:8080/Idra/api/v1/administration/catalogues");
        
        return response.getBody();
    }
    
    @PostMapping("/api/0.1/idra/search")
    public String searchData(@RequestBody GenericJsonConverter param){
        
        Map<String, Object> jsonEntity = new HashMap<>();
        jsonEntity.put("live", "false");
        Object check = 0;
        if(param.getLabel().get("params") == check){
            jsonEntity.put("rows", "0");
        } else{
            jsonEntity.put("rows", "25");
        }
        jsonEntity.put("start", "0");


        Map<String, Object> sort = new HashMap<>();
        sort.put("field", "title");
        sort.put("mode", "asc");
        jsonEntity.put("sort", sort);


        jsonEntity.put("nodes", List.of( 1 ));

    
        if(param.getLabel().get("params") == check){
            Map<String, Object> filters2 = new HashMap<>();
            filters2.put("field", "ALL");
            filters2.put("value", "");

            jsonEntity.put("filters", List.of(
                filters2
            ));
        } else{
            Map<String, Object> filters = new HashMap<>();
            filters.put("field", "tags");
            filters.put("value", param.getLabel().get("params"));

            Map<String, Object> filters2 = new HashMap<>();
            filters2.put("field", "ALL");
            filters2.put("value", "");

            jsonEntity.put("filters", List.of(
                filters, filters2
            ));
        }


        Map<String, Object> euroVocFilter = new HashMap<>();
        euroVocFilter.put("euroVoc", "false");
        euroVocFilter.put("sourceLanguage", "");
        euroVocFilter.put("targetLanguages", List.of());


        jsonEntity.put("euroVocFilter", euroVocFilter);

        ResponseEntity<String> response = idraApi.postHash("http://localhost:8080/Idra/api/v1/client/search", jsonEntity);
        String body = response.getBody();
        return body;
    }
    
    
    @PostMapping("/api/0.1/idra/get/dataset")
    public String  getDatasets(@RequestBody GenericJsonConverter db_id){

        ResponseEntity<String> response = idraApi.getDataString("http://localhost:8080/Idra/api/v1/client/datasets/" + db_id.getLabel().get("id_DB"));
        
        return response.getBody();
    }
    
    @PostMapping("/api/0.1/idra/catalogue/add")
    public String addCatalogue(@RequestBody GenericJsonConverter jsonEntity){
        System.out.println(jsonEntity.getLabel().get("json").toString());
        MeasurementConfiguration config = new MeasurementConfiguration();
        // we will measure completeness now;

        Schema schema = new BaseSchema()
        .setFormat(Format.JSON);
        CalculatorFacade calculator = new CalculatorFacade(config);
        calculator.setSchema(schema);
        calculator.configure();
        String csv = "";
        try {
            csv = calculator.measure(jsonEntity.getLabel().get("json").toString());
            System.out.println(csv);
        } catch (InvalidJsonException e) {
            // handle exception
            System.out.println(e);
        }
        return csv;
    }

    
    
    @PostMapping("/api/0.1/measure")
    public String measure(@RequestBody GenericJsonConverter jsonEntity){
        System.out.println(jsonEntity.getLabel().get("json"));
        ResponseEntity<String> response = idraApi.post("http://localhost:8080/Idra/api/v1/administration/catalogues", jsonEntity.getLabel().get("json"));
        System.out.println(response);
        return response.getBody();
    }
}
