import { useState } from "react";
import useSWR from 'swr';
import StudentDashboard from "./components/StudentDashboard";
 import TeacherDashboard from "./components/TeacherDashboard";



const fetcher = (...args) => fetch(...args).then((res)=>res.json())

const BASE_URL = "http://127.0.0.1:8000/"
const REQUEST_URL = "users/"

function Entry({logOut, username, token, role}){
	const {data, error, isValidating} = useSWR("")

	return (
		<div className="Entry">
			<div className="bg-primary-subtle">
				<nav>
					<div>
						<div>
				 			<h4>Welcome : {username} <br/>{role} marking</h4>
			 			</div>
					</div>
					<div>
						<button className="btn btn-lg" onClick={logOut}>Logout</button>
					</div>
				</nav>
			</div>
			<div>
				<div>
					{ role==='student' ?
					<StudentDashboard token={token} username={username}/>
					:
					<TeacherDashboard token={token} username={username}/>
					}
		 		</div>
		 	</div>
		 	{/*<div className="header fw-bolder">
		 		<div></div>
		 	</div>
		 	<div className="body">
		 		<div className="panel-left shadow-lg ">
		 			<a className="bg-gradient">Grading</a>
		 			<a className="bg-gradient">Grade Change Requests</a>
		 			<a className="bg-gradient">-----------</a>
		 			<a className="bg-gradient">-----------</a>
		 		</div>
		 		<div className="panel-right">
		 			Panel-right
		 		</div>
		 	</div>*/}
		 </div> 
	)
}

export default Entry;