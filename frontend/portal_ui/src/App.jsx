import { useState, useEffect } from 'react'
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
		const role = formData.get('role_selector')
		const username = formData.get('username')
		const password = formData.get('password')
		console.log(role)
		const FULL_URL = BASE_URL + REQUEST_URL + `?role=${role}&username=${username}&password=${password}`
		console.log(FULL_URL)
		setFullUrl(FULL_URL) // triggers the swr fetch

		
	}

	function logOut(){
		localStorage.removeItem("ACCESS_TOKEN")
		localStorage.removeItem("REFRESH_TOKEN")
		setMyToken(null)
	}
	
	// function signInAction(formData){
	// 	const username = formData.get('username')
	// 	const password = formData.get('password')
	// 	console.log("Signin action from app.jsx")
	// 	const FULL_URL = BASE_URL + REQUEST_URL + `?role=student&username=${username}&password=${password}`
	// 	setFullUrl(FULL_URL)

	// 	if (response){
	// 		localStorage.setItem("ACCESS_TOKEN",response.token)
	// 		localStorage.setItem("REFRESH_TOKEN",response.token_refresh)
	// 		// localStorage.setItem("USERNAME",)
	// 		setMyToken(response.token)
	// 	}
	// }

	const {data:response, isValidating, error} = useSWR(fullUrl, fetcher)
	useEffect( ()=>
		{
			if (response){
				if (response.error){

					}
				// localStorage.setItem("USERNAME",)
				else if (response.token){
					localStorage.setItem("ACCESS_TOKEN",response.token)
					localStorage.setItem("REFRESH_TOKEN",response.token_refresh)
					setMyToken(response.token)
				}
				else if (localStorage.getItem('ACCESS_TOKEN')){
					setMyToken(localStorage.getItem('ACCESS_TOKEN'))
				}
			}
		},[response]//whenever response changes or at startup
	)
	return(
		<>
			{/*<h1 class="">This is the portal for Teachers and Students </h1>
			<p>Please sign-in: if you're a teacher it takes you to the teacher's portal and if you're a student it takes you to the students portal</p>*/}
			{ myToken ? <Entry logOut={logOut}/> :  <SignBox signInAction={signInAction}/>}
		</>
		)
}

export default App;