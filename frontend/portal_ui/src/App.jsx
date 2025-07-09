import { useState } from 'react'
import useSWR from 'swr'
import Entry from './Entry'
import SignBox from './components/SignBox'
import './styles/bootstrap.min.css'
import './index.css'

const BASE_URL = "http://127.0.0.1:8000/"
const REQUEST_URL = "auth/get_token/"

const fetcher = (...args) => fetch(...args).then((res)=>(res.json()))

function App(){

	const [myToken, setMyToken] = useState(localStorage.getItem("ACCESS_TOKEN"))
	const [fullUrl, setFullUrl] = useState(null)

	function signInAction(formData){
		const username = formData.get('username')
		const password = formData.get('password')
		console.log("Signin action from app.jsx")
		const FULL_URL = BASE_URL + REQUEST_URL + `?username=${username}&password=${password}`
		setFullUrl(FULL_URL)

		if (response){
			localStorage.setItem("ACCESS_TOKEN",response.token)
			localStorage.setItem("REFRESH_TOKEN",response.token_refresh)
			setMyToken(response.token)	
		}
	}

	const {data:response, isValidating, error} = useSWR(fullUrl, fetcher)
	return(
		<>
			{/*<h1 class="">This is the portal for Teachers and Students </h1>
			<p>Please sign-in: if you're a teacher it takes you to the teacher's portal and if you're a student it takes you to the students portal</p>*/}
			{ myToken ? <Entry /> :  <SignBox signInAction={signInAction}/>}
		</>
		)
}

export default App;