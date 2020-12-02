import { combineReducers } from "redux";

import { uiReducers } from "./uiReducer";
import { calendarsReducers } from "./eventsReducers";

export const rootReducers = combineReducers({
 ui: uiReducers,
 calendar: calendarsReducers,
});
