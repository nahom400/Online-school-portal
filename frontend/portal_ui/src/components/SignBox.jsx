import useSWR from 'swr'
import { useState } from 'react'

const fetcher = (...args) => fetch(...args).then((res)=>(res.json()))

const BASE_URL = "http://127.0.0.1:8000/"
const REQUEST_URL = "auth/get_token/"

function SignBox(){

	const [fullUrl, setFullUrl] = useState(null)

	function signInAction(formData){
		const username = formData.get('username')
		const password = formData.get('password')
		const FULL_URL = 
			BASE_URL + REQUEST_URL + `?username=${username}&password=${password}`
		console.log(FULL_URL)
		setFullUrl(FULL_URL)
		
	}
	const {data:response, isValidating, error} = useSWR(fullUrl, fetcher)
	console.log(response)


	return (

		<form action={signInAction} className="SignBox">

			<label> Username:  
				<input name="username" className="input" type="text" /> 
			</label>
			<label> Password: 
				<input name="password" className="input" type="password" />
			</label>
			<button type="submit"> Go </button>
			{response ? <><p>TOKEN: {response.token}</p><p>REFRESH-TOKEN: {response.token_refresh}</p></> : "No token"}
			{ response && response.error ? <p>Error: {response.error}</p> : null }
		</form>
		)
}

export default SignBox;