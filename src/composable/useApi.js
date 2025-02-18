import axios from 'axios'
// import {useUserStore} from "../stores/userSession";
import router from "@/router";

const backend_url = import.meta.env.VITE_BACKEND_URL
let lastRequestTime = null

export const api = axios.create({
    withCredentials: false,
    baseURL: backend_url,
    headers: {
        // 'Authorization': 'Bearer ' + localStorage.getItem('token'),
        "Allow-Control-Allow-Origin": "*",
        'X-Requested-With': 'XMLHttpRequest',
        'Accept': '*/*',
        'Access-Control-Allow-Methods': ' GET, POST, PATCH, PUT, DELETE, OPTIONS',
    }
})

// api.interceptors.request.use((config) => {
//     const userSession = useUserStore()
//
//     if (userSession.token) {
//         config.headers = {
//             ...config.headers,
//             Authorization: `Bearer ${userSession.token}`,
//         }
//     }
//     return config
// })

// api.interceptors.response.use(undefined, function (res) {
//
//     if (res.response.data.missing_setting_company) {
//         router.push({name: 'companies-settings-create'})
//         if (!lastRequestTime || (Date.now() - lastRequestTime) > 5000) {
//             alert(res.response.data.message)
//         }
//         lastRequestTime = Date.now();
//     }
//
//     if (res.response.data.policy_not_agreed) {
//         router.push({name: 'agree-policies'})
//         if (!lastRequestTime || (Date.now() - lastRequestTime) > 5000) {
//             alert(res.response.data.message)
//         }
//         lastRequestTime = Date.now();
//     }
//
//     switch (res.response.status) {
//         case 401:
//             router.replace({name: 'login'})
//             // window.location.href = "/login";
//             break;
//         case 419:
//             router.push({name: 'login'})
//             //window.location.href = "/login";
//             break;
//         case 400:
//             alert(res.response.data.message)
//             break;
//         case 403:
//             alert('Forbidden')
//             //window.location.href = "/403";
//             break;
//         case 422:
//             let text = '';
//             for (const value of Object.values(res.response.data.errors).concat()) {
//                 text += '\n ' + value;
//             }
//             alert(text)
//             break;
//         case 500:
//             alert('Server Error')
//             //window.location.href = "/500";
//             break;
//     }
// });

export async function get(path, data) {
    return await api.get(path, data);
}

export async function post(path, data, header) {
    return await api.post(path, data, header);
}

export async function patch(path, data) {
    return await api.patch(path, data);
}

export async function destroy(path) {
    return await api.delete(path);
}
