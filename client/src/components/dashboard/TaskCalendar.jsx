import Calendar from "react-calendar";
import { useState } from "react";
import "./TaskCalendar.css";


function TaskCalendar({tasks}) {


const [date,setDate] = useState(new Date());



const tasksOnDate = tasks.filter((task)=>{


if(!task.reminder)
return false;


const taskDate = new Date(task.reminder);


return (

taskDate.toDateString()
===
date.toDateString()

);


});



return (

<div className="calendar-card">


<h2>
📅 Task Calendar
</h2>



<Calendar

value={date}

onChange={setDate}

/>



<div className="calendar-tasks">


<h3>
Tasks for selected date
</h3>


{

tasksOnDate.length === 0 ?


<p>
No reminders
</p>


:

tasksOnDate.map((task)=>(

<div
className="calendar-task"
key={task._id}
>

{task.title}

</div>

))


}



</div>


</div>

);


}


export default TaskCalendar;