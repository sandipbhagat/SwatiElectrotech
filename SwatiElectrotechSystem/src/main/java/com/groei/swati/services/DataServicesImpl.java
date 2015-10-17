package com.groei.swati.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.groei.swati.dao.DataDao;
import com.groei.swati.model.Tender;
import com.groei.swati.model.Work;

public class DataServicesImpl implements DataServices {

	@Autowired
	DataDao dataDao;
	
	public DataDao getDataDao() {
		return dataDao;
	}

	public void setDataDao(DataDao dataDao) {
		this.dataDao = dataDao;
	}

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

	@Override
	public boolean updateTender(Tender tender) throws Exception {
		return dataDao.updateTender(tender);
	}

	@Override
	public boolean addWork(Work work) throws Exception {
		return dataDao.addWork(work);
	}

	@Override
	public boolean updateWork(Work work) throws Exception {
		return dataDao.updateWork(work);
	}

	@Override
	public Work getWorkById(int id) throws Exception {
		return dataDao.getWorkById(id);
	}

	@Override
	public List<Work> getWorkList() throws Exception {
		return dataDao.getWorkList();
	}

	@Override
	public boolean deleteWork(int id) throws Exception {
		return dataDao.deleteWork(id);
	}

}
