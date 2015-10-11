package com.beingjavaguys.controller;

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
import com.groei.swati.services.DataServices;

@Controller
@RequestMapping("/tender")
public class RestController {

	@Autowired
	DataServices dataServices;

	static final Logger logger = Logger.getLogger(RestController.class);

	@RequestMapping(value = "/create", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody
	Status addTender(@RequestBody Tender tender) {
		try {
			//dataServices.addEntity(tender);
			dataServices.addTender(tender);
			return new Status(1, "Tender added Successfully !");
		} catch (Exception e) {
			// e.printStackTrace();
			return new Status(0, e.toString());
		}

	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public @ResponseBody
	Tender getTender(@PathVariable("id") int id) {
		Tender tender = null;
		try {
			tender = dataServices.getTenderById(id);

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
			tenderList = dataServices.getTenderList();

		} catch (Exception e) {
			e.printStackTrace();
		}

		return tenderList;
	}

	@RequestMapping(value = "delete/{id}", method = RequestMethod.GET)
	public @ResponseBody
	Status deleteTender(@PathVariable("id") int id) {

		try {
			dataServices.deleteTender(id);
			return new Status(1, "Tender deleted Successfully !");
		} catch (Exception e) {
			return new Status(0, e.toString());
		}

	}
}
