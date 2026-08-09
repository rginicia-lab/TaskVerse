import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";


function Register(){


const navigate = useNavigate();


const [form,setForm] = useState({

name:"",
email:"",
password:""

});



const handleChange=(e)=>{

setForm({

...form,

[e.target.name]:e.target.value

});

};




const handleRegister=async(e)=>{

e.preventDefault();


try{


const response = await fetch(

"http://localhost:5000/api/auth/register",

{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify(form)

}

);



const data = await response.json();



if(response.ok){

alert("Registration successful 🎉");

navigate("/login");

}



else{

alert(data.message);

}



}catch(error){

console.log(error);

}


};




return (

<div className="auth-page">


<div className="auth-card">


<h1>
🚀 TaskVerse
</h1>


<h2>
Create Account
</h2>


<p>
Start your productivity journey today
</p>




<form onSubmit={handleRegister}>


<input

type="text"

name="name"

placeholder="Full Name"

value={form.name}

onChange={handleChange}

required

/>


<input

type="email"

name="email"

placeholder="Email"

value={form.email}

onChange={handleChange}

required

/>



<input

type="password"

name="password"

placeholder="Password"

value={form.password}

onChange={handleChange}

required

/>



<button>

Create Account

</button>


</form>




<p>

Already have an account?

<Link to="/login">

 Login

</Link>

</p>



</div>


</div>

);


}


export default Register;