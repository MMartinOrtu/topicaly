export class APIService {
    constructor() {
       this.baseUrl = process.env.API_URL;
    }

    async get(uri) {
      try {
        const response = await fetch(`${this.baseUrl}${uri}`);
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      } catch (error) {
        console.warn('Error', error);
        return { error };
      }
    }

    async post(body, uri) {
      try {
        const response = await fetch(`${this.baseUrl}${uri}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
        });
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return true;
      } catch (error) {
        console.warn('Error', error); 
        return { error };
      }
    }
  }
  

  