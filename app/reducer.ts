import { combineReducers } from "redux";

const initialState = {
  subjects: [] as any[],
};

export const Actions = {
  ADD_SUBJECT: "[[ADD-NEW-SUBJECT]]",
  DELETE_SUBJECT: "[[DELETE-SUBJECT]]",
  UPDATE_SUBJECT: "[[UPDATE-SUBJECT]]",
};
export function RecordsReducer(state = initialState, action: any) {
  switch (action.type) {
    case Actions.ADD_SUBJECT: {
      const subjects = state.subjects;
      subjects.push(action.payload);
      state = { ...state, subjects };
      return state;
    }

    case Actions.DELETE_SUBJECT: {
      const subjects = state.subjects.filter(
        (subject) => subject.id !== action.payload
      );
      state = { ...state, subjects };
      return state;
    }

    case Actions.UPDATE_SUBJECT: {
      const subjects = state.subjects.map((subject) => {
        if (subject.id === action.payload.id) {
          return action.payload;
        }
        return subject;
      });
      state = { ...state, subjects };
      return state;
    }
  }
  return state;
}

const rootReducer = combineReducers({
  records: RecordsReducer,
});

export default rootReducer;
