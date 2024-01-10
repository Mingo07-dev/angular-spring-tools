package com.example.demo.models;

import java.util.HashMap;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonAnyGetter;
import com.fasterxml.jackson.annotation.JsonAnySetter;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GenericJsonConverter {

	private Map<String, Object> label = new HashMap<String, Object>();

	@JsonAnyGetter
    public Map<String, Object> getLabel() {
        return label;
    }

    @JsonAnySetter
    public void setLabel(String name, Object value) {
    	label.put(name, value);
    }
}