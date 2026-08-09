import "./BadgeSection.css";

import {
FaSeedling,
FaBolt,
FaFire,
FaStar,
FaCrown,
FaLock
} from "react-icons/fa";


function BadgeSection({tasks}) {


const completedTasks = tasks.filter(
(task)=>task.completed
).length;



const badges = [

{
title:"Beginner",
description:"Complete your first task",
icon:<FaSeedling/>,
unlocked: completedTasks >= 1
},


{
title:"Productivity Pro",
description:"Complete 10 tasks",
icon:<FaBolt/>,
unlocked: completedTasks >= 10
},


{
title:"Streak Master",
description:"Maintain a 7 day streak",
icon:<FaFire/>,
unlocked:false
},


{
title:"XP Hero",
description:"Earn 100 XP",
icon:<FaStar/>,
unlocked: completedTasks * 10 >= 100
},


{
title:"Task Legend",
description:"Complete 50 tasks",
icon:<FaCrown/>,
unlocked: completedTasks >= 50
}

];




return (

<section className="badge-section">


<h2>
Achievements
</h2>



<div className="badge-grid">


{

badges.map((badge,index)=>(


<div

key={index}

className={
badge.unlocked
?
"badge-card unlocked"
:
"badge-card locked"
}

>


<div className="badge-icon">

{
badge.unlocked
?
badge.icon
:
<FaLock/>
}

</div>



<div>

<h3>
{badge.title}
</h3>


<p>
{badge.description}
</p>


</div>


</div>


))

}



</div>


</section>

);

}


export default BadgeSection;