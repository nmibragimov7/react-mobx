import React, {useEffect, useMemo, useState} from 'react';
import {observer} from "mobx-react-lite";

import Todo from "../components/common/Todo/Todo";
import Filter from "../components/common/Filter/Filter";
import Sidebar from "../components/common/Sidebar/Sidebar";
import BaseInput from "../components/base/BaseInput/BaseInput";
import todoStore from "../store/todo";
import filterStore from "../store/filter";

const Todos = observer(() => {
    const todos = todoStore.todos;
    const filter = filterStore.filter;
    const [shown, setShown] = useState(false);
    const [value, setValue] = useState("");
    const [filteredTodos, setFilteredTodos] = useState([]);
    // const filteredTodos = useMemo(() => {
    //     switch (filterStore.filter) {
    //         case "completed":
    //             return todoStore.todos.filter(todo => todo.completed);
    //         case "uncompleted":
    //             return todoStore.todos.filter(todo => !todo.completed);
    //         default:
    //             return todoStore.todos;
    //     }
    // }, [todoStore.todos, filterStore.filter]);
    useEffect(() => {
        switch (filterStore.filter) {
            case "completed":
                setFilteredTodos(todoStore.todos.filter(todo => todo.completed));
                break;
            case "uncompleted":
                setFilteredTodos(todoStore.todos.filter(todo => !todo.completed));
                break;
            default:
                setFilteredTodos(todoStore.todos);
        }
    }, [filter, todos]);
    const fetchTodos = async () => {
        await todoStore.fetchTodo();
    }
    const onChange = (e) => {
        setValue(e.target.value);
    }
    const addTodo = () => {
        todoStore.add({
            id: todoStore.todos.length + 1,
            title: value,
            completed: false
        });
        setShown(false);
        setValue("");
    }

    return (
        <>
            <div className={"py-8"}>
                <Filter/>
                <div className={"flex justify-center"}>
                    <button disabled={todoStore.loading} className={"!bg-gray-100 !text-dark max-w-xs mx-auto mb-8"}
                            onClick={fetchTodos}>
                        {!todoStore.error ? "Get todos" : todoStore.error}
                    </button>
                </div>
                <div className={"flex flex-col gap-2 max-w-md mx-auto"}>
                    {filteredTodos.map((todo) => (<Todo key={todo.id} item={todo}/>))}
                </div>
            </div>
            <div className={"w-full h-px bg-gray-100"}/>
            <div className={"max-w-3xl mx-auto min-h-[50vh] py-8 flex flex-col items-center"}>
                <div className={"text-center font-bold text-dark mb-4"}>Total todos: {filteredTodos.length}</div>
                <button className={"mb-8 max-w-xs !bg-green !text-white"} onClick={() => setShown(true)}>Add todo
                </button>
            </div>
            <Sidebar shown={shown} setState={setShown}>
                <BaseInput name={"todo"} value={value} placeholder={"type here..."} onChange={onChange}/>
                <button disabled={todoStore.loading} onClick={addTodo}>
                    Add
                </button>
            </Sidebar>
        </>
    );
});

export default Todos;
