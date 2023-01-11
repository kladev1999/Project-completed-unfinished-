import axios from 'axios'

const ROLE_BASE_REST_API_URL = 'http://localhost:8080/api/r1/roles';

class RoleService{

    getAllRoles(){
        return axios.get(ROLE_BASE_REST_API_URL)
    }

    createRole(role){
        return axios.post(ROLE_BASE_REST_API_URL, role)
    }

    getRoleById(roleId){
        return axios.get(ROLE_BASE_REST_API_URL + '/' + roleId);
    }

    updateRole(roleId, role){
        return axios.put(ROLE_BASE_REST_API_URL + '/' +roleId, role);
    }

    deleteRole(roleId){
        return axios.delete(ROLE_BASE_REST_API_URL + '/' + roleId);
    }
}

export default new RoleService();