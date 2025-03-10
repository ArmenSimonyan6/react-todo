import axios from "axios";

class Api {
    static async getPosts(){
        try {
            const response = await axios.get(`https://jsonplaceholder.typicode.com/todos?_limit=10`)
            return response.data
        } catch (error) {
            console.log(error);
        }
    }
}

export default Api