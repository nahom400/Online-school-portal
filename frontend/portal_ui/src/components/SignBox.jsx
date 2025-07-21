function SignBox({loginAction: handleLogIn, disable, status}){

	return (
	<div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-primary-subtle">
		<form action={handleLogIn} className="SignBox shadow">
			<h4>Online School Portal</h4>
			<div className="d-flex flex-column gap-2">
				<div className="d-flex gap-2 justify-content-center align-items-center"><label> Role:   
				

			</label><select name="role_selector" id="role_selector" defaultValue={localStorage.getItem('ROLE')} disabled={disable}>
				 	<option value="Teacher">Teacher</option>
				 	<option value="Student">Student</option>
				 </select> </div>
				<div className="d-flex gap-2 justify-content-around align-items-center"><label> Username:  
				
			</label><input name="username" className="input" type="text" disabled={disable}/> </div>
				<div className="d-flex gap-2 justify-content-around align-items-center"><label> Password: 
				
			</label><input name="password" className="input" type="password" disabled={disable}/></div>
				<div className="d-flex gap-2 justify-content-around align-items-center"></div>
			<button className="btn btn-primary" type="submit" disabled={disable}> Log-in </button>
			
			{disable? <div className="d-flex justify-content-center"><div className="spinner-border">
				<span className="visually-hidden">Loading</span>

			</div></div>:null}
			{status? <h6 className="rounded bg-danger p-2 text-white">{status}</h6>:null}
			</div>
		</form>
	</div>

	)
}

export default SignBox;