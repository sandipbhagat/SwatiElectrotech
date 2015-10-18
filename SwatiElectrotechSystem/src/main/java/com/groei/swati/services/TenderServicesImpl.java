package com.groei.swati.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.groei.swati.dao.TenderDao;
import com.groei.swati.model.Document;
import com.groei.swati.model.Person;
import com.groei.swati.model.Tender;
import com.groei.swati.model.Work;


public class TenderServicesImpl implements TenderServices {

	@Autowired
	TenderDao tenderDao;
	
	@Override
	public boolean addTender(Tender tender) throws Exception {
		return tenderDao.addTender(tender);
	}

	@Override
	public Tender getTenderById(int id) throws Exception {
		return tenderDao.getTenderById(id);
	}

	@Override
	public List<Tender> getTenderList() throws Exception {
		return tenderDao.getTenderList();
	}

	@Override
	public boolean deleteTender(int id) throws Exception {
		return tenderDao.deleteTender(id);
	}

	@Override
	public boolean updateTender(Tender tender) throws Exception {
		return tenderDao.updateTender(tender);
	}

	@Override
	public List<Person> getPersonDetailsById(int id) {
		return tenderDao.getPersonDetailsById(id);
	}

	@Override
	public List<Document> getDocumentsById(int id) throws Exception {
		return tenderDao.getDocumentsById(id);
	}

}