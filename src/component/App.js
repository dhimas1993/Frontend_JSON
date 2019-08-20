import React, { Component } from 'react';
import { Route, BrowserRouter} from 'react-router-dom'
import cookies from 'universal-cookie'

import Header from './Header'
import Home from './Home'
import Login from './Login'
import Register from './register'

import {keepLogin} from '../action'
import {connect} from 'react-redux'

const cookie = new cookies()

class App extends Component {

    componentDidMount(){
        const objCookie = cookie.get('userName') //undefined

        if(objCookie !== undefined){ // ketika objCookie ada isinya, maka akan di login ulang secara otomatis
            //Login ulang
            this.props.keepLogin(objCookie)
        }
    }

    render(){
        return(
            <BrowserRouter>
                <Header/>
                    <div className="container-fluid">
                        <Route path='/' exact component={Home} />
                        <Route path='/login' component={Login} />
                        <Route path='/register' component={Register} />
                    </div>
            </BrowserRouter>
        )
    }
}

export default connect(null,{keepLogin})(App)