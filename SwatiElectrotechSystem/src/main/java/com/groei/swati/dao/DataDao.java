package com.groei.swati.dao;

import java.util.List;

import com.groei.swati.model.Tender;

public interface DataDao {

	public boolean addTender(Tender tender);
	public boolean deleteTender(int id);
	public List<Tender> getTenderList();
	public Tender getTenderById(int id);
}
