import { useState, useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import "./Settings.css";


function Settings() {

const { darkMode, setDarkMode } = useContext(ThemeContext);

const [notifications, setNotifications] = useState(true);



const logout = () => {

localStorage.removeItem("user");

window.location.href="/login";

};



return (

<div className="settings-container">


<div className="settings-card">


<h1>
⚙️ Settings
</h1>



<div className="setting-row">

<div>

<h3>
🌙 Dark Mode
</h3>

<p>
Change application theme
</p>

</div>



<label className="toggle">

<input

type="checkbox"

checked={darkMode}

onChange={()=>
setDarkMode(!darkMode)
}

/>

<span></span>

</label>


</div>





<div className="setting-row">

<div>

<h3>
🔔 Notifications
</h3>

<p>
Task reminder alerts
</p>

</div>



<label className="toggle">

<input

type="checkbox"

checked={notifications}

onChange={()=>
setNotifications(!notifications)
}

/>

<span></span>

</label>


</div>





<button

className="logout-button"

onClick={logout}

>

🚪 Logout

</button>


</div>


</div>

);

}


export default Settings;