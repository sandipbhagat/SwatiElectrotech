package com.groei.swati.dao;

import java.util.List;

import com.groei.swati.model.Payment;
import com.groei.swati.model.Supplier;
import com.groei.swati.model.Work;

public interface WorkDao {
	public boolean addWork(Work work);
	public boolean updateWork(Work work);
	public Work getWorkById(int id);
	public List<Work> getWorkList();
	public boolean deleteWork(int id);
	
	public List<Supplier> getSuppliersById(int id);
	public List<Payment> getPaymentsById(int id);
}
