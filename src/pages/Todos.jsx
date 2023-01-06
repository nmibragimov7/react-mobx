import React, {useMemo, useState} from 'react';
import {observer} from "mobx-react-lite";

import Todo from "../components/common/Todo/Todo";
import Filter from "../components/common/Filter/Filter";
import Sidebar from "../components/common/Sidebar/Sidebar";
import BaseInput from "../components/base/BaseInput/BaseInput";
import todo from "../store/todo";
import filter from "../store/filter";

const Todos = observer(() => {
    const [shown, setShown] = useState(false);
    const [value, setValue] = useState("");
    const filteredTodos = useMemo(() => {
        switch (filter.filter) {
            case "completed":
                return todo.todos.filter(todo => todo.completed);
            case "uncompleted":
                return todo.todos.filter(todo => !todo.completed);
            default:
                return todo.todos;
        }
    }, [filter.filter, todo.todos]);
    const fetchTodos = async () => {
        await todo.fetchTodo();
    }
    const onChange = (e) => {
        setValue(e.target.value);
    }
    const addTodo = () => {
        todo.add({
            id: todo.todos.length + 1,
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
                    <button disabled={todo.loading} className={"!bg-gray-100 !text-dark max-w-xs mx-auto mb-8"}
                            onClick={fetchTodos}>
                        {!todo.error ? "Get todos" : todo.error}
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
                <button disabled={todo.loading} onClick={addTodo}>
                    Add
                </button>
            </Sidebar>
        </>
    );
});

export default Todos;
