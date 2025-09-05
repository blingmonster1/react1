import { useState, useContext } from 'react';
import { context, dispatchContext } from '../context.jsx';
import axios from "axios";
import './add-block.css';

function AddBlock({ showEditBlock }) {
    const state = useContext(context);
    const dispatch = useContext(dispatchContext);
    const [blockContents, setBlockContents] = useState('');
    const [blockTitle, setBlockTitle] = useState('');
    var alldata = state.alldata;
     
    function saveBlock() {
        console.log(blockContents)

        
    const header = {
        headers: {
          'Authorization': `Token ${state.token}`,
        }
      }

        axios.post('https://svu-csc-django-backend.online/block/', {
            title: blockTitle,
            content: blockContents,
            pageids:[state.alldata[state.course].pages[state.page].id]
          }, header)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });

        showEditBlock(false);
        alldata[state.course].pages[state.page].blocks.push({title: blockTitle, content: blockContents});
        dispatch({
            type: 'changeAllData',
            alldata: alldata
        });
    }

    
    return (
        <div>
            <div className='newBlock'>
                <div className='divspace'>
                    <input type="text" className='editBlockTitle' placeholder="Title" value={blockTitle} onChange={e => {setBlockTitle(e.target.value)}} />
                </div>
                
                <div className='divspace'>
                    <textarea className='editBlockArea' placeholder="Content" value={blockContents} onChange={e => setBlockContents(e.target.value)}></textarea>
                </div>

                <div className='divspace'>
                    <button className='saveBlockButton' onClick={() => saveBlock()}>Save Block</button>
                </div>
            </div>
        </div>
    );
  }
  
  export default AddBlock;