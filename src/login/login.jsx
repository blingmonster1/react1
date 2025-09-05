import { useContext, useState, useEffect } from 'react';
import { context, dispatchContext } from '../context.jsx';
import './login.css';
import axios from "axios";

function LoginForm() {

    const state = useContext(context);
    const dispatch = useContext(dispatchContext);

    const [userEmail, setEmail] = useState('');
    const [userPassword, setPassword] = useState('');
    const [errors, setErrors] = useState('');
    const [loading, setLoading] = useState(true);         
        
    async function getToken() {

        const body = {
            "username": userEmail,
            "password": userPassword
            }
        
            console.log(body);
        
            const header = {
            header: {
                'Content-Type': 'application/json;charset=UTF-8',
            }
            }
            
            const url='https://svu-csc-django-backend.online/api-token-auth/'
            try {
                const response = await axios.post(url, body, header);
                dispatch({
                    type: 'setToken',
                    token: response.data.token
                });
                dispatch({
                    type: 'changeUser',
                    userName: userEmail
                });
                dispatch({
                    type: 'updateShowLoginForm',
                    showLoginForm: false
                });
                console.log(response.data.token)
                console.log(userEmail)
                setLoading(false);
            } catch (error) {
                setErrors("Wrong Email or Password!");
                setLoading(false);
            }
        };
     

    function closeme() {
        console.log("closeme")
        // dispatch(
        // {
        //     type: 'updateShowLoginForm', 
        //     value: false
        // });
    }


    return (

        <div className="modal">
            {state.user ?  
                <div className='xx' onClick={closeme}>
                    <span className="material-symbols-outlined">close</span>
                </div>
             : ''}
            
            <div>Email</div>
            <input type="text" placeholder="email" value={userEmail} onChange={e => {setEmail(e.target.value)}} />
            <div>Password</div>
            <input type="password" placeholder="password" value={userPassword} onChange={e => {setPassword(e.target.value)}} />
            <div>
            <button className="submit-bttn" onClick={getToken}>Log In</button>
            </div>
            <div className="error-message">{errors}</div>
        </div>

    )
}

export default LoginForm;