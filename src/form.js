import React, {useState} from 'react';

import '../src/styles/form.css';

export default function Form(){

    const [form, setForm] = useState({
        name: "",
        phone: "",
        email: "",
        shippingAddress: "",
        projectAddress: "",

        customDesign: "",
        description: "",
        dimensionDetail: "",
        manufactureDetail: "",

        designText: "",
        deadline: "",
        budget: "",
        comment: ""
    })

    const [count, setCount] = useState(1)

    const updateForm = (e) => {
        setForm ({
            ...form,
            [e.target.name]: e.target.value,
        })
        // console.log(e.target)
        // console.log(form)
    }




    //"send" method using fetch
    const sendEmail = (e) => {

        e.preventDefault();

        const data = {
            service_id: 'service_z3p8h0m',
            template_id: 'template_svmf3nm',
            user_id: 'user_7Pf1rN0FgZQwrrMpFSw55',
            template_params: form
        };

    
        fetch('https://api.emailjs.com/api/v1.0/email/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(data)
        })

        .then((result) => {
            console.log(result.statusText);
        }, (error) => {
            console.log(error.statusText);
        });
        
        e.target.reset();

           //onSubmit redirect to a new page
    }



    return (
        <div className = "form-box">

            <h5 className = "form-step"> steps: {count} of 4 </h5>

            <form onSubmit = { sendEmail }>

                {count === 1  ?  (  //when the page count is 1 show this 
                <div className = "field1">
                <label> Driver Information</label>
            
                <input 
                    type ="text" 
                    className = "form-input"
                    name ="name" 
                    placeholder="Name"
                    onChange ={updateForm} 
                    value = {form.name}
                />

                
                <input 
                    type ="tel" 
                    className = "form-input"
                    name ="phone" 
                    placeholder="Phone 000-000-0000"
                    onChange ={updateForm} 
                    value = {form.phone}
                />

                <input 
                    type ="email" 
                    className = "form-input"
                    name ="email" 
                    placeholder="E-mail"
                    onChange ={updateForm} 
                    value = {form.email}
                />

                <textarea 
                    type ="text" 
                    className = "form-input"
                    name ="shippingAddress" 
                    placeholder="Shipping Address"
                    onChange ={updateForm} 
                    value = {form.shippingAddress}
                />

                <textarea 
                    type ="text" 
                    className = "form-input"
                    name ="projectAddress" 
                    placeholder="Physical location of the project"
                    onChange ={updateForm} 
                    value = {form.projectAddress}
                />
                </div>
                ):null} {/* if the page count is not equal to 1 then null */}

                {count === 2  ?  (
                <div className = "field2">
                <label> project description </label>

                
                <textarea 
                    type ="text" 
                    className = "form-input"
                    name ="customDesign"
                    placeholder="Are you interested in a custom design, or do you have a design to work from? Please describe your brand in detail here" 
                    onChange ={updateForm} 
                    value = {form.customDesign}
                />

                
                <textarea 
                    type ="text" 
                    className = "form-input"
                    name ="description" 
                    placeholder="“Please describe the project in as much detail as possible. Name colors and styles here. Use the email address below to upload reference photos."
                    onChange ={updateForm} 
                    value = {form.description}
                />

                Please upload the reference images, including your logo to <a href = "mailto: handsomehand@gmail.com">handsomehand@gmail.com</a>
                
                </div>
                ):null} 

                {count === 3  ?  (
                <div className = "field3">
                <label> dimensional details </label>
                <textarea 
                    type ="text" 
                    className = "form-input"
                    name ="dimensionDetail" 
                    placeholder="If the design will be painted directly onto a surface, please provide dimensions of the paintable area. Include working height from ground and texture of surface."
                    onChange ={updateForm} 
                    value = {form.dimensionDetail}
                />

                
                <textarea 
                    type ="text" 
                    className = "form-input"
                    name ="manufactureDetail" 
                    placeholder="If you are ordering a fabricated sign (wood, metal, canvas etc), please include dimensions, if it will have one or two sides, and if you need hanging hardware included."
                    onChange ={updateForm} 
                    value = {form.manufactureDetail}
                />
                </div>
                ):null} 

                {count === 4  ?  (
                <div className = "field4">
                <label> more info </label>

 
                <input 
                    type ="text" 
                    className = "form-input"
                    name ="designText" 
                    placeholder="Exact copy (words) in the design"
                    onChange ={updateForm} 
                    value = {form.designText}
                />

                <input 
                    type ="date" 
                    className = "form-input"
                    name ="deadline" 
                    placeholder="Deadline"
                    onChange ={updateForm} 
                    value = {form.deadline}
                />

                <input 
                    type ="text" 
                    className = "form-input"
                    name ="budget" 
                    placeholder="Budget"
                    onChange ={updateForm} 
                    value = {form.budget}
                />

                <textarea 
                    type ="text" 
                    className = "form-input"
                    name ="comment" 
                    placeholder="Comments"
                    onChange ={updateForm} 
                    value = {form.comment}
                />
                </div>
                ):null} 
                

                {/* SUBMIT button */}
                {count === 4  ?  (
                <button 
                type = "submit"
                id= "submitBtn"
                className = "submitBtn"
                > submit</button>
                ):null} 

            </form>
            {/* end of form */}


            {/* PREV button */}
            <button 
                className = "prevBtn"
                type = "submit" 
                onClick = {() => setCount(count -1)} //decrease the page count
                disabled = {count <= 1} //don't do anytying when the page is the first page
            > PREV </button>

            {/* NEXT button */}
            <button 
                className = "nextBtn"
                type = "submit" 
                onClick = {() => setCount(count +1)}
                disabled = {count >= 4} //at the last page, disable the next button
            > NEXT </button>

        </div>
        // end of form-box
    )
}