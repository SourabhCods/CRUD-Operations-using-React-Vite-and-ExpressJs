import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Form(){
    
    const navigate = useNavigate();
    let [image , setImage] = useState('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRB8OJcUwJS7ebFCZ6cntL8cfHSsipWg6nGeoXu5m9MQ&s')
    let [formData , setFormData] = useState({
        name : '',
        description : '',
    
        
        
    })

    let handleOnImageChange = (event) => {
        console.log(event.target.files[0]);
        if (event.target.files[0]) {
            const reader = new FileReader();
            reader.onloadend = () => {
            setImage(reader.result);
        };
        reader.readAsDataURL(event.target.files[0]);
        }
            
    }

    let changeOnFormData = (event) => {
        setFormData({...formData, [event.target.name]: event.target.value});
    }

    

    let formOnSubmit = async (event) => {
        event.preventDefault();
        const Data = new FormData();
        Data.append('image', image);
        Data.append('name', formData.name);
        Data.append('description', formData.description);
        try{
            console.log(formData);
            await axios.post('http://localhost:8080/' , Data)
            .then((res) => navigate('/'))
            .catch(e => console.log(e))
            
        }
        catch(e){
            console.log(e);
        }
    }

    return(

        <form onSubmit={formOnSubmit} className='newForm'>
            <TextField 
            onChange = {changeOnFormData}
            label="Cartoon Name" 
            variant="standard" 
            placeholder = "Enter Cartoon Name"
            value = {formData.name}
            name = "name"
            />

            <br></br>

            <TextField 
            onChange = {changeOnFormData}
            label="Description" 
            variant="standard" 
            placeholder = "Enter Cartoon Description"
            value = {formData.description}
            name = "description"
            />
            
            <br></br>    

            <img src = {image} style={{height : '225px'  , width : '225px'}}></img>
            <br></br><br></br>
            <input type='file' onChange={handleOnImageChange}/>

            <br></br><br></br>
            <Button variant="outlined" type='submit'>Submit</Button>
            
        </form>
        
        
        
    )
}
