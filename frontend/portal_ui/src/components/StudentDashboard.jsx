import { useEffect, useState } from "react"
import useSWR from 'swr'
import Scores from './Scores'
import Profile from "./Profile"
const fetcher = (...args) => fetch(...args).then((res)=>(res.json()))
const BASE_URL = "http://127.0.0.1:8000/"
const REQUEST_URL = "auth/get_all_scores/"


function StudentDashboard({username, token}){
	const [fullUrl, setFullUrl] = useState(null)
	const [page, setPage] = useState('profile')

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
	
	const {data : response, isValidating, error} = useSWR(fullUrl, fetcher)

	
	if (response){
		// const response = response.map(({subject_name, mark, date_recorded})=>({subject_name, mark, date_recorded, }))
		// console.log(scores)
		return (<div className="d-flex gap-2">
				<div className="d-flex flex-column align-items-start">
					<button className="btn btn-lg" onClick={()=>(setPage('profile'))}>Profile</button>
					<button className="btn btn-lg">What's on the table?</button>
					<button className="btn btn-lg" onClick={()=>(setPage('scores'))}>Scores</button>
					<button className="btn btn-lg">Help</button>
				</div>
				{ page === 'profile' ? <Profile response={response}/> : null }
				{ page === 'scores' ? <Scores response={response}/> : null }
				{ page === 'table' ? <Scores response={response}/> : null }
				{ page === 'help' ? <Scores response={response}/> : null }
		</div>
		)
	}

	if (isValidating) {return (<div className="spinner-border">
		<span className="visually-hidden">Loading...</span>
	</div>)}
}

export default StudentDashboard;