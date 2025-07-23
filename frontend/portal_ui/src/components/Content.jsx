import { initialState, reduceScores } from '../useReducers'

import axios from 'axios'
import { useReducer } from 'react'

export default function Content({display, token, profileData}){

		console.log(profileData)
		if (display==='account'){
			return (<Account profileData={profileData}/>)
		}
		else if (display==='scores'){
			return (<Scores username={profileData.username}
				role={profileData.role} 
				token={token}/>)
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

	const [state, dispatch] = useReducer(reduceScores, initialState)
	

	if (!state.initialized){

		const fetchScore =  fetch(`http://localhost:8000/auth/Marks/${role}/${username}/`, 
				{
					headers:{'Authorization': `Token ${token}`}
				})
		dispatch({type:"Getting From Database"})

		fetchScore.then((res)=>{
			const data = res.json()
			data.then((data)=>{
				dispatch({type:"Edit Mode Off", data:data })
			})

		})

		}

	/*##################################	
	This editMode variable is for the
	 teacher only
	##################################*/

	function handleEditMode(formData){
		/*##################################	
		handleEditMode makes the table to 
		rerender it self as an editable mode
		this feature is for role=teachers

		##################################*/
		if (state.editmode){
			const data = Object.fromEntries(formData.entries())
			const response = putMarksToDatabase(username, token, data, state.data)
			dispatch({type:"Doing Put To Database"})
			response.then((res)=>{
				dispatch({type:"Reinitiate"})
			})
			
		}
		else {
		dispatch({type:"Edit Mode On"})
		}
	}
	if (state.data){
		
	
	
		/*##################################	
		When there is data we check the 
		role and then render the table!
		StudentMark table is this straight-forward
		data looks like:
		[{dictkeys},{dictkeys},{...},{...},...]
		##################################*/
		if (role === 'Student'){
			return (<Table dataToDisplay={state.data} role={role}/>)
		}
		
		else if (role === 'Teacher'){
			return (
				<>
				<form action={handleEditMode} className='container-md mt-4'>
				<div className="d-flex justify-content-between m-1 align-items-center">
					<div><h4> Scores</h4></div>

					<div className='d-flex align-items-center'>
					{(state.getValidating || state.putValidating) ? <div className='spinner-border bg-info'></div>:null}
					<button type='button' className="btn bg-transparent p-2">Refresh</button>
					<button type='submit' className="btn btn-primary p-2" 
							>{state.editmode ? 'Save':'Edit'}</button>
					</div>
				</div>
				<Table dataToDisplay={state.data} role={role} editMode={state.editmode}/>
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

function Account({profileData }){
	return (<>
		<form className="m-4 d-flex gap-2 flex-wrap" action="">
			<div className="d-flex flex-column gap-2 m-4 border-1 border-opacity-50 spinner-border-sm">
				<h5>Profile</h5>
				<label htmlFor=""><img className='img-thumbnail showing' alt='profile_image' src={profileData.imgUrl? profileData.imgurl : 'src/assets/images/DefaultProfileImage.png'}/></label>
				<label>First Name<input name='first_name' type="text" defaultValue={profileData.first_name}/></label>
				<label>Last Name<input name='last_name' type="text" defaultValue={profileData.last_name}/></label>

				<label>Nationality<input name='first_name' type="text" defaultValue={profileData.nationality}/></label>
				<label>Address<input name='last_name' type="text" defaultValue={profileData.address}/></label>

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


async function putMarksToDatabase(username, token, _data, diffold){

		/*##################################	
		Formatting the data for less backend
		work-load! 
		##################################*/
		const _keys = Object.keys(_data)
		const data = _keys.map((key)=>({
			"student":key.split('_')[0],
			"subject":key.split('_')[1],
			"mark":_data[key]
		}))


		/*##################################	
		Filtering unchanged mark entries for 
		further reduced backend duty
		##################################*/

		const __data = data.filter((entry, index)=>
			(entry["mark"])!==(diffold[index]["mark"]))
		

		const res = await axios.put(`http://localhost:8000/auth/Marks/Teacher/${username}/`,
			__data,{
				headers:{
			"Authorization":`Token ${token}`,
			"Content-Type":'application/json'
				}
			}
			)
		const response = res.data
		return response
	}

function Table({dataToDisplay, role, editMode=false}){
	let  editableCells = []
	let tableHeader = []
	let fields = []

	if (role==='Teacher'){

		editableCells = [false, false, true]
		tableHeader = ['Student name','Mark','Grade']
		fields = ['student_name', 'mark',  'grade_letter']
	}
	else if (role==='Student'){
		dataToDisplay.date_recorded = dataToDisplay['date_recorded']?.toString().split('T')[0]
		editableCells = [false, false, false, false]
		tableHeader = ['Subject','Mark','Grade','Date Recorded']
		fields = ['subject_name', 'mark',  'grade_letter', 'date_recorded']
	}
	
	return (
		<table className="table table-striped container-md m-4">
		<thead>
			<tr>
				{
					tableHeader.map((text,index)=>
					(<th className='table-dark'>{text}{editableCells[index]? (editMode? "✍":null):null}</th>)
					)
				}
			</tr>
		</thead>
		<tbody>{
		dataToDisplay.map((row)=>{
			return (<tr>{
			fields.map((cell, index)=>
				
				(<th className="text-decoration-none">
				{editableCells[index] ? <input 
					name={`${row['student']}_${row['subject']}`} 
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



