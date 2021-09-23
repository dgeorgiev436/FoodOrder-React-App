import {useEffect, useState} from "react"
import React from "react";
import Card from "../UI/Card"
import MealItem from "./MealItem/MealItem"

import classes from "./AvailableMeals.module.css"

// const DUMMY_MEALS = [
//   {
//     id: 'm1',
//     name: 'Sushi',
//     description: 'Finest fish and veggies',
//     price: 22.99,
//   },
//   {
//     id: 'm2',
//     name: 'Schnitzel',
//     description: 'A german specialty!',
//     price: 16.5,
//   },
//   {
//     id: 'm3',
//     name: 'Barbecue Burger',
//     description: 'American, raw, meaty',
//     price: 12.99,
//   },
//   {
//     id: 'm4',
//     name: 'Green Bowl',
//     description: 'Healthy...and green...',
//     price: 18.99,
//   },
// ];



const AvailableMeals = () => {
	const [meals, setMeals] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState()
	
	useEffect(() => {
		const fetchData = async() => {
				const response = await fetch("https://react-http-c2fbf-default-rtdb.firebaseio.com/meals.json")
				const responseData = await response.json()
				
				if(!response.ok) {
					throw new Error("Something went wrong!")
				}
				const loadedMeals = []

				for(let key in responseData) {
					loadedMeals.push({
						id: key,
						name: responseData[key].name,
						description: responseData[key].description,
						price: responseData[key].price
					})
				}
				setMeals(loadedMeals)
				setIsLoading(false)
			}
		
		
			fetchData().catch(err => {
				setIsLoading(false)
				setError(err.message)
			})
	
	}, [])
	
	if(isLoading){
		return <section className={classes.MealsLoading}>
			<p>Loading...</p>
		</section>
	}
	if(error){
		return <section className={classes.MealsError}>
			<p>{error}</p>
		</section>
	}
	
		const context = meals.map((mealData) => {
			return <MealItem
				key={mealData.id}
				id={mealData.id}
				name={mealData.name}
				description={mealData.description}
				price={mealData.price}
			/>
		})


	return(
		<section className={classes.meals}>
			<Card>
				<ul>{context}</ul>
			</Card>
		</section>
	)
}

export default AvailableMeals;
