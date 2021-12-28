import axios from 'axios'
import prop from 'lodash/fp/prop'

const axiosInstance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api`,
    transformResponse: [].concat(
        axios.defaults.transformResponse,
        (data) => {
            if (!prop('success', data)) throw prop('error.message', data)
            return data.data
        }
    )
})

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`

    return config
})

export default axiosInstance
