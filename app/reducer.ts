import { combineReducers } from "redux";

const initialState = {
  subjects: [] as any[],
  students: [] as any[],
};

export const Actions = {
  ADD_SUBJECT: "[[ADD-NEW-SUBJECT]]",
  DELETE_SUBJECT: "[[DELETE-SUBJECT]]",
  UPDATE_SUBJECT: "[[UPDATE-SUBJECT]]",
  EDIT_STUDENT: "[[EDIT-STUDENT]]",
  ADD_STUDENTS: "[[ADD-NEW-STUDENTS]]",
  DELETE_STUDENTS: "[[DELETE-STUDENTS]]",
  UPDATE_STUDENTS: "[[UPDATE-STUDENTS]]",
};
export function RecordsReducer(state = initialState, action: any) {
  switch (action.type) {
    case Actions.EDIT_STUDENT: {
      state = { ...state, subjects: action.payload };
      return state;
    }
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

    case Actions.ADD_STUDENTS: {
      const students = state.students || [];
      students.push(action.payload);
      state = { ...state, students, subjects: [] };
      return state;
    }

    case Actions.DELETE_STUDENTS: {
      const students = state.students.filter(
        (student) => student.id !== action.payload
      );
      state = { ...state, students };
      return state;
    }

    case Actions.UPDATE_STUDENTS: {
      const students = state.students.map((student) => {
        if (student.id === action.payload.id) {
          return action.payload;
        }
        return student;
      });
      state = { ...state, students };
      return state;
    }
  }
  return state;
}

const rootReducer = combineReducers({
  records: RecordsReducer,
});

export default rootReducer;
