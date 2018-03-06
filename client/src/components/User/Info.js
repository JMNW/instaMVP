import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import actions from '../../Redux/actions/';

const mapDispatchToProps = dispatch => {
  return {
    updateUserInfo: about => dispatch(actions.updateUserInfo(about))
  }
};
const mapStateToProps = state => {
  return {
    userInfoState: state.userInfoState
  }
};

class Info extends React.Component {
  constructor (props) {
    super (props);
  }
  componentDidMount () {
    axios.get(`/info/Will`)
      .then(result => {
        this.props.updateUserInfo(result.data.about);
      });
  }
  render () {
    return (
      <div>
  
        {this.props.userInfoState}
      </div>
    );
  }
}

const InfoPage = connect(mapStateToProps, mapDispatchToProps)(Info);
export default InfoPage;
