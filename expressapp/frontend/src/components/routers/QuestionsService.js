
import { fetchDataPost, fetchDataGet } from '../collection_func'
const API_URL = '';

export default class QuestionsService{
	
	constructor(){}
	
	getQuestions() {
		const url = `${API_URL}/api/questions/`;
    console.log(fetchDataGet(url), 'fetch')
		return fetchDataGet(url);
	}  
	getQuestionsByURL(link){
		const url = `${API_URL}${link}`;
		return axios.get(url).then(response => response.data);
	}
	getQuestion(pk) {
		const url = `${API_URL}/api/questions/${pk}`;
		return axios.get(url).then(response => response.data);
	}
	deleteQuestion(customer){
		const url = `${API_URL}/api/questions/${question.pk}`;
		return axios.delete(url);
	}
	createQuestion(customer){
		const url = `${API_URL}/api/questions/`;
		return axios.post(url,customer);
	}
	updateQuestion(customer){
		const url = `${API_URL}/api/questions/${question.pk}`;
		return axios.put(url,customer);
	}
}
