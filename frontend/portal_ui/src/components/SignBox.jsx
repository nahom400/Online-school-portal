import useSWR from 'swr'
import { useState } from 'react'

const fetcher = (...args) => fetch(...args).then((res)=>(res.json()))

const BASE_URL = "http://127.0.0.1:8000/"
const REQUEST_URL = "auth/get_token/"

function SignBox(){

	const [fullUrl, setFullUrl] = useState(null)
	const [myToken, setMyToken] = useState(localStorage.getItem("ACCESS_TOKEN"))

	function signInAction(formData){
		const username = formData.get('username')
		const password = formData.get('password')
		const FULL_URL = BASE_URL + REQUEST_URL + `?username=${username}&password=${password}`
		setFullUrl(FULL_URL)
		if (response){
		localStorage.setItem("ACCESS_TOKEN",response.token)
		localStorage.setItem("REFRESH_TOKEN",response.token_refresh)
		setMyToken(response.token)	
		}
	}
	const {data:response, isValidating, error} = useSWR(fullUrl, fetcher)

	function tokenCheckAction(){
	}

	if (!myToken){
		return (
			<form action={signInAction} className="SignBox">

				<label> Username:  
					<input name="username" className="input" type="text" /> 
				</label>
				<label> Password: 
					<input name="password" className="input" type="password" />
				</label>
				<button type="submit"> Go </button>
				{ response && response.error ? <p>Error: {response.error}</p> : null }
			</form>
		)
	}
	
	else if (myToken){
		return(<p>TOKEN: {myToken}</p>)
	}
}

export default SignBox;