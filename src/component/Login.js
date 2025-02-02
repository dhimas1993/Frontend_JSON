import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

import {onLoginUsers} from '../action/index'

class Login extends Component {

    onButtonClick = () => {

        const user = this.username.value.trim()
        const pass = this.password.value.trim()

        this.props.onLoginUsers(user,pass)
    }

    render(){
        if(this.props.user.username === ''){
            return(
                <div>
                    {/* col-sm-3 akan bisa dijalankan ketika atasnya ada class ROW */}
                     <div className = 'mt-5 row'>
                         <div className = "col-sm-3 mx-auto card">
                             <div className = "card-body">
     
                                 <div className = 'card-title border-bottom border-secondary'>
                                     <h1>Login</h1>
                                 </div>
     
                                 <div className='card-title'>
                                     <h4>Username</h4>
                                 </div>
                                 <form className='input-group'>
                                     <input className='form-control'
                                     ref={(username) => {this.username = username}}></input>
                                 </form>
     
                                 <div className='card-title'>
                                     <h4>Password</h4>
                                 </div>
                                 <form className='input-group'>
                                     <input className='form-control' type="password"
                                     ref={(password) => {this.password = password}}></input>
                                 </form>
                                 <button className='btn btn-primary mt-3' onClick={this.onButtonClick}>Login</button>
                                 <p className="mt-3">Tidak memiliki akun? <Link to="/register">Register disini</Link></p>
     
                             </div>
                         </div>
                     </div>
                </div>
             )
        }
            return <Redirect to='/'/>
        
    }
}

const mapStateToProps = (state) => {
    return{
        user: state.auth
    }
}

export default connect(mapStateToProps, {onLoginUsers})(Login)