import React,{Component} from 'react';

class App extends Component {
    constructor() {
        super();
        this.state = {
            title: '',
            description: '',
            tasks: [],
            _id:''
        } 
        this.addTask = this.addTask.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    addTask(e) {
        if(this.state._id){
            fetch('/api/tasks/' + this.state._id, {
                method: 'PUT',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                M.toast({html: 'Task updated'});
                this.setState({
                    title: '',
                    description: '',
                    _id: ''
                });
                this.fetchTasks();
            });
        }else{
            fetch('/api/tasks', {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                M.toast({html: 'Task saved'})
                this.setState({
                    title: '',
                    description: ''
                });
                this.fetchTasks();
            })
            .catch(err => console.log(err));
        }
        e.preventDefault();
    }
    componentDidMount() {
        this.fetchTasks();
    }
    fetchTasks() {
        fetch('/api/tasks')
            .then(res => res.json())
            .then(data => {
                this.setState({tasks: data});
            });
    }
    editTask(task){
        fetch('/api/tasks/' + task, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            this.setState({
                title: data.title,
                description: data.description,
                _id: data._id
            });
        });
    }

    deleteTask(task) {
        if(confirm('Are you sure you want to delete?')) {
            fetch('/api/tasks/' + task, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                M.toast({html: 'Task deleted'})
                this.fetchTasks();
            });
        }
    }
    handleChange(e) {
       const {name, value} = e.target;
        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <div>
                {/*NAVEGATION*/}
                <nav className='deep-orange lighten-2'>
                    <div className='container'>
                        <a className='brand-logo' href='/'>TASKS</a>
                    </div>
                </nav>
                {/*CONTENT*/}
                <div className='container'>
                    <div className='row'>
                        <div className='col s5'>
                            <div className='card'>   
                                <div className='card-content'>
                                    <form onSubmit={this.addTask}>
                                        <div className='row'>
                                            <div className='input-field col s12'>
                                                <input name='title' onChange={this.handleChange} type='text' value={this.state.title} placeholder='Task title'/>
                                                <label htmlFor='task_name'>Task Name</label>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='input-field col s12'>
                                                <textarea name='description' onChange={this.handleChange} type='text'  value={this.state.description} className='materialize-textarea' placeholder='Task description'> </textarea>
                                                <label htmlFor='task_name'>Task Desccription</label>
                                            </div>
                                        </div>
                                        <button type='submit' className='btn deep-orange lighten-2'>
                                            SEND
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className='col s7'>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.tasks.map(task => {
                                            return (
                                                <tr key={task._id}>
                                                    <td>{task.title}</td>
                                                    <td>{task.description}</td>
                                                    <td>
                                                        <button className='btn deep-orange lighten-2'
                                                        onClick={()=>this.editTask(task._id)}>
                                                            <i className='material-icons'>edit</i>
                                                        </button>
                                                        <button className='btn deep-orange lighten-2' style={{margin: '4px'}}
                                                        onClick={()=> this.deleteTask(task._id)}>
                                                            <i className='material-icons'>delete</i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>  
                    </div>
                </div>
            </div>   
        )
    }
}

export default App;