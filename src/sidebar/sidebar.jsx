import Select from "react-select"
import { useContext, useState, useEffect } from 'react';
import { context, dispatchContext } from '../context.jsx';
import './sidebar.css';
import axios from "axios";

function Sidebar() {
    const state = useContext(context);
    const dispatch = useContext(dispatchContext);
    
      // Get the data
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const url = "https://svu-csc-django-backend.online/section/";

    const header = {
        headers: {
          'Authorization': `Token ${state.token}`,
        }
      }

    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await axios.get(url, header);
            dispatch({
                type: 'changeAllData',
                alldata: response.data
            });
            setLoading(false);
            } catch (error) {
            setError(error);
            setLoading(false);
            }
        };

        fetchData();

        return () => {
            // Clean-up function (optional)
            // Add any clean-up logic here
        };
    }, []);
    // The square brackets above can have dependencies. If it
    // is empty then useEffect will run once. 
    // if there is a variable(s) inside the [] then the function
    // runs if the variable changes (or either of them change)

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }
      
    console.log(state.alldata[0])

    let dropdown_options = []
    if(state.alldata) {
        dropdown_options = state.alldata.map((_class, index) => ({value: index, label: _class.title}))
        console.log(dropdown_options)
    }

    function select_course(option){
        dispatch({
            type: 'changeCourse',
            courseNum: option.value
        })
    }

    return (

        <div>
        
        {state.alldata ? <>
                <Select options={dropdown_options} value={dropdown_options[state.course]} onChange={select_course}/>
            
            <ul>
                {state.alldata[state.course].pages.map((pg, idx) => (
                    <li key={'page' + idx} 
                    onClick={() => {
                        dispatch({
                            type: 'changePage', 
                            pageNum: idx
                        })
                    }}>{idx+1}.  {pg.title}</li>
                ))}
            </ul>
            </>
        : ''}

        </div>


    );
  }
  
  export default Sidebar;