package com.groei.swati.services;

import java.util.List;

import com.groei.swati.model.Tender;
import com.groei.swati.model.Work;

public interface DataServices {

	public boolean addTender(Tender tender) throws Exception;
	public Tender getTenderById(int id) throws Exception;
	public List<Tender> getTenderList() throws Exception;
	public boolean deleteTender(int id) throws Exception;
	public boolean updateTender(Tender tender) throws Exception;
	public boolean addWork(Work work) throws Exception;
	public boolean updateWork(Work work) throws Exception;
	public Work getWorkById(int id) throws Exception;
	public List<Work> getWorkList() throws Exception;
	public boolean deleteWork(int id) throws Exception;
}
