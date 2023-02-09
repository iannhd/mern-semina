import React from "react"; 

function Thead({text}){
    console.log(text, "dari thead");
    return (
        <thead>
            <tr>
                {text.map((text,index) =>
                {   
                    return <th key={index}>{text}</th>
                })}
            </tr>
        </thead>
    )
}

export default Thead
