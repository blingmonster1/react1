import { useContext } from 'react';
import { context, dispatchContext } from '../../context.jsx';
import './page-nav.css';


function PageNav() {
    const state = useContext(context);
    const dispatch = useContext(dispatchContext);
    const cls = state.alldata[state.course];
    const pg = cls.pages[state.page];
    const pgnum = state.page

    function goleft() {
        dispatch({
            type: 'changePage', 
            pageNum: state.page - 1
        });
    } 

    function goright() {
        dispatch({
            type: 'changePage', 
            pageNum: state.page + 1
        });
    } 

    return (
        <div className="page-nav">
            <div className ={` ${state.page < 1 ? "noShow" : "show" }`}>
            <span onClick={() => {goleft()}} 
            className="material-symbols-outlined">
            arrow_back_ios
            </span>
            </div>

            <h3>{pg.title}</h3>

            <div className ={` ${state.page >= cls.pages.length -1 ? "noShow" : "show" }`}>
            <span onClick={() => {goright()}} 
            className="material-symbols-outlined">
            arrow_forward_ios
            </span>

        </div>

        </div>
    );
  }
  
  export default PageNav;