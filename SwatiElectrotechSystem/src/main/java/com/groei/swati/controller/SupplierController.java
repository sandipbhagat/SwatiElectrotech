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
import com.groei.swati.model.Supplier;
import com.groei.swati.services.WorkServices;

@Controller
@RequestMapping("/supplier")
public class SupplierController {

	@Autowired
	WorkServices workServices;
	static final Logger logger = Logger.getLogger(SupplierController.class);

	@RequestMapping(value = "/getSuppliers/{id}", method = RequestMethod.GET)
	public @ResponseBody
	List<Supplier> getSuppliersById(@PathVariable("id") int id) {
		List<Supplier> listOfSuppliers = null;
		try {
			listOfSuppliers = workServices.getSuppliersById(id);

		} catch (Exception e) {
			e.printStackTrace();
		}
		return listOfSuppliers;
	}
	
}
