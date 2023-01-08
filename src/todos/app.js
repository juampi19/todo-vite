import html  from './app.html?raw';
import todoStore, { filters } from '../store/todo.store';
import { renderTodos, renderPending } from './use-cases';

/**
 * 
 * @param {String} elementId 
 */

const elementIDs = {
    TodoList: '.todo-list',
    newTodoInput: '#new-todo-input',
    clearCompleted: '.clear-completed',
    todoFilters: '.filtro',
    countTodos: '#pending-count'
}

export const App = ( elementId ) => {

    const displayTodos = () => {
        const todos = todoStore.getTodos( todoStore.getCurrentFilter() );

        renderTodos( elementIDs.TodoList, todos );
        updatePendingCount();
    }

    const updatePendingCount = () => {
        renderPending( elementIDs.countTodos );
    }

    //Cuando la funcion app se llama
    (() => {
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector( elementId ).append( app );
        displayTodos();
    })();

    //Referencias html
    const newDescriptionInput = document.querySelector( elementIDs.newTodoInput );
    const todoListUl = document.querySelector( elementIDs.TodoList );
    const clearCompletedButton = document.querySelector( elementIDs.clearCompleted );
    const filtersLis = document.querySelectorAll( elementIDs.todoFilters );


    //Listener
    newDescriptionInput.addEventListener( 'keyup', ( event ) => {
        if( event.keyCode !== 13 ) return
        if( event.target.value.trim().length === 0 ) return;

        todoStore.addTodo( event.target.value );
        displayTodos();
        event.target.value = '';
    } );

    todoListUl.addEventListener( 'click', ( event ) => {
        const element = event.target.closest( '[data-id]' );
        todoStore.toggleTodo( element.getAttribute( 'data-id' ) );

        displayTodos();
    } );

    todoListUl.addEventListener( 'click', ( event ) => {
        if( !event.target.classList.contains( 'destroy' ) ) return;
        
        const element = event.target.closest( '[data-id]' );
        todoStore.deleteTodo( element.getAttribute( 'data-id' ) );
        displayTodos();
    } );

    clearCompletedButton.addEventListener( 'click', () => {
        todoStore.deleteCompleted();
        displayTodos();
    } );

    filtersLis.forEach( filtroElement => {
        filtroElement.addEventListener( 'click', ( element ) => {
            filtersLis.forEach( el => el.classList.remove( 'selected' ) );
            element.target.classList.add( 'selected' );

            switch( element.target.text ) {
                case 'Todos':
                    todoStore.setFilter( filters.All );
                    break;
                case 'Pendientes':
                    todoStore.setFilter( filters.Pending );
                    break;
                case 'Completados':
                    todoStore.setFilter( filters.Completed )
                    break;        
            }

            displayTodos();

        } );
    } );

    


}