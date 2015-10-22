package com.groei.swati.dao;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.groei.swati.controller.TenderController;
import com.groei.swati.model.Document;
import com.groei.swati.model.Person;
import com.groei.swati.model.Tender;
import com.groei.swati.model.Work;

@Transactional
public class TenderDaoImpl implements TenderDao {

	@Autowired
	SessionFactory sessionFactory;

	static final Logger logger = Logger.getLogger(TenderDaoImpl.class);

	Session session = null;

	@Override
	public boolean addTender(Tender tender) {
		session = this.sessionFactory.getCurrentSession();
		session.saveOrUpdate(tender);
//		persist(tender);
		return false;
	}

	@Override
	public boolean updateTender(Tender tender) {
		session = this.sessionFactory.getCurrentSession();
		session.update(tender);
		return false;

	}

	@Override
	public boolean deleteTender(int id) {
		session = this.sessionFactory.getCurrentSession();
		Tender tender = (Tender) session.get(Tender.class, id);
		session.delete(tender);
		return false;
	}

	@Override
	public List<Tender> getTenderList() {

		return (List<Tender>) this.sessionFactory.getCurrentSession().createCriteria(Tender.class).list();
	}

	@Override
	public Tender getTenderById(int id) {
		session = this.sessionFactory.getCurrentSession();
		Tender tender = (Tender) session.get(Tender.class,new Integer(id));
		return tender;
	}

	@Override
	public List<Person> getPersonDetailsById(int id) {
		session = this.sessionFactory.getCurrentSession();
		Criteria criteria = session.createCriteria(Person.class);
		criteria.add(Restrictions.eq("id", id));
		List<Person> list = (List<Person>) criteria.list();
		return list;
	}


	@Override
	public List<Document> getDocumentsById(int id) {
		session = this.sessionFactory.getCurrentSession();
		Criteria criteria = session.createCriteria(Document.class);
		criteria.add(Restrictions.eq("id", id));
		List<Document> listOfDocuments = (List<Document>) criteria.list();
		return listOfDocuments;
	}
}
