import { useState, useEffect } from "react";
import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then((res)=>(res.json()))
const BASE_URL = "http://127.0.0.1:8000/"
const REQUEST_URL = "auth/get_all_scores/"

function Account({username, token, profileData}) {
	const [fullUrl, setFullUrl] = useState(null)
	const {data : response, isValidating, error} = useSWR(fullUrl, fetcher)

	useEffect(()=>{
		const params = new URLSearchParams({
			username,
			token,
			role:'student'
		})
		setFullUrl(BASE_URL + REQUEST_URL +'?'+ params.toString())
		console.log(BASE_URL + REQUEST_URL +'?'+ params.toString())
	}
	)
	if (isValidating){
	return (
		<div className="spinner-border">
			<span className="visually-hidden">Loading...</span>
		</div>
		)
	}

	return (
		<>
		<form action="">
			<div className="d-flex flex-column">
				<hr/>
				<h5>Profile data</h5>
				<label htmlFor=""> First name:</label>
				<input className="bg-transparent border-2 border-primary-subtle " type="text" defaultValue={profileData.firstname}/>
				
				<label htmlFor="">Last name:</label>
				<input className="bg-transparent border-2 border-primary-subtle " type="text" defaultValue={profileData.lastname}/>
				
				{/*<label htmlFor="">Gender:</label>
				<input className="bg-transparent border-2 border-primary-subtle " type="text" defaultValue={profileData.firstname}/>*/}
				<hr/>
				<h5>Credentials data</h5>
				<label htmlFor="">Username:</label>
				<input className="bg-transparent border-2 border-primary-subtle " type="text" defaultValue={profileData.username}/>

				<label htmlFor="">Password change:</label>
				<input className="btn btn-secondary" type="button" value={"Change Password"}/>
				<hr/>
				<h5>Enrollment data</h5>
				<label htmlFor="">Username:</label>
				<input className="bg-transparent border-2 border-primary-subtle " type="text" defaultValue={profileData.username}/>

				<label htmlFor="">Username:</label>
				<input type="text" defaultValue={profileData.username}/>

			</div>
		</form>
		</>)

}
export default Account;
/*##################################	
	Account SHOULD LOOK LIKE
	# Account image (TBD) (to be done)
    # Student Account
    username = max_length=20
    passwordChange = max_length=30

    # Student identity 
    firstname = max_length
    lastname = max_length=20
    email = unique=True    
    date_of_birth = DateField

    #Enrollment
    Subjects you're enrolled to

##################################*/
