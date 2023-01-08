import { Todo } from "../todos/models/todo.model";

export const filters = {
    All: 'all',
    Completed: 'completed',
    Pending: 'pending'
}

const state = {
    todos : [
        new Todo( 'Piedra de cookie' ),
        new Todo( 'Piedra de mota' ),
    ],
    filter: filters.All,

}

const initStore = () => {
    loadStore();
    console.log( 'InitStore 🥑' );

}

const loadStore = () => {

    if( !localStorage.getItem( 'state' ) ) return;

    const { todos = [], filter = filters.All } = JSON.parse( localStorage.getItem( 'state' ) );
    state.todos = todos;
    state.filter = filter;
}

const saveStateToLocalStorage = () => {
    localStorage.setItem( 'state', JSON.stringify( state ) );
}

const getTodos = ( filter = filters.All ) => {

    switch( filter ) {
        case filters.All:
            return [...state.todos];
        
        case filters.Completed:
            return state.todos.filter( todo => todo.done ) ;
        
        case filters.Pending:
            return state.todos.filter( todo => !todo.done );
        
        default:
            throw new Error( `Option ${ filter } is not valid` );
    }
}

/**
 * 
 * @param {String} description 
 */

const addTodo = ( description ) => {
    if( ! description ) throw new Error( 'Description is required' );

    state.todos.push( new Todo( description ) );

    saveStateToLocalStorage();
}

/**
 * 
 * @param {String} todoId 
 */

const toggleTodo = ( todoId ) => {
    if( !todoId ) throw new Error( 'todoId is required' ); 

    state.todos = state.todos.map( todo => {
        if( todo.id === todoId ) {
            todo.done = !todo.done;
        }
        return todo;
    } );

    saveStateToLocalStorage();
}

const deleteTodo = ( todoId ) => {
    if( !todoId ) throw new Error( 'todoId is required' );

    state.todos = state.todos.filter( todo => todo.id !== todoId );

    saveStateToLocalStorage();
}

const deleteCompleted = () => {

    state.todos = state.todos.filter( todo => !todo.done );
    console.log( state.todos )
    saveStateToLocalStorage();
}

const setFilter = ( newFilter = filters.All ) => {
    state.filter = newFilter;
    saveStateToLocalStorage();
}

const getCurrentFilter = () => {
    return state.filter
}

export default {
    addTodo,
    deleteCompleted,
    deleteTodo,
    getCurrentFilter,
    getTodos,
    initStore,
    loadStore,
    setFilter,
    toggleTodo,
}