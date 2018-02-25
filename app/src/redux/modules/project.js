import createAction from '../../helpers/redux/createAction'

const LOAD_ALL_PROJECTS = createAction('LOAD_ALL_PROJECTS')

const initialState = {
  projects: ['ok'],
  isLoading: false
}

// reducers
const loadAllProject = (state, action) => ({
  ...state,
  isLoading: true
})
// reducers
export default function reducer (state = initialState, action) {
  switch (action.type) {
    case LOAD_ALL_PROJECTS:
      return loadAllProject(state, action)
    default:
      return state
  }
}

// action creators
export const loadAll = () => ({
  type: LOAD_ALL_PROJECTS
})

// selectors
export const projectsSelector = state => state.project.projects
