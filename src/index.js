import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import "./index.css";
import App from "./App";

const store = createStore()

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
		<Router>
			<App />
		</Router>
		</Provider>
	</React.StrictMode>,
	document.getElementById("root")
);
