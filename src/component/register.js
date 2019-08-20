import React, {Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

class Register extends Component{
    onButtonClick = () =>{
        const username = this.username.value.trim()
        const email = this.email.value.trim()
        const pass = this.password.value.trim()

        if(username === '' || email === '' || pass === ''){
            console.log('Mohon untuk mengisi semua field')
        } else{
            axios.get('http://localhost:2019/users',{
                params:{
                    username: username
                }
            }).then((res)=>{
                console.log(res)
                if(res.data.length > 0){
                    console.log('Username sudah digunakan')
                    alert('username salah')
                } else{
                    axios.get('http://localhost:2019/users',{
                        params:{
                            email:email
                        }
                    }).then((res)=>{
                        if(res.data.length > 0){
                            console.log('Email sudah digunakan')
                            alert('email sudah digunakan')
                        } else{
                            axios.post('http://localhost:2019/users',{
                                    username : username,
                                    email: email,
                                    password: pass
                                }).then((res)=>{
                                    console.log(res)
                                    console.log('Data berhasil diinput')
                                }).catch((err)=>{
                                    console.log(err)
                                    console.log('Gagal post data')
                                })
                            }
                        })
                    }
                }
            ).catch((err)=>{
                console.log(err)
                })
        }
    }
        
    render(){
        return(
           <div>
               {/* col-sm-3 akan bisa dijalankan ketika atasnya ada class ROW */}
                <div className = 'mt-5 row'>
                    <div className = "col-sm-3 mx-auto card">
                        <div className = "card-body">
                            <div className = 'card-title border-bottom border-secondary'>
                                <h1>Register</h1>
                            </div>

                            <div className='card-title'>
                                <h4>Username</h4>
                            </div>
                            <form className='input-group'>
                                <input className='form-control'
                                ref={(username) => {this.username = username}}></input>
                            </form>

                            <div className='card-title'>
                                <h4>Email</h4>
                            </div>
                            <form className='input-group'>
                                <input className='form-control'
                                ref={(email) => {this.email = email}}></input>
                            </form>

                            <div className='card-title'>
                                <h4>Password</h4>
                            </div>
                            <form className='input-group'>
                                <input className='form-control' type="password"
                                ref={(password) => {this.password = password}}></input>
                            </form>
                            <button className='btn btn-success mt-3' onClick={this.onButtonClick}>Register</button>
                            <p className="mt-3">Sudah memiliki akun? <Link to="/login">Login disini</Link></p>
                        </div>
                    </div>
                </div>
           </div>
        )
    }
}

export default Register