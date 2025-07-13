function SignBox({signInAction, isValidating, error}){

	return (
	<div>
		<form action={signInAction} className="SignBox">
			<label> Role:   
				<select name="role_selector" id="role_selector" defaultValue={localStorage.getItem('ROLE')}>
				 	<option value="teacher">Teacher</option>
				 	<option value="student">Student</option>
				 </select> 

			</label>
			<label> Username:  
				<input name="username" className="input" type="text" /> 
			</label>
			<label> Password: 
				<input name="password" className="input" type="password" />
			</label>
			<button className="btn btn-primary"> Log-in </button>
		</form>
		
	</div>

	)
}

export default SignBox;