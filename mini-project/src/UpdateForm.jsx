import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams , useNavigate, BrowserRouter } from 'react-router-dom';

export default function UpdateForm(){
    const { id } = useParams();
    const navigate = useNavigate();

    let [name , setName] = useState('');
    let [description , setDescription] = useState('');

    let changeOnName = (evt) => {
        setName(evt.target.value);
    }

    let changeOnDescription = (evt) => {
        setDescription(evt.target.value);
    }
    
    useEffect(() => {
        axios.get(`http://localhost:8080/${id}`)
        .then((res) => {
            setName(res.data.name);
            setDescription(res.data.description);
            })
        .catch(e => console.log(e))
    } , [])


            



    let formOnSubmit = async (event) => {
        event.preventDefault();
        try{
            await axios.patch(`http://localhost:8080/${id}` , {name , description} )
            .then((res) => navigate('/'))
            .catch(e => console.log(e))
            
        }
        catch(e){
            console.log(e);
        }
    }

    return(
        <>
        <h3>Update Cartoon Form</h3>
        <form onSubmit={formOnSubmit}>
            <TextField 
            onChange = {changeOnName}
            label="Cartoon Name" 
            variant="standard" 
            placeholder = "Enter Cartoon Name"
            value = {name}
            name = "name"
            />

            <br></br>

            <TextField 
            onChange = {changeOnDescription}
            label="Description" 
            variant="standard" 
            placeholder = "Enter Cartoon Description"
            value = {description}
            name = "description"
            />

            <br></br><br></br>
            {/* <Link to={'/'}> */}
            <Button variant="outlined" type='submit'>Submit</Button>
            {/* </Link> */}

        </form>
        </>
        
        
        
    )
}