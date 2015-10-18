package com.groei.swati.controller;

import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.groei.swati.model.Document;
import com.groei.swati.model.Person;
import com.groei.swati.services.TenderServices;

@Controller
@RequestMapping("/documents")
public class DocumentController {
	
	@Autowired
	TenderServices tenderServices;

	static final Logger logger = Logger.getLogger(DocumentController.class);


	@RequestMapping(value = "/getDocuments/{id}", method = RequestMethod.GET)
	public @ResponseBody
	List<Document> getDocumentsById(@PathVariable("id") int id) {
		List<Document> listOfDocuments = null;
		try {
			listOfDocuments = tenderServices.getDocumentsById(id);

		} catch (Exception e) {
			e.printStackTrace();
		}
		return listOfDocuments;
	}

}
