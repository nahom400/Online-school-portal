import { useState } from "react"
import Content from "./components/Content"

const BASE_URL = "http://127.0.0.1:8000/"

function Dashboard({logOut, token, profileData}){		
	const [page, setPage] = useState('account')
	return (
		<>
			<div className="bg-primary text-white">
				<nav>
					<div>
						<h4>Online School Portal</h4>
						<h6>{profileData.role}'s Portal </h6>
		 			</div>
					<div>
			 			<button className="rounded rounded-pill">{profileData.first_name}</button>
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
				<Content display={page} 
					profileData={profileData}
					token = {token}/>
		 	</div>
		 </> 
	)
}

export default Dashboard;