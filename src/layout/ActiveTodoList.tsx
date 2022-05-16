import NewTodoForm from "../components/forms/NewTodoForm";
import TodoList from "../components/lists/TodoList";
import {useTodoActions} from "../data/actions/todo.actions";
import {useEffect, useState} from "react";
import {TodoModel} from "../data/models/todo.model";
import {Button, Grid} from "@mui/material";
import {AddRounded, HdrPlusRounded, PlusOne} from "@mui/icons-material";

const ActiveTodoList: React.FC = () => {
    const todoActions = useTodoActions();
    const [todoList, setTodoList] = useState<TodoModel[]>([]);
    const [onBtnClicked, setOnBtnClicked] = useState(false);
    const [editingTodo, setEditingTodo] = useState<TodoModel | null>(null);
    useEffect(() => {
        getTodoList();
        setEditingTodo(null);
    }, []);

    const getTodoList = () => {
        todoActions.getTodos({status: 0}).then((todoResult: any) => {
            if (!!todoResult.status) {
                setTodoList(todoResult.data);
            }
        });
    }


    const handleTodoChange = (todo: TodoModel, type: string) => {
        switch (type) {
            case 'statusChanged':
                todoActions.setTodoStatus(todo.id, todo.status === 0 ? 1 : 0).then((result: any) => {
                    if (result.status) {
                        getTodoList();
                    }
                });
                break;
            case 'onEdit':
                setEditingTodo(todo);
                setOnBtnClicked(true);
                break;
            case 'onDelete':
                todoActions.deleteTodo(todo.id).then(result =>{
                   console.info('result');
                   getTodoList();
                });
                break;
            default:
                break;
        }

    }

    const newTodoHandleChange = (event: any) => {
        setOnBtnClicked(false);
        setEditingTodo(null);
        getTodoList();
    }

    return <>
        <Grid container sx={{margin: 'auto', mt:4, maxWidth: '800px'}}>
            <Button variant="contained" onClick={() => setOnBtnClicked(true)}><AddRounded/> Add New Todo</Button>
        </Grid>
        {
            onBtnClicked ?
                <NewTodoForm newTodoFormHandleChange={newTodoHandleChange} editingTodo={editingTodo}/>
                : ''
        }

        <TodoList todoList={todoList} title='Active To Do List' handleResponse={handleTodoChange}/>
    </>
}

export default ActiveTodoList