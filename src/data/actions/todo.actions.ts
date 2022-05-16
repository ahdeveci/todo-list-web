import {useFetchWrapper} from "../util/fetchWrapper";
import {TodoModel} from "../models/todo.model";

export {useTodoActions}
const useTodoActions = () => {
    const PUBLIC_URL = process.env.REACT_APP_API_URI;
    const fetchWrapper = useFetchWrapper();


    const getTodos = (filters: any) => {
        return new Promise(resolve => {
            let query = '';
            if (filters) {
                for (const key of Object.keys(filters)) {
                    query+=`&${key}=${filters[key]}`;
                }
            }
            query = query !== '' ? query.replace('&', '?') : query;
            fetchWrapper.get(`${PUBLIC_URL}/getTodos` + query)
                .then(response => {
                    resolve(response);
                });
        });
    }

    const addTodo = (todoData: TodoModel | any) => {
        return new Promise(resolve => {
            fetchWrapper.post(`${PUBLIC_URL}/addTodo`, {todoData})
                .then(response => {
                    resolve(response);
                });
        });
    }

    const updateTodo = (todoData: TodoModel | any) => {
        return new Promise(resolve => {
           fetchWrapper.put(`${PUBLIC_URL}/updateTodo`, {updateData: todoData})
               .then(response => {
                   console.log('update data=>', response);
                   resolve(response);
               });
        });
    }

    const deleteTodo = (todoId: number) => {
        return new Promise(resolve => {
            fetchWrapper.delete(`${PUBLIC_URL}/deleteTodo`, {todoId})
                .then(response => {
                    resolve(response);
                });
        });
    }

    const setTodoStatus = (todoId: number, status: number) => {
        return new Promise(resolve => {
            fetchWrapper.put(`${PUBLIC_URL}/setTodoStatus`, {todoId, status})
                .then(response => {
                    resolve(response);
                });
        });
    }

    return {getTodos, addTodo, updateTodo, deleteTodo, setTodoStatus};
}