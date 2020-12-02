import { types } from "../types/types";

export const eventAddNew = (event) => ({
 type: types.eventAddEvent,
 payload: event,
});

export const eventSetActive = (event) => ({
 type: types.eventSetActive,
 payload: event,
});

export const eventClearSetActive = () => ({
 type: types.eventClearSetActive,
});

export const eventUpdate = (event) => ({
 type: types.eventUpdate,
 payload: event,
});

export const eventDelete = () => ({
 type: types.eventDelete,
});
