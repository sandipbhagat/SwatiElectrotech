package com.groei.swati.services;

import java.util.List;

import com.groei.swati.model.Employee;
import com.groei.swati.model.Tender;

public interface DataServices {

	public boolean addTender(Tender tender) throws Exception;
	public Tender getTenderById(int id) throws Exception;
	public List<Tender> getTenderList() throws Exception;
	public boolean deleteTender(int id) throws Exception;
}
