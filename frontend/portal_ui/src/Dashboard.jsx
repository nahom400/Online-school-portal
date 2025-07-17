import { useEffect, useState } from "react"
import useSWR from 'swr';
import Content from "./components/Content"

const fetcher = (...args) => fetch(...args).then((res)=>res.json())
const BASE_URL = "http://127.0.0.1:8000/"
const REQUEST_URL = "users/"

function Dashboard({logOut, username, token, role, profileData}){		const [page, setPage] = useState('account')
	return (
		<>
			<div className="bg-primary text-white">
				<nav>
					<div>
						<h4>Online School Portal</h4>
			 			<em>Welcome : {profileData.firstname}</em>
		 			</div>
					<div>
						<button className="btn btn-lg" onClick={logOut}>Logout</button>
					</div>
				</nav>
			</div>
			<div>
				<div className="d-flex justify-content-center shadow bg-primary">

					<button 
						className={" tabbutton btn btn-sm  " + (page==='account' ? 'bg-primary-subtle': 'bg-transparent')} 
						onClick={()=>(setPage('account'))}>
						Account
					</button>
					<button 
						className={"tabbutton btn btn-sm " + (page==='table' ? 'bg-primary-subtle': 'bg-transparent')}
						onClick={()=>(setPage('table'))} >
						What's on the table?
					</button>
					<button 
						className={" tabbutton btn btn-sm " + (page==='scores' ? 'bg-primary-subtle': 'bg-transparent')} 
						onClick={()=>(setPage('scores'))}>
						Scores
					</button>
					<button 
						className={" tabbutton btn btn-sm " + (page==='help' ? 'bg-primary-subtle': 'bg-transparent')} 
						onClick={()=>(setPage('help'))}>
						Help
					</button>
				</div>
				<Content display={page} username={username} role={role} profileData={profileData}/>
		 	</div>
		 </> 
	)
}

export default Dashboard;