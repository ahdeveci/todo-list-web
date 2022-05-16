import {TodoModel} from "../../data/models/todo.model";
import {
    Box,
    Checkbox,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
    Rating,
    Select,
    SelectChangeEvent, TextField,
    Typography
} from "@mui/material";
import {
    CircleOutlined,
    CircleRounded, DeleteOutlined,
    EditOutlined,
} from "@mui/icons-material";
import { format } from "date-fns";
import {useEffect, useState} from "react";
import {GroupsModel} from "../../data/models/groups.model";
import {useGroupActions} from "../../data/actions/groups.actions";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {DesktopDatePicker} from "@mui/x-date-pickers";
import Divider from "@mui/material/Divider";

interface OwnProps {
    todoList: TodoModel[];
    title: string;
    handleResponse: any;
}
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const TodoList: React.FC<OwnProps> = (children) => {
    const {todoList, title, handleResponse} = children;
    const groupAction = useGroupActions();

    const [filter, setFilter] = useState<any | null>(null);
    const [groupList, setGroupList] = useState<GroupsModel[]>([]);
    const [filteredGroup, setFilteredGroup] = useState<string>('');
    const [filteredPriority, setFilteredPriority] = useState<string>('');
    const [dateRangeVal, setDateRangeVal] = useState<any | null>(null);

    useEffect(() => {
        groupAction.getGroups(null).then((results: any) => {
            if (results.status) {
                setGroupList(results.data);
            }
        });
    }, [])

    const filteredGroupHandleChange = (event: SelectChangeEvent) => {
        setFilteredGroup(event.target.value);
        setFilter({...filter, groupName: event.target.value});
    }

    const filteredPriorityHandleChange = (event: SelectChangeEvent) => {
        setFilteredPriority(event.target.value);
        setFilter({...filter, priority: Number(event.target.value)});
    }


    const dateRangeHandleChange = (newValue: Date | null) => {
        setDateRangeVal(newValue);
    }

    const filterFn = (t: any) => {
        if (filter) {
            for (const f in filter) {
                console.log(f);
                if (t[f] !== filter[f]) {
                    return false;
                }
            }
        }
        if (dateRangeVal) {
            const dueDate = new Date(t.dueDate);
            if (dateRangeVal > dueDate) {
                return false;
            }
        }

        return t;
    }

    return (
        <Paper
            sx={{
                p: 3,
                margin: 'auto',
                marginTop: '20px',
                maxWidth: 800,
                flexGrow: 1,
            }}
        >
            <Grid container>
                <Box sx={{margin: 'auto', width: '100%', display: 'flex', justifyContent: 'space-around'}}>
                    <Box sx={{flex: '30%', maxWidth: '30%'}}>
                        <InputLabel id="groupList-label">Filter By Group</InputLabel>
                        <Select
                            sx={{width: '100%'}}
                            labelId="groupList-label"
                            id="groupList"
                            label="Filter By Group"
                            value={filteredGroup}
                            onChange={filteredGroupHandleChange}
                        >
                            {groupList.map((group: GroupsModel, i: number) => {
                                return (
                                    <MenuItem key={i} value={group.groupName}>{group.groupName}</MenuItem>
                                )
                            })}
                        </Select>
                    </Box>
                    <Box sx={{flex: '30%', maxWidth: '30%'}}>
                        <InputLabel id="priority-label">Filter By Priority</InputLabel>
                        <Select
                            sx={{width: '100%'}}
                            labelId="priority-label"
                            id="priority"
                            label="Filter By Priority"
                            value={filteredPriority}
                            onChange={filteredPriorityHandleChange}
                        >
                            <MenuItem key={1} value={1}>
                                <Rating sx={{ml: 4}} name="read-only" value={1}  readOnly/>
                            </MenuItem>
                            <MenuItem key={2} value={2}>
                                <Rating sx={{ml: 4}} name="read-only" value={2}  readOnly/>
                            </MenuItem>
                            <MenuItem key={3} value={3}>
                                <Rating sx={{ml: 4}} name="read-only" value={3}  readOnly/>
                            </MenuItem>
                            <MenuItem key={4} value={4}>
                                <Rating sx={{ml: 4}} name="read-only" value={4}  readOnly/>
                            </MenuItem>
                            <MenuItem key={5} value={5}>
                                <Rating sx={{ml: 4}} name="read-only" value={5}  readOnly/>
                            </MenuItem>
                        </Select>
                    </Box>
                    <Box>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <InputLabel id="priority-label">Filter By Due Date</InputLabel>
                            <DesktopDatePicker
                                inputFormat="dd/MM/yyyy"
                                value={dateRangeVal}
                                onChange={dateRangeHandleChange}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </Box>
                </Box>
            </Grid>
            <Divider sx={{pt: 4}}/>
            <Grid container sx={{pt: 4}}>
                <Box sx={{margin: 'auto', width: '100%'}}>
                    <Typography sx={{ fontSize: 19, fontWeight: '800' }} color="text.primary" gutterBottom>
                        {title}
                    </Typography>
                </Box>
                <Box sx={{margin: 'auto', width: '100%'}}>
                    {todoList.filter(filterFn).map((todo, i) => {
                        return(
                            <div key={i}>
                                <Box sx={{width: '100%', display: 'flex', alignItems: 'center'}}>
                                    <Checkbox {...label} checked={todo.status === 1} icon={<CircleOutlined/>} checkedIcon={<CircleRounded/>} onClick={() => {handleResponse(todo, 'statusChanged')}} />
                                    <Typography  variant="subtitle1" sx={{textDecoration: (todo.status === 1 ? 'line-through':'none')}} >{todo.todo}</Typography>
                                </Box>
                                <Box sx={{ml: 5, display: 'flex'}}>
                                    <EditOutlined sx={{fontSize: '16px', cursor: 'pointer'}} onClick={() => handleResponse(todo, 'onEdit')}/>
                                    <DeleteOutlined sx={{fontSize: '16px', ml: 1, cursor: 'pointer'}} onClick={() => handleResponse(todo, 'onDelete')}/>
                                    <Typography variant="caption" display="block" sx={{ml: 2, fontWeight: '600'}} gutterBottom>{todo.groupName}</Typography>
                                    <Typography variant="caption" display="block" sx={{ml: 2}} gutterBottom>{format(new Date(todo.dueDate), "MMMM do, yyyy H:mm")}</Typography>
                                    <Rating sx={{ml: 4}} name="read-only" value={todo.priority}  size="small" readOnly/>
                                </Box>
                            </div>

                        )
                    })}
                </Box>
            </Grid>
        </Paper>
    )
}
export default TodoList;

//