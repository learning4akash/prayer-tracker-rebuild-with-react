import { Outlet, Link } from "react-router-dom";
import './App.css'
const App = () => (

    <div>
       <div className='topbar-content'>
          <div></div>
          <div>
            <h1><Link href='/'>Salat Tracker</Link></h1>
          </div>
          <img src='https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg' className='user-pic' />
       </div> 
        
        <hr />

       <nav>
        <div></div>
        <div>
          <ul>
            <li><Link to={`/dashboard`}>Dashboard</Link></li>
            <li><Link to={`/today`}>Today</Link></li>
            <li><Link to={`/`}>Setting</Link></li>
          </ul>
        </div>
        <div></div>
       </nav> <hr />

       <div>
         <Outlet />
       </div>
     

    </div>
);

export default App;