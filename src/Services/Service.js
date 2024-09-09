class Service {
  // функція getData, інші функції допоміжні, як у спотіфаї

  _URL_ = "http://localhost:3001";

  ACTIONS_LINKS = {
    USERS: "users",
    POSTS: "posts",
    COMMENTS: "comments",
  };

  getData = async (endpointValue) => {

    const url = `${this._URL_}/${endpointValue}`;

    const response = fetch(url)

      .then((response) => response.json())

      .catch((error) => console.log(error));

    return await response;
  };

  getUsers = async () => {
    return await this.getData(this.ACTIONS_LINKS.USERS);
  };

  getUser = async (userId) => {
    return await this.getData(`${this.ACTIONS_LINKS.USERS}/?id=${userId}`);
  };

  addUser = async (userData) => {
    fetch(`${this._URL_}/${this.ACTIONS_LINKS.USERS}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(userData)
    })
  }

  addPost = async (postData) => {
    // @todo turn fully to adding post
    fetch(`${this._URL_}/${this.ACTIONS_LINKS.POSTS}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(postData)
    })
  }

  getPosts = async () => {
    return await this.getData(this.ACTIONS_LINKS.POSTS);
  };

  getUserFavourtiePosts = async (userID) => {
    const posts = await this.getPosts()
    const favPosts = posts.filter(post => post.favourites.includes(userID))
    return favPosts
  };

  getPost = async (postId) => {
    return await this.getData(`${this.ACTIONS_LINKS.POSTS}/?id=${postId}`);
  };

  getComments = async () => {
    return await this.getData(this.ACTIONS_LINKS.COMMENTS);
  };
  
  putData = async (data) => {
  
    const options = {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(data)
    }
  
    const url = `${this._URL_}/${data.dataType}/${data.id}`;
  
    fetch(url, options)
      .then(response => response.json())
      // .then(data => console.log(data)) 
      .catch(err => console.log(err))
  }
  // @todo put favourite somehow + написати все на стрічках в дб
}





export default Service;
