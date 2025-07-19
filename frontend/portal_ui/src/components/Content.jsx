import { useState, useEffect } from "react"
import useSWR from 'swr'


export default function Content({display, token, role, profileData}){

		function doUpdate(){
			updateMarks(formData)
			async function updateMarks(formData){
					const res = await axios.post(`http://localhost:8000/auth/Marks/Teacher/${username}/`,
						({'Authorization':`Token ${token}`,'data':data}))
				}
		}
		console.log(profileData)
		if (display==='account'){
			return (<Account profileData={profileData}/>)
		}
		else if (display==='scores'){
			return (<Scores username={profileData.username}
				role={profileData.role} 
				token={token}
				doUpdate={}/>)
		}
		else if (display==='table'){
			return (<h1>Nothing's on the table</h1>)
		}
		else if (display==='help'){
			return (<Help/>)
		}
	}

/*##################################	
Displays Subject Marks for students 
and also for teachers For teachers it
 will be a little more sophisticated
##################################*/
function Scores({role, token, username}){
	const fetcher = (...args) => fetch(...args).then((res)=>{if (res) {return res.json()}})
	const BASE_URL = "http://127.0.0.1:8000/"
	const REQUEST_URL = "auth/Marks/"


	const [fullUrl, setFullUrl] = useState(null)
	const {data, isValidating, error} = useSWR(fullUrl, ()=>(fetcher(fullUrl,{headers:{"Authorization":"Token "+token}})))
	

	/*##################################	
	This editMode variable is for the
	 teacher only
	##################################*/
	const [editMode, setEditMode] = useState(false)

	useEffect(()=>{
		console.log('REACHED')
		console.log(`${BASE_URL+REQUEST_URL}${role}/${username}/`)
		setFullUrl(`${BASE_URL+REQUEST_URL}${role}/${username}/`)
	},
	[editMode]
	)
	

	function handleEditMode(){
		/*##################################	
		handleEditMode makes the table to 
		rerender it self as an editable mode
		this feature is for role=teachers
		##################################*/
		setEditMode(!editMode)
		if (editMode){
			const 
		}
	}
	if (data){
		console.log(data)
		/*##################################	
		When there is data we check the 
		role and then render the table!
		StudentMark table is this straight-forward
		data looks like:
		[{dictkeys},{dictkeys},{...},{...},...]
		##################################*/
		if (role === 'Student'){
			return (<Table dataToDisplay={data} role={role}/>)
		}
		
		else if (role === 'Teacher'){
			return (
				<>
				<form action={updateMarks}>
				<div className="d-flex justify-content-end m-1">
					<button type='button' className="btn bg-transparent m-2">Refresh</button>
					<button type={'button'} className="btn btn-primary m-2" 
							onClick={handleEditMode}>{editMode ? 'Save':'Edit'}</button>
				</div>
				<Table dataToDisplay={data} role={role} editMode={editMode}/>
				</form>	
				</>
				)
		}
	}
	 
}

/*##################################	
This component returns the account
detais; and can update the database
with the changed data
##################################*/

function Account({profileData, role }){
	console.log('Profile DATA')
	console.log(profileData)
	return (<>
		<form className="m-4 d-flex gap-2 flex-wrap" action="">
			<div className="d-flex flex-column gap-2 m-4 border-1 border-opacity-50 spinner-border-sm">
				<h5>Profile</h5>
				<label>First Name<input name='first_name' type="text" defaultValue={profileData.first_name}/></label>
				<label>Last Name<input name='last_name' type="text" defaultValue={profileData.last_name}/></label>
			</div>
			<div className="d-flex flex-column gap-2 m-4 border-1 border-opacity-50 spinner-border-sm">
				<h5>Credentials</h5>
				<label>Username:<input name='user_name' type="text" defaultValue={profileData.username}/></label>
				<label>Password:<input type="button" defaultValue={"Changed Password"}/></label>
			</div>
			<div className="d-flex flex-column gap-2 m-4 border-1 border-opacity-50 spinner-border-sm">
				<h5>Enrollement</h5>
				<label><input type="text"/></label>
				<label><input type="text"/></label>
			</div>
		
		</form>

		</>)
}

function Help(){
	return (<div className="container-md">
		<h1>Help</h1>
		<p></p>
	</div>)

}

/*##################################	
Some Preconfigured Tools to render
the contents and to send data for update:
it can easily be 'reconfigured'
##################################*/


// async function updateProfileData(username, password){
// 		const res = await axios.post('http://localhost:8000/auth/get_token/',
// 			({'username':username, 'password':password}))
// 		const token = res.data.token
// 		return token
// 	}

function Table({dataToDisplay, role, editMode=false}){
	let  editableCells = []
	let isForm = false
	let tableHeader = []
	let fields = []

	if (role==='Teacher'){
		console.log('tede')
		editableCells = [false, false, true]
		isForm = true
		tableHeader = ['Student name','Grade','Mark']
		fields = ['student_name', 'grade_letter',  'mark']
	}
	else if (role==='Student'){
		console.log(dataToDisplay)
		editableCells = [false, false, false]
		isForm = false
		tableHeader = ['Subject','Grade','Mark']
		fields = ['subject_name', 'grade_letter',  'mark']
	}
	
	return (
		<table className="table table-striped table-bordered table-hover flex-wrap container-md m-4">
		<thead>
			<tr>
				{
					tableHeader.map((text)=>
					(<th>{text}</th>)
					)
				}
			</tr>
		</thead>
		<tbody>{
		dataToDisplay.map((row, index)=>{
			const y = index
			return (<tr>{
			fields.map((cell, index)=>
				
				(<th className="font-monospace">
				{editableCells[index] ? <input 
					name={`${cell}-${index}`} 
					className="bg-transparent border-0 w-auto "
					type="number" 
					defaultValue={row[cell]}
					readOnly={!editMode}/>
							:
					row[cell]
				}
				</th>
				)
			)
			}</tr>
			)
		}
		)
		}
		</tbody>
		</table>

)
}



