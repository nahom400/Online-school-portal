import { useState, useEffect } from "react"
import useSWR from 'swr'
const fetcher = (...args) => fetch(...args).then((res)=>(res.json()))
const BASE_URL = "http://127.0.0.1:8000/"
const REQUEST_URL = "auth/get_all_scores/"

function Scores({username, token}){
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

	if (isValidating) {
		return (
			<div className="spinner-border">
				<span className="visually-hidden">Loading...</span>
			</div>
			)
		}

	if (response){ return (<div>
			<h1>Scores</h1>
			<table className="table table-striped table-bordered table-hover flex-wrap" >
				<thead className="table-dark">
					<tr>
						<th>Subject</th>
						<th>Score</th>
						<th>Grade</th>
						<th>Recorded</th>
					</tr>
				</thead>
			<tbody>
				{ 
					response.map((entry)=>{ 
					const keys = ['subject_name','mark','grade_letter','date_recorded']
				return (<tr>
					{keys.map((key)=>(<td>{entry[key]}</td>))}
					</tr>)
					})			
				}
			</tbody>
			</table>
		</div>)
	}
}

export default Scores;