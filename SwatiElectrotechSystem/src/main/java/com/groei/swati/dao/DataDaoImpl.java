package com.groei.swati.dao;

import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.groei.swati.controller.TenderController;
import com.groei.swati.model.Tender;
import com.groei.swati.model.Work;

@Repository("dataDao")
@Transactional
public class DataDaoImpl implements DataDao {

	@Autowired
	SessionFactory sessionFactory;

	static final Logger logger = Logger.getLogger(DataDaoImpl.class);

	Session session = null;
	Transaction tx = null;

	@Override
	public boolean addTender(Tender tender) {
		try{
			session = sessionFactory.openSession();
			tx = session.beginTransaction();
			session.save(tender);
			tx.commit();
		}
		catch (HibernateException e) {
			if (tx!=null) tx.rollback();
			e.printStackTrace(); 
		}finally {
			session.close(); 
		}
		return false;
	}

	@Override
	public boolean updateTender(Tender tender) {
		try{
			session = sessionFactory.openSession();
			tx = session.beginTransaction();
			session.saveOrUpdate(tender);
			tx.commit();
		}
		catch (HibernateException e) {
			if (tx!=null) tx.rollback();
			e.printStackTrace(); 
		}finally {
			session.close(); 
		}
		return false;

	}

	@Override
	public boolean deleteTender(int id) {
		try{
			session = sessionFactory.openSession();
			tx = session.beginTransaction();
			Tender tender = (Tender) session.get(Tender.class, id);
			session.delete(tender);
			tx.commit();
		}
		catch (HibernateException e) {
			if (tx!=null) tx.rollback();
			e.printStackTrace(); 
		}finally {
			session.close(); 
		}
		return false;
	}

	@Override
	public List<Tender> getTenderList() {
	
		return (List<Tender>) sessionFactory.getCurrentSession().createCriteria(Tender.class).list();
/*		
		List<Tender> tenderList = new ArrayList<>();
		try{
			session = sessionFactory.openSession();

			tx = session.beginTransaction();
			tenderList = session.createCriteria(Tender.class).list();
			tx.commit();
		}
		catch (HibernateException e) {
			if (tx!=null) tx.rollback();
			e.printStackTrace(); 
		}finally {
			session.close(); 
		}
		return tenderList;
*/	}

	@Override
	public Tender getTenderById(int id) {
		Tender tender=null;
		try{
			session = sessionFactory.openSession();
			tx = session.beginTransaction();
			tender = (Tender) session.load(Tender.class,new Integer(id));
			tx.commit();
		}catch (HibernateException e) {
			if (tx!=null) tx.rollback();
			e.printStackTrace(); 
		}finally {
			session.close(); 
		}
		return tender;
	}

	@Override
	public boolean addWork(Work work) {
		try{
			session = sessionFactory.openSession();

			tx = session.beginTransaction();
			session.save(work);
			tx.commit();
		}
		catch (HibernateException e) {
			if (tx!=null) tx.rollback();
			e.printStackTrace(); 
		}finally {
			session.close(); 
		}
		return false;
	}

	@Override
	public boolean updateWork(Work work) {
		try{
			session = sessionFactory.openSession();
			tx = session.beginTransaction();
			session.saveOrUpdate(work);
			tx.commit();
		}
		catch (HibernateException e) {
			if (tx!=null) tx.rollback();
			e.printStackTrace(); 
		}finally {
			session.close(); 
		}

		return false;

	}

	@Override
	public Work getWorkById(int id) {
		Work work = null;
		try{
			session = sessionFactory.openSession();
			tx = session.beginTransaction();
			work = (Work) session.load(Work.class,new Integer(id));

			tx.commit();
		}
		catch (HibernateException e) {
			if (tx!=null) tx.rollback();
			e.printStackTrace(); 
		}finally {
			session.close(); 
		}
		return work;
	}

	@Override
	public List<Work> getWorkList() {
		/*List<Work> workList =*/
		return (List<Work>) sessionFactory.getCurrentSession().createCriteria(Work.class).list(); 
				
/*				new ArrayList<Work>();
		try{
			session = sessionFactory.openSession();
			tx = session.beginTransaction();
			workList = sessionFactory.getCurrentSession().createCriteria(Work.class).list();
			tx.commit();

		}catch (HibernateException e) {
			if (tx!=null) tx.rollback();
			e.printStackTrace(); 
		}finally {
			session.close(); 
		}		
		return workList;
*/	}

	@Override
	public boolean deleteWork(int id) {
		/*try{
			session = sessionFactory.openSession();
			tx = session.beginTransaction();
			Work work = (Work) session.get(Work.class, id);
			session.delete(work);
			tx.commit();
		}catch (HibernateException e) {
			if (tx!=null) tx.rollback();
			e.printStackTrace(); 
		}finally {
			session.close(); 
		}	*/	return false;
	}

	protected Session getSession() {
		return  sessionFactory.getCurrentSession();
	}

}
