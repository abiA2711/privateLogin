import axios from "axios"

const baseUrl='http://localhost:3000';


export async function signup(username, email, password) {
    try {
      const response = await axios.post(
        `${baseUrl}/api/saveuser`,
        { username, email, password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data; 
    } catch (error) {
      console.error('Error during signup:', error);
      throw error; 
    }
  }

  export async function verify(username, email, password, otp) {
    try {
      const response = await axios.post(
        `${baseUrl}/api/verify`,
        { username, email, password, otp },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data
      // Check if the verification was successful
      
    } catch (error) {
      console.error('Error during verification:', error);
      throw error;
    }
  }

  export async function Login( email, password ) {
    try {
      const response = await axios.post(
        `${baseUrl}/api/login`,
        { email, password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data
      // Check if the verification was successful
      
    } catch (error) {
      console.error('Error during verification:', error);
      throw error;
    }
   
  }

  export async function getUserInfo(){
    try {
      const response = await axios.get(
        `${baseUrl}/api/getuserinfo`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem("authToken")
          },
        }
      );
      return response.data
      // Check if the verification was successful
      
    } catch (error) {
      console.error('Error during verification:', error);
      throw error;
    }
  }
