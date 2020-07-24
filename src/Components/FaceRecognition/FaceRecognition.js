import React from "react";



const FaceRecognition = ({ imageUrl }) => {
     return (
         <div className="center">
             <div className="absulote mt2">
               <img id="inputimage" alt="Pic" src={imageUrl} width="500px" height="auto" />
             </div>
         </div>
     )
}



export default FaceRecognition;