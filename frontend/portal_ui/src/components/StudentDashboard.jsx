import { useEffect, useState } from "react"
import useSWR from 'swr'
import Scores from './Scores'
import Account from "./Account"


function StudentDashboard({username, token, profileData}){
		const [page, setPage] = useState('account')
		// const response = response.map(({subject_name, mark, date_recorded})=>({subject_name, mark, date_recorded, }))
		// console.log(scores)
		return (<div className="d-flex gap-2">
				<div className="d-flex flex-column justify-content-center shadow">

					<button 
						className={"w-100 btn btn-lg  " + (page==='account' ? 'bg-white': 'bg-transparent')} 
						onClick={()=>(setPage('account'))}>
						Account
					</button>
					<button 
						className={"w-100 btn btn-lg " + (page==='table' ? 'bg-white': 'bg-transparent')} >
						What's on the table?
					</button>
					<button 
						className={"w-100 btn btn-lg " + (page==='scores' ? 'bg-white': 'bg-transparent')} 
						onClick={()=>(setPage('scores'))}>
						Scores
					</button>
					<button 
						className={"w-100 btn btn-lg " + (page==='help' ? 'bg-white': 'bg-transparent')} >
						Help
					</button>
				</div>
				{ page === 'account' ? <Account username={username} token={token} profileData={profileData}/> : null }
				{ page === 'scores' ? <Scores username={username} token={token}/> : null }
				{ page === 'table' ? <Scores /> : null }
				{ page === 'help' ? <Scores /> : null }
		</div>
		)
}

export default StudentDashboard;