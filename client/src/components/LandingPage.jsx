import React from 'react';
import axios from 'axios';

class LandingPage extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      email: '',
      username: '',
      password: '',
      submitted: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.login = this.login.bind(this);
  }

  handleChange (e) {
    const { name, value } = e.target;
    this.setState({[name]: value});
    console.log(this.state);
  }
  
  login () {
    // axios.post('/login', );
    }


  render () {
    return (
      <div>
        <form id="sign-up">
          <input type="text" name="email" placeholder="Email" onChange={this.handleChange} />
          <input type="text" name="username" placeholder="Username" onChange={this.handleChange} />
          <input type="text" name="password" placeholder="Password" onChange={this.handleChange} />
          <input type="submit" value="Sign Up" onClick={this.login} />
        </form>
        <div>
          <p>Have an account? <a href="">Log in</a></p>
        </div>
      </div>
    );
  }
}

export default LandingPage;