import axios from "axios";

const url = "https://jsonplaceholder.typicode.com/todos"

const Api = {
    async getPosts(limit, page) {
        try {
            const response = await axios.get(`${url}`, {
                params: {
                    _limit: limit,
                    _page: page
                }
            })
            console.log(response);
            return response
        } catch (error) {
            console.log(error);
        }
    },

    async addPost(newPost){
        try {
            const response = await axios.post(`${url}`, newPost)
            console.log(response.data);
            return response.data
        } catch (error) {
            console.log(error);
            
        }
    },

    async deletePosts(id) {
        try {
            const response = await axios.delete(`${url}/${id}`)
            console.log(response.data);
            return response.data
        } catch (error) {
            console.log("Error deletePosts",error);
        }
    },

    async updatePost(id, updatedData) {
        try {
            const response = await axios.patch(`${url}/${id}`, updatedData);
            
            return response.data;
        } catch (error) {
            console.error("Error updatePost", error);
        }
    }
}

export default Api