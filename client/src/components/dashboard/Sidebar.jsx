import "./Sidebar.css";

import { NavLink } from "react-router-dom";

import {
FaHome,
FaChartLine,
FaUser,
FaCog
} from "react-icons/fa";


function Sidebar() {


const menuItems = [

{
path:"/dashboard",
name:"Dashboard",
icon:<FaHome/>
},

{
path:"/analytics",
name:"Analytics",
icon:<FaChartLine/>
},

{
path:"/profile",
name:"Profile",
icon:<FaUser/>
},

{
path:"/settings",
name:"Settings",
icon:<FaCog/>
}

];



return (


<aside className="sidebar">


<div className="logo">


<div className="logo-icon">

T

</div>


<h2>

Task
<span>
Verse
</span>

</h2>


</div>





<nav>


{

menuItems.map((item)=>(


<NavLink

key={item.path}

to={item.path}

className={({isActive})=>

isActive
?
"menu active"
:
"menu"

}

>


<span className="menu-icon">

{item.icon}

</span>


<span>

{item.name}

</span>



</NavLink>


))


}


</nav>





<div className="sidebar-footer">


<p>
Build habits.
</p>

<p>
Achieve more.
</p>


</div>



</aside>


);

}


export default Sidebar;