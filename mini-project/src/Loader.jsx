export default function Loader({isLoading}){

    let loaderStyle = {
        display : 'flex',
        size : '200px',
        justifyContent : 'center',
        alignItems : 'center'
    }
    return(
        <>
            {
                isLoading ? 
                <>
                <div style={loaderStyle}>
                <img src="https://cdn.dribbble.com/users/418188/screenshots/3102257/rocket_animation_tubik_studio.gif"></img>
                <h3 style={{fontSize : '40px' , fontFamily : 'Cursive'}}>Loading.....</h3>
                </div>
                </> 
                : null
            }
            
        </>
    )
}