import { Component } from "react"

export default class Charge extends Component{

    render(){
        //console.log(this.props);
        return(<div className="charge">
            
            <p>{this.props.charge.name}</p>
            <p className="price">${this.props.charge.amount}</p>
            <div className="btns">
                <button onClick={() => this.props.onEditFunc(this.props.charge)}>edit</button>
                <button onClick={() => this.props.onDeleteFunc(this.props.charge)}>delete</button>
            </div>
        </div>);
    }
}