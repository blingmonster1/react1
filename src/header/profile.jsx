import { useContext, useState } from 'react';
import { context, dispatchContext } from '../context.jsx';
import './profile.css';
import LoginForm from '../login/login.jsx'
import { User } from "../state.js";

function Profile() {
    const state = useContext(context);
    const dispatch = useContext(dispatchContext);
    console.log(state.user)
    let user = {name: '?'};
    if (state.user) user.name = state.user;
    const initial = user.name.charAt(0);

    function openModal()
    {
        dispatch({type: 'updateShowLoginForm', value: !state.showLoginForm});
    }
 
return (
    <>
    <div className="profile" onClick={openModal}>
    <span className="material-symbols-outlined font-36">person</span>
    </div>
    </>

);

}

export default Profile;