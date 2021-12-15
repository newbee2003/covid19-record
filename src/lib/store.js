import { readable } from 'svelte/store';

export const initVal = () => {
	return {
		countries: [],
		all: {},
	};
};

export const makeCovid19Store = () => {
	let init = initVal();
	let store = readable(init, makeSubscribe(init));
	return store;
};

const makeSubscribe = (data) => {
	return (set) => {
		fetchCovid19DataCountries(data, set);
		fetchCovid19DataAll(data, set);
	};
};

const fetchCovid19DataCountries = async (data, set) => {
	try {
		const response = await fetch('https://disease.sh/v3/covid-19/countries');
		if (response.ok) {
			const fetchCovid19DataCountries = await response.json();
			data.countries = fetchCovid19DataCountries;
			set(data);
		} else {
			const text = response.text();
			throw new Error(text);
		}
	} catch (error) {
		data.error = error;
		set(data);
	}
};

const fetchCovid19DataAll = async (data, set) => {
	try {
		const response = await fetch('https://disease.sh/v3/covid-19/all');
		if (response.ok) {
			const covid19DataAll = await response.json();
			data.all = covid19DataAll;
			set(data);
		} else {
			const text = response.text();
			throw new Error(text);
		}
	} catch (error) {
		data.error = error;
		set(data);
	}
};
