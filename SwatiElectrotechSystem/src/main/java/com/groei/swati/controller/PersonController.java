package com.groei.swati.controller;

import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.groei.swati.model.Person;
import com.groei.swati.services.TenderServices;

@Controller
@RequestMapping("/contactpersons")
public class PersonController {
	
	@Autowired
	TenderServices tenderServices;

	static final Logger logger = Logger.getLogger(PersonController.class);


	@RequestMapping(value = "/getPerson/{id}", method = RequestMethod.GET)
	public @ResponseBody
	List<Person> getPersonDetailsById(@PathVariable("id") int id) {
		List<Person> listOfPersons = null;
		try {
			listOfPersons = tenderServices.getPersonDetailsById(id);

		} catch (Exception e) {
			e.printStackTrace();
		}
		return listOfPersons;
	}

}
