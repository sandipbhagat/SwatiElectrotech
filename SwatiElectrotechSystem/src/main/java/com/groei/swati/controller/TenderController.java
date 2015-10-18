package com.groei.swati.controller;

import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.groei.swati.model.Status;
import com.groei.swati.model.Tender;
import com.groei.swati.services.TenderServices;

@Controller
@RequestMapping("/tender")
public class TenderController {

	@Autowired
	TenderServices tenderServices;

	static final Logger logger = Logger.getLogger(TenderController.class);

	@RequestMapping(value = "/create", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody
	Status addTender(@RequestBody Tender tender) {
		try {
			//tenderServices.addEntity(tender);
			tenderServices.addTender(tender);
			return new Status(1, "Tender added Successfully !");
		} catch (Exception e) {
			// e.printStackTrace();
			return new Status(0, e.toString());
		}

	}
	
	@RequestMapping(value = "/update", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody
	Status updateTender(@RequestBody Tender tender) {
		try {
			tenderServices.updateTender(tender);
			return new Status(1, "Tender updated Successfully !");
		} catch (Exception e) {
			// e.printStackTrace();
			return new Status(0, e.toString());
		}

	}


	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public @ResponseBody
	Tender getTenderById(@PathVariable("id") int id) {
		Tender tender = null;
		try {
			tender = tenderServices.getTenderById(id);

		} catch (Exception e) {
			e.printStackTrace();
		}
		return tender;
	}

	@RequestMapping(value = "/list", method = RequestMethod.GET)
	public @ResponseBody
	List<Tender> getTender() {

		List<Tender> tenderList = null;
		try {
			tenderList = tenderServices.getTenderList();

		} catch (Exception e) {
			e.printStackTrace();
		}

		return tenderList;
	}

	@RequestMapping(value = "delete/{id}", method = RequestMethod.GET)
	public @ResponseBody
	Status deleteTender(@PathVariable("id") int id) {

		try {
			tenderServices.deleteTender(id);
			return new Status(1, "Tender deleted Successfully !");
		} catch (Exception e) {
			return new Status(0, e.toString());
		}

	}
	
	
}
