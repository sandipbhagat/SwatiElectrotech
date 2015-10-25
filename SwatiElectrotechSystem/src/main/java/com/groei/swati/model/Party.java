package com.groei.swati.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="parties")
public class Party {

	private static final long serialVersionUID = 1L;

	@Id
    @GeneratedValue
    @Column(name="tenderId")
	private int tenderId;
	
	@Column(name="partiesId")
	private int id;
	
	@Column(name = "nameOfParty")
	private String nameOfParty;

	@Column(name = "rates")
	private String rates;

	public int getTenderId() {
		return tenderId;
	}

	public void setTenderId(int tenderId) {
		this.tenderId = tenderId;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getNameOfParty() {
		return nameOfParty;
	}

	public void setNameOfParty(String nameOfParty) {
		this.nameOfParty = nameOfParty;
	}

	public String getRates() {
		return rates;
	}

	public void setRates(String rates) {
		this.rates = rates;
	}
	
	
	
}
