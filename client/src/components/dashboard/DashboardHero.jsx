import "./DashboardHero.css";

import {
FaFire,
FaStar,
FaTrophy
} from "react-icons/fa";


function DashboardHero({
user,
level,
totalXP,
streak
}) {


return (

<div className="dashboard-hero">


<div className="hero-content">


<h1>

Welcome back, {user?.name || "User"}

</h1>



<p>

Build better habits, complete your tasks,
and level up your productivity.

</p>


</div>





<div className="hero-stats">



<div className="hero-stat-card">


<div className="hero-icon streak">

<FaFire/>

</div>


<div>

<h3>
{streak}
</h3>

<span>
Day Streak
</span>

</div>


</div>






<div className="hero-stat-card">


<div className="hero-icon xp">

<FaStar/>

</div>


<div>

<h3>
{totalXP}
</h3>

<span>
XP Earned
</span>

</div>


</div>






<div className="hero-stat-card">


<div className="hero-icon level">

<FaTrophy/>

</div>


<div>

<h3>
Level {level}
</h3>

<span>
Current Level
</span>

</div>


</div>



</div>


</div>

);

}


export default DashboardHero;