package com.groei.swati.dao;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.springframework.beans.factory.annotation.Autowired;

import com.groei.swati.model.Tender;

public class DataDaoImpl implements DataDao {

	@Autowired
	SessionFactory sessionFactory;

	Session session = null;
	Transaction tx = null;

	@Override
	public boolean addTender(Tender tender) {
		session = sessionFactory.openSession();
		tx = session.beginTransaction();
		session.save(tender);
		tx.commit();
		session.close();

		return false;
		}

	@Override
	public boolean deleteTender(int id) {
		session = sessionFactory.openSession();
		Object o = session.load(Tender.class, id);
		tx = session.getTransaction();
		session.beginTransaction();
		session.delete(o);
		tx.commit();
		return false;
	}

	@Override
	public List<Tender> getTenderList() {
		session = sessionFactory.openSession();
		tx = session.beginTransaction();
		List<Tender> tenderList = session.createCriteria(Tender.class).list();
		tx.commit();
		session.close();
		return tenderList;
	}

	@Override
	public Tender getTenderById(int id) {
		session = sessionFactory.openSession();
		Tender tender = (Tender) session.load(Tender.class,new Integer(id));
		tx = session.getTransaction();
		session.beginTransaction();
		tx.commit();
		return tender;
	}

}
