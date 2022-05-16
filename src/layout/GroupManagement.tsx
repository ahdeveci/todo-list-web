import {Box, Button, Grid, Paper, TextField, Typography} from "@mui/material";
import {
    AddRounded,
    CancelOutlined,
    CheckCircleOutline,
    DeleteOutlined,
    EditOutlined
} from "@mui/icons-material";
import {useGroupActions} from "../data/actions/groups.actions";
import {ChangeEvent,  useEffect, useState} from "react";
import {GroupsModel} from "../data/models/groups.model";

const GroupManagement: React.FC = () => {

    const groupActions = useGroupActions();
    const [groupList, setGroupList] = useState<GroupsModel[]>([]);
    const [editingGroup, setEditingGroup] = useState<GroupsModel | null>(null);
    const [addNewGroup, setAddNewGroup] = useState<boolean>(false);

    useEffect(() => {
        getGroups();
    }, []);

    const getGroups = () => {
        groupActions.getGroups(null).then((result: any) => {
            if (result.status) {
                setGroupList(result.data);
            }
        })
    }

    const groupHandleResponse = (group: GroupsModel, eventType: string) => {
        switch (eventType) {
            case 'onEdit':
                setEditingGroup(group);
                break;
            case 'onDelete':
                console.log('deleting=>', group.id);
                groupActions.deleteGroup(group.id).then((result: any) => {
                   if (result.status) {
                       getGroups();
                   }
                });
                break;
            default:
                break;
        }
    }

    const sendEditedGroup = (event: any) => {
        if (editingGroup) {
            const fGroup = groupList.find(o => o.id === editingGroup.id);
            if (fGroup) {
                if (editingGroup?.groupName !== '' && fGroup.groupName !== editingGroup?.groupName) {
                    groupActions.updateGroup(editingGroup).then((result: any) => {
                        if (result.status) {
                            getGroups();
                        }
                        setEditingGroup(null);

                    })
                }
            } else {
                if (editingGroup?.groupName !== '') {
                    groupActions.addGroup(editingGroup).then((result: any) => {
                        if (result.status) {
                            getGroups();
                        }
                        setEditingGroup(null);
                        setAddNewGroup(false);
                    })
                }
            }
        }

    }

    const editGroupChangeHandler = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setEditingGroup((prevState: any) => {
            let groupName = prevState?.groupName;
            groupName = event.target.value;
            return {...prevState, groupName};
        });
    }

    const onAddNewGroup = (event: any) => {
        event.preventDefault();
        setEditingGroup({id: 0, groupName: ''});
        setAddNewGroup(true);
    }

    return(
        <>
            <Grid container sx={{margin: 'auto', mt:4, maxWidth: '800px'}}>
                <Button variant="contained" onClick={onAddNewGroup}><AddRounded/> Add New Group </Button>
            </Grid>
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

                    <Box sx={{margin: 'auto', width: '100%'}}>
                        <Typography sx={{ fontSize: 19, fontWeight: '800' }} color="text.primary" gutterBottom>
                            Group List
                        </Typography>
                    </Box>
                    <Box sx={{margin: 'auto', width: '100%'}}>
                        {
                            addNewGroup && editingGroup ?
                                <Box sx={{display: 'flex', justifyContent: 'space-between', minHeight: 70, alignItems: 'center'}}>
                                    <Box sx={{width: '100%', display: 'flex', alignItems: 'center'}}>
                                        <TextField
                                            sx={{mt: 4, width: '100%'}}
                                            required
                                            id="add-new-group"
                                            label="Edit Group Name"
                                            type="text"
                                            fullWidth={true}
                                            name="groupName"
                                            value={editingGroup.groupName}
                                            onChange={editGroupChangeHandler}
                                        />
                                    </Box>
                                    <Box sx={{ml: 5, display: 'flex'}}>
                                        <CheckCircleOutline sx={{ cursor: 'pointer'}} onClick={sendEditedGroup}/>
                                        <CancelOutlined sx={{ml: 1, cursor: 'pointer'}} onClick={() => setEditingGroup(null)}/>
                                    </Box>
                                </Box>
                                : ''
                        }
                        {groupList.map((group, i) => {
                            return(
                                <Box key={i} sx={{display: 'flex', justifyContent: 'space-between', minHeight: 70, alignItems: 'center'}}>
                                    <Box sx={{width: '100%', display: 'flex', alignItems: 'center'}}>
                                        {
                                            !editingGroup || group.id !== editingGroup.id ?
                                                <Typography  variant="subtitle1"  >{group.groupName}</Typography>
                                                :
                                                <TextField
                                                    sx={{mt: 4, width: '100%'}}
                                                    required
                                                    id="group"
                                                    label="Edit Group Name"
                                                    type="text"
                                                    fullWidth={true}
                                                    name="groupName"
                                                    value={editingGroup.groupName}
                                                    onChange={editGroupChangeHandler}
                                                />
                                        }
                                    </Box>
                                    <Box sx={{ml: 5, display: 'flex'}}>
                                        {
                                            !editingGroup || group.id !== editingGroup.id ?
                                                <>
                                                    <EditOutlined sx={{cursor: 'pointer'}} onClick={() => groupHandleResponse(group, 'onEdit')}/>
                                                    <DeleteOutlined sx={{ml: 1, cursor: 'pointer'}} onClick={() => groupHandleResponse(group, 'onDelete')}/>
                                                </>

                                            :
                                                <>
                                                    <CheckCircleOutline sx={{ cursor: 'pointer'}} onClick={sendEditedGroup}/>
                                                    <CancelOutlined sx={{ml: 1, cursor: 'pointer'}} onClick={() => setEditingGroup(null)}/>
                                                </>
                                        }


                                    </Box>
                                </Box>

                            )
                        })}
                    </Box>
                </Grid>
            </Paper>
        </>
    )

}

export default GroupManagement;