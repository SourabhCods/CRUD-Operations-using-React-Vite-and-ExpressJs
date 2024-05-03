import './Card.css'
import { useState , useEffect, Fragment } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import Loader from './Loader';
import { useAuth0 } from "@auth0/auth0-react";

export default function Card(){

    const[isLoading , setIsLoading] = useState(true);
    const { loginWithRedirect , isAuthenticated , logout , user } = useAuth0();

        const [cartoonArray, setCartoonArray] = useState([]);
        useEffect(() => {
        axios.get('http://localhost:8080/')
        .then((res) => {
            setTimeout(() => {
                setIsLoading(false);
                setCartoonArray(res.data);
            }, 2000); // Set isLoading to false after 5 seconds
        })

        
        .catch((err)=>{
        console.log("Data Not Found");
        })
    });

    let handleOnDeleteBtn = (id) => {
        axios.delete(`http://localhost:8080/${id}`)
        .then(res => console.log(res))
        .catch(e => console.log(e) )
    }
    
    return(
        <>  
            {isLoading ? (
                <Loader isLoading={isLoading}/>
            ) : (  
            <>
            {/* <Link to={'/signUp'}>SignUp</Link> */}
            {
                isAuthenticated ? 
                
                <Button 
                onClick={
                    () => 
                    logout(
                        { logoutParams: { returnTo: window.location.origin } }
                        )
                    }
                >
                    Log Out
                </Button>
                :
                <Button 
                size='small' 
                style={{}} 
                onClick={
                    () => loginWithRedirect()
                }>
                    Login
                </Button>
                
            }
            {
                isAuthenticated && <h3><b><i>{user.name}</i></b></h3>
            }
            {/* <img src = {user.image} style = {{height : '50px' , width : '50px'}}></img> */}
            {
                cartoonArray.map((obj) => {
                return <div className="cartoon-Card" key={obj.id}>
                    <h3>Cartoon Name  : {obj.name}</h3>
                    <img src={obj.image} className='cartoon-Image'></img>
                    <p>Description : {obj.description}</p>
                    {
                        isAuthenticated ? 
                        <Fragment>
                            <Button variant="contained" color="success" size="small">
                                <Link to={`/cartoon/${obj.id}`} style={{textDecoration : 'none' , color : 'white'}}>Update</Link>
                            </Button>
                            &nbsp;&nbsp;&nbsp;
                            <Button variant="contained" color="success" size="small" onClick={() => handleOnDeleteBtn(obj.id)}>Delete</Button>
                        </Fragment>
                        :
                        <Fragment>
                        <Button disabled variant="contained">Update</Button>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <Button disabled variant="contained">Delete</Button>
                        </Fragment> 

                    }
                </div>
                })
            }
            
            <Button variant='filled'>
            <Link to={'/cartoon'}>Add More Cartoons + </Link>
            </Button>

            </>

            )}
        </>
    )
}

