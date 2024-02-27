import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducers from "store/reducer";
import { SearchProvider } from './pages/Search/SearchContext';
import './config/axiosConfig';


const store = createStore(rootReducers);

ReactDOM.render(
	<React.StrictMode>
	<Provider store={store}>
		  <SearchProvider>
		<App />
		</SearchProvider>
	</Provider>
	</React.StrictMode>,

	document.getElementById("root")
);
