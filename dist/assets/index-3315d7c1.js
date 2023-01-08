(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))d(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const u of n.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&d(u)}).observe(document,{childList:!0,subtree:!0});function i(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerpolicy&&(n.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?n.credentials="include":o.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function d(o){if(o.ep)return;o.ep=!0;const n=i(o);fetch(o.href,n)}})();const L=`<section class="todoapp">\r
    <header class="header">\r
        <h1>Tareas</h1>\r
        <input id="new-todo-input" class="new-todo" placeholder="¿Qué necesita ser hecho?" autofocus>\r
    </header>\r
    \r
    <!-- This section should be hidden by default and shown when there are todos -->\r
    <section class="main">\r
        <input id="toggle-all" class="toggle-all" type="checkbox">\r
        <label for="toggle-all">Mark all as complete</label>\r
        <ul class="todo-list">\r
            <!-- These are here just to show the structure of the list items -->\r
            <!-- List items should get the class "editing" when editing and "completed" when marked as completed -->\r
            <!-- <li class="completed" data-id="abc">\r
                <div class="view">\r
                    <input class="toggle" type="checkbox" checked>\r
                    <label>Probar JavaScript</label>\r
                    <button class="destroy"></button>\r
                </div>\r
                <input class="edit" value="Create a TodoMVC template">\r
            </li> -->\r
            <!-- <li>\r
                <div class="view">\r
                    <input class="toggle" type="checkbox">\r
                    <label>Comprar un unicornio</label>\r
                    <button class="destroy"></button>\r
                </div>\r
                <input class="edit" value="Rule the web">\r
            </li> -->\r
        </ul>\r
    </section>\r
\r
    <!-- This footer should hidden by default and shown when there are todos -->\r
    <footer class="footer">\r
        <!-- This should be "0 items left" by default -->\r
        <span class="todo-count"><strong id="pending-count">0</strong> pendiente(s)</span>\r
        <!-- Remove this if you don't implement routing -->\r
        <ul class="filters">\r
            <li>\r
                <a class="selected filtro" class="selected" href="#/">Todos</a>\r
            </li>\r
            <li>\r
                <a class="filtro" href="#/active">Pendientes</a>\r
            </li>\r
            <li>\r
                <a class="filtro" href="#/completed">Completados</a>\r
            </li>\r
        </ul>\r
        <!-- Hidden if no completed items are left ↓ -->\r
        <button class="clear-completed">Borrar completados</button>\r
    </footer>\r
</section>\r
\r
\r
<footer class="info">\r
    <p>Template creado por <a href="http://sindresorhus.com">Sindre Sorhus</a></p>\r
    <!-- Change this out with your name and url ↓ -->\r
    <p>Creado por <a href="http://todomvc.com">ti</a></p>\r
    <p>Parte de <a href="http://todomvc.com">TodoMVC</a></p>\r
</footer>`;let f;const S=new Uint8Array(16);function C(){if(!f&&(f=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!f))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return f(S)}const r=[];for(let e=0;e<256;++e)r.push((e+256).toString(16).slice(1));function E(e,t=0){return(r[e[t+0]]+r[e[t+1]]+r[e[t+2]]+r[e[t+3]]+"-"+r[e[t+4]]+r[e[t+5]]+"-"+r[e[t+6]]+r[e[t+7]]+"-"+r[e[t+8]]+r[e[t+9]]+"-"+r[e[t+10]]+r[e[t+11]]+r[e[t+12]]+r[e[t+13]]+r[e[t+14]]+r[e[t+15]]).toLowerCase()}const k=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),b={randomUUID:k};function A(e,t,i){if(b.randomUUID&&!t&&!e)return b.randomUUID();e=e||{};const d=e.random||(e.rng||C)();if(d[6]=d[6]&15|64,d[8]=d[8]&63|128,t){i=i||0;for(let o=0;o<16;++o)t[i+o]=d[o];return t}return E(d)}class w{constructor(t){this.id=A(),this.description=t,this.done=!1,this.createdAt=new Date}}const a={All:"all",Completed:"completed",Pending:"pending"},l={todos:[new w("Piedra de cookie"),new w("Piedra de mota")],filter:a.All},P=()=>{T(),console.log("InitStore 🥑")},T=()=>{if(!localStorage.getItem("state"))return;const{todos:e=[],filter:t=a.All}=JSON.parse(localStorage.getItem("state"));l.todos=e,l.filter=t},g=()=>{localStorage.setItem("state",JSON.stringify(l))},q=(e=a.All)=>{switch(e){case a.All:return[...l.todos];case a.Completed:return l.todos.filter(t=>t.done);case a.Pending:return l.todos.filter(t=>!t.done);default:throw new Error(`Option ${e} is not valid`)}},I=e=>{if(!e)throw new Error("Description is required");l.todos.push(new w(e)),g()},U=e=>{if(!e)throw new Error("todoId is required");l.todos=l.todos.map(t=>(t.id===e&&(t.done=!t.done),t)),g()},x=e=>{if(!e)throw new Error("todoId is required");l.todos=l.todos.filter(t=>t.id!==e),g()},D=()=>{l.todos=l.todos.filter(e=>!e.done),console.log(l.todos),g()},M=(e=a.All)=>{l.filter=e,g()},F=()=>l.filter,c={addTodo:I,deleteCompleted:D,deleteTodo:x,getCurrentFilter:F,getTodos:q,initStore:P,loadStore:T,setFilter:M,toggleTodo:U};let y;const O=e=>{if(y||(y=document.querySelector(e)),!y)throw new Error(`Element ${e} not found`);y.innerHTML=c.getTodos(a.Pending).length},H=e=>{if(!e)throw new Error("A TODO is required");const{description:t,done:i,id:d}=e,o=`
        <div class="view">
            <input class="toggle" type="checkbox" ${i?"checked":""}>
            <label>${t}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a MVC template">  
    `,n=document.createElement("li");return n.setAttribute("data-id",d),i&&n.classList.add("completed"),n.innerHTML=o,n};let h;const V=(e,t=[])=>{if(h||(h=document.querySelector(e)),!h)throw new Error(`Element ${e} not found`);h.innerHTML="",t.forEach(i=>{h.append(H(i))})},m={TodoList:".todo-list",newTodoInput:"#new-todo-input",clearCompleted:".clear-completed",todoFilters:".filtro",countTodos:"#pending-count"},R=e=>{const t=()=>{const s=c.getTodos(c.getCurrentFilter());V(m.TodoList,s),i()},i=()=>{O(m.countTodos)};(()=>{const s=document.createElement("div");s.innerHTML=L,document.querySelector(e).append(s),t()})();const d=document.querySelector(m.newTodoInput),o=document.querySelector(m.TodoList),n=document.querySelector(m.clearCompleted),u=document.querySelectorAll(m.todoFilters);d.addEventListener("keyup",s=>{s.keyCode===13&&s.target.value.trim().length!==0&&(c.addTodo(s.target.value),t(),s.target.value="")}),o.addEventListener("click",s=>{const p=s.target.closest("[data-id]");c.toggleTodo(p.getAttribute("data-id")),t()}),o.addEventListener("click",s=>{if(!s.target.classList.contains("destroy"))return;const p=s.target.closest("[data-id]");c.deleteTodo(p.getAttribute("data-id")),t()}),n.addEventListener("click",()=>{c.deleteCompleted(),t()}),u.forEach(s=>{s.addEventListener("click",p=>{switch(u.forEach(v=>v.classList.remove("selected")),p.target.classList.add("selected"),p.target.text){case"Todos":c.setFilter(a.All);break;case"Pendientes":c.setFilter(a.Pending);break;case"Completados":c.setFilter(a.Completed);break}t()})})};c.initStore();R("#app");
