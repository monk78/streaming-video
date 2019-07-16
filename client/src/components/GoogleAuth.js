import React from 'react';
import { connect } from 'react-redux';
import {signIn,signOut} from '../actions';
class GoogleAuth extends React.Component{
   // state=({isSignedIn:null});
    componentDidMount(){
        window.gapi.load('client:auth2',()=>{
            window.gapi.client.init({
                clientId: '511376095685-6rllaot1bpqr858p1mk95dequ6m3g1m6.apps.googleusercontent.com',
                scope: 'email'
        
        }).then(()=>{
            this.auth=window.gapi.auth2.getAuthInstance();
          // this.setState({isSignedIn: this.auth.isSignedIn.get()})
          this.onAuthChange(this.auth.isSignedIn.get()); 
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
    }

    onAuthChange = isSignedIn=> {
        if(isSignedIn){
            this.props.signIn(this.auth.currentUser.get().getId());
        }
        else{
            this.props.signOut();
        }
        // this.setState({isSignedIn:this.auth.isSignedIn.get()});
    };
    OnSignInClick = () =>{
        this.auth.signIn();
    } ;   
    OnSignOutClick = () =>{
        this.auth.signOut();
    };



    renderAuthButton(){
        if(this.props.isSignedIn===null){
            return null;
        }
        else if(this.props.isSignedIn){
            return (
                <button onClick={this.OnSignOutClick} className="ui red google button">
                    <i className="google icon" />
                    Sign Out
                </button>
            );

        }
        else{
            return(
                <button onClick={this.OnSignInClick} className="ui red google button">
                    <i className="google icon" />
                    SignIn
                </button>
            );

        }
    }
render(){
    return <div>{this.renderAuthButton()}</div>;
    
}
}

const mapToProps=(state)=>{
    return {isSignedIn:state.auth.isSignedIn};
};

export default connect(mapToProps,{signIn,signOut})(GoogleAuth);