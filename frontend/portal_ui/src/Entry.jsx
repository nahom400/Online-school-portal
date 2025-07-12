import { useState } from "react";
import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then((res)=>res.json())

const BASE_URL = "http://127.0.0.1:8000/"
const REQUEST_URL = "users/"

function Entry({logOut, username, token, role}){
	const {data, error, isValidating} = useSWR("")
	return (<>
		<div className="Entry bg-gradient ">
			<nav>
				<div>
					<div>
			 			<p>Welcome : {username} <br/>{role} marking</p>
		 			</div>
				</div>
				<div>
					<button className="btn btn-primary" onClick={logOut}>Logout</button>
				</div>
			</nav>

		 	<div className="header fw-bolder">
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
		 	</div>
		 </div> 
	</>)
}

export default Entry;