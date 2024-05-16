import React from 'react';
import NavBar from './Navbar';
function Home(){
    
    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // Full viewport height
        
    };
    const imgStyle = {
        maxWidth: 'auto', // Ensure the image is responsive
        height: 'auto' // Maintain aspect ratio
    };

    return <div >
        <NavBar/>
        <div style={containerStyle}>
       <img src="homeimg.png" alt=""  style={imgStyle}/>
</div>

       
    

    </div>
}
export default Home;
