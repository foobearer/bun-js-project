/**
 * This file is the entry point for the React app, it sets up the root
 * element and renders the App component to the DOM.
 *
 * It is included in `src/index.html`.
 */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import React, { useState } from "react";
import "./App.css";

const elem = document.getElementById("root")!;
 
function AppWrapper() { 
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [age, setAge] = useState<number | ''>('');

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// alert(`Hello, ${firstName} ${lastName}!`);
		console.log(`Hello, ${firstName} ${lastName}! You are ${age} years old.`);
	};

	return (
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

	);
}

// https://bun.com/docs/bundler/hot-reloading#import-meta-hot-data
(import.meta.hot.data.root ??= createRoot(elem)).render(<AppWrapper />);
