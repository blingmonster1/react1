import './App.css';
import Header from './header/header.js';
import Sidebar from './sidebar/sidebar.js';
import Page from './page/page.js';
import { useReducer } from 'react';
import { context, dispatchContext } from './context.js';
import { defaultState }  from './state.js';
import LoginForm from './login/login.js';

function App() {
    const [state, dispatch] = useReducer(
        stateReducer,
        defaultState,
    );

    console.log(state.user)
    console.log(state.showLoginForm)
    const userName = state.user;
    const showLoginForm = state.showLoginForm;

    return (
        <context.Provider value={state}>
            <dispatchContext.Provider value={dispatch}>

                <div className="App">
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />

                    {userName && !showLoginForm ? <>

                        <div className="therest">
                            <div className="theleft">
                                <Sidebar/>
                            </div>
                            <div className = "theright">
                                <Page/>
                            </div>
                        </div>
                    </>: <LoginForm/> }
                </div>

            </dispatchContext.Provider>
        </context.Provider>
    );
}

function stateReducer(state, action) {
    switch (action.type) {
        case 'changeCourse': {
            return {
                ...state,
                course: action.courseNum,
                page: 0
            };
        }
        case 'changePage': {
            return {
                ...state,
                page: action.pageNum
            }
        }
        case 'changeUser': {
            return {
                ...state,
                user: action.userName
            }
        }
        case 'updateShowLoginForm': {
            return {
                ...state,
                showLoginForm: action.showLoginForm
            }
        }
        case 'changeAllData': {
            return {
                ...state,
                alldata: action.alldata
            }
        }

        case 'setToken': {
            return {
                ...state,
                token: action.token
            }
        }

        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}

export default App;
