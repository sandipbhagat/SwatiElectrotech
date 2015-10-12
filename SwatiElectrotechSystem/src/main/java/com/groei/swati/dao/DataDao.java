package com.groei.swati.dao;

import java.util.List;

import com.groei.swati.model.Tender;
import com.groei.swati.model.Work;

public interface DataDao {

	public boolean addTender(Tender tender);
	public boolean deleteTender(int id);
	public List<Tender> getTenderList();
	public Tender getTenderById(int id);
	public boolean updateTender(Tender tender);
	
	
	public boolean addWork(Work work);
	public boolean updateWork(Work work);
	public Work getWorkById(int id);
	public List<Work> getWorkList();
	public boolean deleteWork(int id);
}
