import { useContext, useState } from 'react';
import { context } from '../context.jsx';
import PageNav from './page-nav/page-nav.jsx';
import AddBlock from './add-block.jsx'
import './page.css';

function Page() {

    const [showBlockEdit, setEditBlock] = useState(false);

    const state = useContext(context);
    
    let page;
    if (state.alldata) {
        page = state.alldata[state.course].pages[state.page];
    }

    return (
        <div>
            {state.alldata ? <>
            <PageNav/>
            <div className="main-content">

                {state.alldata[state.course].pages[state.page].blocks.map((block, idx) => (
                    <>
                    <div className='blockTitle'>{block.title}</div>
                    <div className='blockContent'>{block.content}</div> 
                    </>
                ))}

                {!showBlockEdit ? 
                    <button className='addBlockButton' 
                    onClick={() => setEditBlock(true)}>Add Block</button> : ""
                }
                {showBlockEdit ?  
                    <AddBlock showEditBlock={setEditBlock}></AddBlock>
                : ''}

            </div>
            </> : null}
        </div>
    );
  }
  
  export default Page;