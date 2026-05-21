/**
 * This file is the entry point for the React app, it sets up the root
 * element and renders the App component to the DOM.
 *
 * It is included in `src/index.html`.
 */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import React, { useState, useEffect } from "react";
import "./App.css";

const elem = document.getElementById("root")!;

interface User {
	id: number;
	firstName: number;
	lastName: string;
	age: number;
}
 
const AppWrapper: React.FC = () => {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [age, setAge] = useState<number | ''>('');

	const [users, setUsers] = useState<User[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		fetch('/api/users')
		.then(response => {
			if (!response.ok) {
			throw new Error('Network response was not ok');
			}
			return response.json();
		})
		.then(data => {
			setUsers(data);
			setLoading(false);
		})
		.catch(err => {
			setError(err.message);
			setLoading(false);
		});
	}, []);

	const handleSubmit = async(e: React.FormEvent) => {
		e.preventDefault();
		// alert(`Hello, ${firstName} ${lastName}!`);
		console.log(`Hello, ${firstName} ${lastName}! You are ${age} years old.`);
		const userData = { firstName, lastName, age };
		try {
			const response = await fetch('/api/users', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(userData),
			});

			if (!response.ok) {
				const errorData = await response.json();
				console.error('Error from server:', errorData.message);
				alert('Failed to submit user data: ' + errorData.message);
				return;
			}

			const result = await response.json();
			console.log('Server response:', result);
			alert('User data submitted successfully: ' + result.message);	


		} catch (error) {
			console.error("Error submitting form:", error);
		}
	};

	if (loading) return <div>Loading users...</div>;
	if (error) return <div>Error: {error}</div>;

	return (
		<div>
			<div>
				<h1>User List</h1>
				<ul>
					{users.map(user => (
					<li key={user.id}>
						{user.firstName} {user.lastName} ({user.age})
					</li>
					))}
				</ul>
			</div>
			
			<form onSubmit={handleSubmit}>
				<label>
					<span>First Name:</span>
					<input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
				</label>
				<br />
				<label>
					<span>Last Name:</span>
					<input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
				</label>
				<br />
				<label>
					<span>Age:</span>
					<input type="number" value={age} onChange={(e) => setAge(Number(e.target.value))} />
				</label>
				<button type="submit">Submit</button>
			</form>

		</div>
	);
};

export default AppWrapper;

// https://bun.com/docs/bundler/hot-reloading#import-meta-hot-data
(import.meta.hot.data.root ??= createRoot(elem)).render(<AppWrapper />);
