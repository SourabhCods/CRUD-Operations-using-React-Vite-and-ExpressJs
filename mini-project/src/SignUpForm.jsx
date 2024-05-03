import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useState } from 'react';
import passwordValidator from 'password-validator';
 


export default function SignUpForm(){

    let [username , setUsername] = useState("");
    let [email , setEmail] = useState("");
    let [password , setPassword] = useState("");
    
    let [inputErrors , setInputErrors] = useState({
        username : false,
        email  : false , 
        password : false
    })

    let [isfilled , setIsFilled] = useState(false);


    let validatePassword = (password) => {
        const schema = new passwordValidator(); //to validate password
    schema
      .is().min(8)                                    // Minimum length 8
      .has().uppercase(1)                              // Must have uppercase letters
      .has().lowercase()                             // Must have lowercase letters
      .has().digits(1)                                 // Must have digits
    //   .has().symbols();                               // Must have symbols

    return schema.validate(password, { list: true });
  };
    
    
    
    const handleOnNameChange = (event) => {
        setUsername(event.target.value);
        
        let showSuccess = event.target.value !== '' && event.target.value.length == 10;
        setIsFilled(showSuccess); // Update isFilled based on input value
    }
        //[i/p - field] = value
    const handleOnEmailChange = (event) => {
        setEmail(event.target.value);
        setIsFilled(/\S+@\S+\.\S+/.test(event.target.value));
    }

    const handleOnPasswordChange = (event) => {
        setPassword(event.target.value);
    }
    
    const handleOnSubmit = (event) => {
        event.preventDefault();

        let validationErrMesg = validatePassword(password);
        console.log(validationErrMesg);
        if(!username || !email || validationErrMesg.length > 0){  // F || F || F
            setInputErrors({
                username : !username , 
                email : !email , 
                password : validationErrMesg.length > 0,
            })
            return;
        }
        else{
                console.log("Please fill in all the 3 fields");
            }

        

        axios.post('http://localhost:8080/signUp' , {username , email , password })
        .then((res) => {
            console.log(res.data);
        })
        .catch(e => console.log(e));
    }

    return(
        <form onSubmit={handleOnSubmit}>
            <TextField
            onChange={handleOnNameChange}
            label="Enter Username" 
            variant="outlined"
            color={ isfilled  ? 'success'  : ''}
            name = "username"
            value = {username}
            placeholder='Enter your Name'
            error = {inputErrors.username}
            helperText={inputErrors.username ? "Username is required" : 'max 8-characters required'}
            />

            <br></br><br></br>

            <TextField
            type='email'
            onChange={handleOnEmailChange}
            label="Enter Email" 
            variant="outlined"
            color={ isfilled  ? 'success'  : ''}
            name = "email"
            value = {email}
            placeholder='aBc@gmail.com'
            error = {inputErrors.email}
            helperText={inputErrors.email ? "Email is required" : "Please enter a valid-email"}
            />

            <br></br><br></br>

            <TextField
            onChange={handleOnPasswordChange}
            label="Enter Password" 
            variant="outlined"
            name = "password"
            value = {password}
            placeholder='Enter Your Password'
            error = {inputErrors.password}
            helperText={inputErrors.password ? "Password must be valid" : "Enter password"}
            />

            <br></br><br></br>

            <Button variant='danger' type='submit'>Register</Button>
        </form>

        
    )
}