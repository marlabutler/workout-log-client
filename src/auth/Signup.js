import React, {useState} from 'react';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';

const Signup = (props) => {
    const [username, setUsername] = useState(''); 
    const [passwordhash, setPasswordhash] = useState(''); 

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch('http://localhost:3000/user/register', { //1
        method: 'POST', //2
        body: JSON.stringify({user:{username: username, passwordhash: passwordhash}}), //3
        headers: new Headers({
            'Content-Type': 'application/json' //4
        })
        }).then(
        (response) => response.json() //5
        ).then((data) => {
        props.updateToken(data.sessionToken) //6
        })
        }
        

return(
    <div>
        <h1>Sign Up</h1>
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Label htmlFor="username">Username</Label>
                <Input onChange={(e) => setUsername(e.target.value)} name="username" value={username}/>
            </FormGroup>
            <FormGroup>
                <Label htmlFor="password">Password</Label>
                <Input onChange={(e) => setPasswordhash(e.target.value)} name="password" value={passwordhash}/>
            </FormGroup>
            <Button type="submit">Sign Up</Button>
        </Form>
    </div>
    )
}

export default Signup;