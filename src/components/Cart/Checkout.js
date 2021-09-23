import {useRef, useState} from "react"
import classes from './Checkout.module.css';


const isEmpty = (value) => {
	return value.trim() === ""
}
const isNotSixDigits = (value) => {
	return value.trim().length !== 6
}

const Checkout = (props) => {
	const [formInputsValidity, setFormInputsValidity] = useState({
		name: true,
		street: true,
		postcode: true,
		city: true
	})
	
	const nameInputRef = useRef();
	const streetInputRef = useRef();
	const postcodeInputRef = useRef();
	const cityInputRef = useRef();

	
  const confirmHandler = (event) => {
    event.preventDefault();
	console.log(nameInputRef.current.value, streetInputRef.current.value, postcodeInputRef.current.value, cityInputRef.current.value)
	
	const enteredName = nameInputRef.current.value
	const enteredStreet = streetInputRef.current.value
	const enteredPostcode = postcodeInputRef.current.value
	const enteredCity = cityInputRef.current.value
	
	const isNameValid = !isEmpty(enteredName) 
	const isStreetValid = !isEmpty(enteredStreet) 
	const isPostcodeValid = !isNotSixDigits(enteredPostcode) 
	const isCityValid = !isEmpty(enteredCity) 
	
	setFormInputsValidity({
		name: isNameValid,
		street: isStreetValid,
		postcode: isPostcodeValid,
		city: isCityValid
	})
	
	const formIsValid = isNameValid && isStreetValid && isPostcodeValid && isCityValid
	
	if(!formIsValid){
		return;
	}
	  
	props.onConfirm({
		name: enteredName,
		street: enteredStreet,
		postcode: enteredPostcode,
		city: enteredCity
	})
	  
  };
	

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={`${classes.control} ${formInputsValidity.name ? "": classes.invalid}`}>
        <label htmlFor='name'>Your Name</label>
        <input ref={nameInputRef} type='text' id='name' />
		{!formInputsValidity.name && <p>Please enter a valid name</p>}
      </div>
      <div className={`${classes.control} ${formInputsValidity.street ? "": classes.invalid}`}>
        <label htmlFor='street'>Street</label>
        <input ref={streetInputRef} type='text' id='street' />
		{!formInputsValidity.street && <p>Please enter a valid street</p>}
      </div>
      <div className={`${classes.control} ${formInputsValidity.postcode ? "": classes.invalid}`}>
        <label htmlFor='postal'>Postal Code</label>
        <input ref={postcodeInputRef} type='text' id='postal' />
		{!formInputsValidity.postcode && <p>Please enter a valid postcode (6 characters long)</p>}
      </div>
      <div className={`${classes.control} ${formInputsValidity.city ? "": classes.invalid}`}>
        <label htmlFor='city'>City</label>
        <input ref={cityInputRef} type='text' id='city' />
		{!formInputsValidity.city && <p>Please enter a valid city</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;