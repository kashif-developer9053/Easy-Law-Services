import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducers from "store/reducer";
import { SearchProvider } from './pages/Search/SearchContext';


const store = createStore(rootReducers);

ReactDOM.render(
	<Provider store={store}>
		  <SearchProvider>
		<App />
		</SearchProvider>
	</Provider>,
	document.getElementById("root")
);
