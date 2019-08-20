import React, { Component } from 'react'
import axios from '../config/axios'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

class Home extends Component {
    state = {
        tasks: [],
        selectedId : 0
    }

    addTask = (userid) => {
        const description = this.task.value
        const completed = false
        console.log(userid);
        

        // Post task baru
        axios.post(
            '/tasks/',
            {
                userid,
                description,
                completed
            }
        ).then((res) => {
            // Get tasks
            this.getTasks()
        }).catch((err) =>{
        })
    }

    onDeleteItem = (id) => {
        axios.delete('http://localhost:2019/tasks/' + id)
        .then(() => {
            this.getTasks()
        })
    }

    changeTaskDone = (tasks) => {
        console.log(tasks);
        
        axios.patch( `/tasks/` + tasks,{
            completed : true
        }).then((res) => {
            this.getTasks()
        }).catch((err) => {
            console.log(err);
        })
    }

    changeTaskCancel = (tasks) => {
        console.log(tasks);
        
        axios.patch( `/tasks/` + tasks,{
            completed : false
        }).then((res) => {
            this.getTasks()
        }).catch((err) => {
            console.log(err);
        })
    }

    getTasks = (id) => {
        const user = this.props.userid 
        
        axios.get('/tasks/',{
            params : {
                userid : user
            }
        }).then(res => {
            console.log(res);
            this.setState({tasks: res.data})
        }).catch((err) => {
            console.log(err);
        })
    }

    componentDidMount(){
        // Get Tasks
        this.getTasks()
    }

    renderTasks = () => {
        return this.state.tasks.map(task => {
            if(!task.completed){
                return (
                    <li className='list-group-item d-flex justify-content-between'>
                        <span>{task.description}</span>
                        <span>
                            <button 
                                className='btn btn-outline-primary'
                                onClick={() => {this.changeTaskDone(task.id)}}
                            >
                                Done
                            </button>
                            <button 
                                className='btn btn-outline-primary'
                                onClick={() => {this.onDeleteItem(task.id)}}
                            >
                                Delete
                            </button>
                        </span>
                    </li>
                )
            }

            return (
                <li className='list-group-item d-flex justify-content-between bg-warning'>
                    <span>{task.description}</span>
                    <span>
                    <button 
                        className='btn btn-outline-primary'
                        onClick={() => {this.changeTaskCancel(task.id)}}
                    >
                        Belum Selesai
                    </button>
                    </span>
                </li>
            )
        })
    }

    render() {
        // Jika user sudah login
        if(this.props.userid){
            return (
                <div className="container">
                        <h1 className="display-4 text-center animated bounce delay-1s">List Tasks</h1>
                        <form className="form-group mt-5">
                            <input type="text" className="form-control" placeholder="What do you want to do ?" defaultValue={''} ref={input => this.task = input}/>
                        </form>
                        <button type="submit" className="btn btn-block btn-primary mt-3"
                        onClick={() => this.addTask(this.props.userid)}>Up !</button>
                    
                        <ul className="list-group list-group-flush mb-5">
                            {this.renderTasks()}
                        </ul>
                        </div>
            )
        }

        return <Redirect to='/login'/>
        
    }
}

const mps = state => {
    return {
        userid: state.auth.id
    }
}

export default connect(mps)(Home)