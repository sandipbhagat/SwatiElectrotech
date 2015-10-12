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
import com.groei.swati.model.Work;
import com.groei.swati.services.DataServices;


@Controller
@RequestMapping("/work")
public class WorkController {
	
	@Autowired
	DataServices dataServices;

	static final Logger logger = Logger.getLogger(WorkController.class);

	@RequestMapping(value = "/create", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody
	Status addWork(@RequestBody Work work) {
		try {
			//dataServices.addEntity(work);
			dataServices.addWork(work);
			return new Status(1, "Work added Successfully !");
		} catch (Exception e) {
			// e.printStackTrace();
			return new Status(0, e.toString());
		}

	}
	
	@RequestMapping(value = "/update", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody
	Status updateWork(@RequestBody Work work) {
		try {
			dataServices.updateWork(work);
			return new Status(1, "Work updated Successfully !");
		} catch (Exception e) {
			// e.printStackTrace();
			return new Status(0, e.toString());
		}

	}


	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public @ResponseBody
	Work getWorkById(@PathVariable("id") int id) {
		Work work = null;
		try {
			work = dataServices.getWorkById(id);

		} catch (Exception e) {
			e.printStackTrace();
		}
		return work;
	}

	@RequestMapping(value = "/list", method = RequestMethod.GET)
	public @ResponseBody
	List<Work> getWork() {

		List<Work> workList = null;
		try {
			workList = dataServices.getWorkList();

		} catch (Exception e) {
			e.printStackTrace();
		}

		return workList;
	}

	@RequestMapping(value = "delete/{id}", method = RequestMethod.GET)
	public @ResponseBody
	Status deleteWork(@PathVariable("id") int id) {

		try {
			dataServices.deleteWork(id);
			return new Status(1, "Work deleted Successfully !");
		} catch (Exception e) {
			return new Status(0, e.toString());
		}

	}
	


}
