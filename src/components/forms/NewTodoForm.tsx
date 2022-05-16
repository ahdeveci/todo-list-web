import {
    Autocomplete,
    Box,
    Button,
    createFilterOptions,
    Grid,
    Paper,
    Rating,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import {TodoModel} from "../../data/models/todo.model";
import {ChangeEvent, Fragment, ReactEventHandler, SyntheticEvent, useEffect, useState} from "react";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import {useTodoActions} from "../../data/actions/todo.actions";
import {GroupsModel} from "../../data/models/groups.model";
import {CloseRounded} from "@mui/icons-material";
import {useGroupActions} from "../../data/actions/groups.actions";

const filter = createFilterOptions<any>();

const newTodo: TodoModel = {
    id: 0,
    todo: '',
    groupId: 0,
    priority: 1,
    status: 0,
    dueDate: '',
    groupName: ''
}

interface OwnProps {
    newTodoFormHandleChange: any;
    editingTodo: TodoModel | null;
}

const NewTodoForm: React.FC<OwnProps> = (children: OwnProps) => {

    const {newTodoFormHandleChange, editingTodo} = children;
    const todoActions = useTodoActions();
    const groupActions = useGroupActions();
    const [todo, setTodo] = useState<TodoModel>(newTodo);
    const [groupValue, setGroupValue] = useState<GroupsModel | null>(null);
    const [groups, setGroups] = useState<GroupsModel[] | any[] >([{groupName: 'test için', id: 11}]);
    const [dateValue, setDateValue] = useState<Date | null>(new Date());

    const inputChangeHandler = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        event.preventDefault();
        setTodo({...todo, [event.target.name]: event.target.value});
    }

    const getGroups = () => {
        groupActions.getGroups(null).then((result: any) => {
            if (result.status) {
                setGroups(result.data);
            }
        })
    }
    useEffect(() => {
        getGroups();
        if (editingTodo) {
            setTodo(editingTodo);
            setGroupValue({groupName: editingTodo.groupName, id: editingTodo.groupId});
        }
    }, [])


    const submitForm = (event: any) => {
        event.preventDefault();
        const tempTodo: any = Object.assign({}, todo);
        if (tempTodo.groupId === 0) {
            tempTodo['groupData'] = groupValue;
        }

        if (!!!dateValue) {
            return;
        }
        if (tempTodo.groupId === 0 && !!!groupValue) {
            return;
        }
        if (tempTodo.dueDate === '') {
            tempTodo.dueDate = dateValue.toISOString();
        }
        if (tempTodo.id > 0) {
            console.log('here=>')
            todoActions.updateTodo(tempTodo).then(result => {
                console.log('todo result=>', result);
                clearForm();
                newTodoFormHandleChange(true);
            });
        } else {
            todoActions.addTodo(tempTodo).then(result => {
                clearForm();
                newTodoFormHandleChange(true);
            });
        }

    }

    const clearForm = () => {
        setTodo(newTodo);
        setGroupValue(null);
        setDateValue(null);
    }

    const dateTimeHandleChange = (newValue: Date | null) => {
        if (newValue) {
            setDateValue(newValue);
            setTodo({...todo, dueDate: newValue.toISOString()});
        }
    }

    const rateChangeHandle = (event: SyntheticEvent, newValue: number | null) => {
        event.preventDefault();
        if (newValue) {
            setTodo({...todo, priority: newValue});
        }
    }

    const groupHandleChange = (event: any, newValue: GroupsModel | any) => {
        event.preventDefault();
        if (typeof newValue === 'string') {
            setGroupValue({
                groupName: newValue,
                id: 0
            });

        } else if (newValue && newValue.inputValue) {
            setGroupValue({
                groupName: newValue.inputValue,
                id: 0
            });
            setTodo({...todo, groupId: 0})
        } else {
            setGroupValue(newValue);
            setTodo({...todo, groupId: newValue ? newValue.id : 0})
        }
    }

    const renderOption = (props: any, option: any) => {
        if (props.id.includes('todo-group-list')) {
            return <li {...props}>{option.groupName}</li>
        }
    }

    return (
        <Paper
            sx={{
                p: 3,
                margin: 'auto',
                mt: 4,
                maxWidth: 800,
                flexGrow: 1,
            }}
        >
            <Grid container>
                <Box sx={{margin: 'auto', width: '100%'}}>
                    <form onSubmit={submitForm}>

                        <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                            <Typography sx={{ fontSize: 19, fontWeight: '800' }} color="text.primary" gutterBottom>
                                Add New Todo
                            </Typography>
                            <CloseRounded sx={{cursor: 'pointer'}} onClick={() => {newTodoFormHandleChange(true);}}/>
                        </Box>

                        <TextField
                            sx={{mt: 4, width: '100%'}}
                            required
                            id="todo"
                            multiline={true}
                            minRows={2}
                            label="To Do"
                            type="text"
                            fullWidth={true}
                            name="todo"
                            value={todo.todo}
                            onChange={inputChangeHandler}
                        />
                        <Box sx={{display: 'flex', flexWrap: 'wrap'}}>
                            <Autocomplete
                                value={groupValue}
                                onChange={groupHandleChange}
                                filterOptions={(options, params) => {
                                    const filtered = filter(options, params);

                                    const { inputValue } = params;
                                    // Suggest the creation of a new value
                                    const isExisting = options.some((option) => inputValue === option.groupName);
                                    if (inputValue !== '' && !isExisting) {
                                        filtered.push({
                                            inputValue,
                                            groupName: `Add "${inputValue}"`,
                                        });
                                    }

                                    return filtered;
                                }}
                                selectOnFocus
                                clearOnBlur
                                handleHomeEndKeys
                                id="todo-group-list"
                                options={groups}
                                getOptionLabel={(option) => {
                                    if (typeof option === 'string') {
                                        return option;
                                    }
                                    if (option.inputValue) {
                                        return option.inputValue;
                                    }
                                    return option.groupName;
                                }}
                                renderOption={renderOption}
                                sx={{ flex: { xs: '100%', md: '45%' }, mt: 4}}
                                freeSolo
                                renderInput={(params) => (
                                    <TextField required {...params} label="To Do Group" />
                                )}

                            />

                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <Stack spacing={3} sx={{ flex: { xs: '100%', md: '45%' }, mt: 4}}>
                                    <DateTimePicker
                                        label="Due Date"
                                        value={dateValue}
                                        onChange={dateTimeHandleChange}
                                        minDate={new Date()}
                                        minTime={new Date(0, 0, 0, 0)}
                                        renderInput={(params: any) => <TextField required {...params}/>}
                                    />
                                </Stack>
                            </LocalizationProvider>
                        </Box>
                        <Box sx={{mt: 4}}>
                            <Typography>
                                Priority
                            </Typography>
                            <Rating name="customized-10" defaultValue={1} max={5}  onChange={rateChangeHandle} value={todo.priority}/>
                        </Box>

                        <Button type="submit" sx={{width: '100%', mt: 4}} variant="contained">Add</Button>
                        <Button type="button" sx={{width: '100%', mt: 2}} variant="outlined" onClick={clearForm}>Reset</Button>
                    </form>
                </Box>
            </Grid>
        </Paper>
    )
}

export default NewTodoForm;