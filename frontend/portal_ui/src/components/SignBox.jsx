import useSWR from 'swr'
import { useState } from 'react'


function SignBox({signInAction}){

	return (
		<form action={signInAction} className="SignBox">
			<label> Role: 
				<select name="role_selector" id="role_selector">
				 	<option value="teacher" selected>Teacher</option>
				 	<option value="student">Student</option>
				 </select> 

			</label>
			<label> Username:  
				<input name="username" className="input" type="text" /> 
			</label>
			<label> Password: 
				<input name="password" className="input" type="password" />
			</label>
			<button> Go </button>
		</form>
	)
}

export default SignBox;