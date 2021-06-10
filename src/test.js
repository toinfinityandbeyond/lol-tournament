
import React from "react"

class App extends React.Component{
 constructor(){


    this.state = {
        name: "",
        users: this.props.users,
        currentUser: this.props.currentUser,
        keyboard: false,
        nameUnique: false,
        ready: true,
        snackbarVisible: false,
        changes: false,
      }
 }
    
      
    componentDidMount(){
        Keyboard.addListener("keyboardWillShow", ()=> this.setState({keyboard: true}));
        Keyboard.addListener("keyboardWillHide", ()=> this.setState({keyboard: false}));
        
        const user = _.filter(this.state.users, (o) => o.assignmentInfo.cid == this.state.users[this.state.currrentUser].assignmentInfo.cid)[0]
        this.setState({name: user? user.name : ""})
      
    }
      
      
    UNSAFE_componentWillReceiveProps(newProps) {
      if (!_.isEqual(newProps.currentUser, this.state.currentUser)){
          this.setState({currentUser: newProps.currentUser});
      }

      if (!_.isEqual(newProps.users, this.state.users)){
        const user = _.filter(this.state.users, (o) => o.assignmentInfo.cid == this.state.users[this.state.currrentUser].assignmentInfo.cid)[0]
        this.setState({users: newProps.users, name: user? user.name : ""});
      }
      
      
    }
}

