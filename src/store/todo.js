import {makeAutoObservable} from "mobx";
import axios from "axios";

class Todo {
    todos = [
        { id: 1, completed: true, title: "learn mobx1" },
        { id: 2, completed: true, title: "learn mobx2" },
        { id: 3, completed: true, title: "learn mobx3" },
        { id: 4, completed: true, title: "learn mobx4" }
    ];
    loading = false;
    error = null;
    constructor() {
        // deep -
        makeAutoObservable(this, {}, {deep: true});
    }
    add(todo) {
        this.todos.push(todo);
    }
    remove(id) {
        this.todos = this.todos.filter(todo => todo.id !== id);
    }
    completed(id) {
        this.todos = this.todos.map(todo => todo.id === id ? {...todo, completed: !todo.completed} : todo);
    }
    get total() {
        return this.todos.length;
    }
    async fetchTodo() {
        this.loading = true;
        try {
            const response = await axios.get("https://jsonplaceholder.typicode.com/todos?_limit=10");
            if(response.status !== 200) throw new Error("Ошибка при загрузке данных");
            this.todos = response.data;
            this.error = null;
        } catch (e) {
            this.error = e.message;
        } finally {
            this.loading = false;
        }
    }
}

export default new Todo();
