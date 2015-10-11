package com.groei.swati.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.groei.swati.dao.DataDao;
import com.groei.swati.model.Employee;
import com.groei.swati.model.Tender;

public class DataServicesImpl implements DataServices {

	@Autowired
	DataDao dataDao;
	
	@Override
	public boolean addTender(Tender tender) throws Exception {
		return dataDao.addTender(tender);
	}

	@Override
	public Tender getTenderById(int id) throws Exception {
		return dataDao.getTenderById(id);
	}

	@Override
	public List<Tender> getTenderList() throws Exception {
		return dataDao.getTenderList();
	}

	@Override
	public boolean deleteTender(int id) throws Exception {
		return dataDao.deleteTender(id);
	}

}
