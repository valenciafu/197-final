import React, { Component } from 'react'
import axios from 'axios'

class LoginBox extends Component {
	render() {
		return (
			<div className="box" style="width:50%; marginLeft:auto; marginRight:auto; marginTop:5%">
        		<h1 className="title">Log in</h1>

		        <form method="POST">
		          <div className="field">
		            <label className="label">Name</label>
		            <div className="control">
		              <input className="input" type="text" name="username"/>
		            </div>
		          </div>

		          <div className="field">
		            <label className="label">Password</label>
		            <div className="control">
		              <input className="input" type="password" name="password"/>
		            </div>
		          </div>

		          <div className="field">
		            <label className="label">User type</label>
		            <div className="control">
		              <div className="select">
		                <select name="type">
		                  <option value="student">Student</option>
		                  <option value="ta">TA</option>
		                </select>
		              </div>
		            </div>
		          </div>

		          <button className="button is-success" type="submit">Log in</button> <br/>
		        </form>
      		</div>
		)
	}
}