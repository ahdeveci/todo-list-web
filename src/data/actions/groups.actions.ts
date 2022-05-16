import {useFetchWrapper} from "../util/fetchWrapper";
import {TodoModel} from "../models/todo.model";
import {GroupsModel} from "../models/groups.model";

export {useGroupActions};
const useGroupActions = () => {
    const PUBLIC_URL = process.env.REACT_APP_API_URI;
    const fetchWrapper = useFetchWrapper();

    const getGroups = (filters: any | null) => {
        return new Promise(resolve => {
            let query = '';
            if (filters) {
                for (const key of Object.keys(filters)) {
                    query+=`&${key}=${filters[key]}`;
                }
            }
            query = query !== '' ? query.replace('&', '?') : query;
            fetchWrapper.get(`${PUBLIC_URL}/getGroups` + query)
                .then(response => {
                    console.log('data=>', response);
                    resolve(response);
                });
        });
    }

    const addGroup = (groupData: GroupsModel | any) => {
        return new Promise(resolve => {
            fetchWrapper.post(`${PUBLIC_URL}/addGroup`, {groupData})
                .then(response => {
                    console.log('data=>', response);
                    resolve(response);
                });
        });
    }

    const updateGroup = (groupData: GroupsModel | any) => {
        return new Promise(resolve => {
            fetchWrapper.put(`${PUBLIC_URL}/updateGroup`, {updateData: groupData})
                .then(response => {
                    console.log('data=>', response);
                    resolve(response);
                });
        });
    }

    const deleteGroup = (groupId: number) => {
        return new Promise(resolve => {
            fetchWrapper.delete(`${PUBLIC_URL}/deleteGroup`, {groupId})
                .then(response => {
                    console.log('data=>', response);
                    resolve(response);
                });
        });
    }

    return{getGroups, addGroup, updateGroup, deleteGroup};
}