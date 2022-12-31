import React,{Component} from 'react';
import Charge from './charge';
// import {fa-solid} from '@fortawesome/free-solid-svg-icons';
// import {fa-paper-plane-top} from '@fortawesome/free-solid-svg-icons';
// import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
export default class Budget extends Component{

    state={
        charges:[
        //     {
        //     id:0,
        //     name:"Rent",
        //     amount:"100"
        // },{
        //     id:1,
        //     name:"Car",
        //     amount:"4500"
        // }
    ],
        class:'hide',
        message:"",
        action:"submit",
        index:-1,
        total:0
        
    };

    render(){
        return(
            <div>
                <div className={this.state.class}>{this.state.message}</div>
                <div className='budget-cont'>
                <div className='infos'>
                <div className='form'>
                    <label>Charge</label>
                    <input id='name'type='text' placeholder='e.g.rent' />
                </div>
                <div className='form'>
                    <label>Amount</label>
                    <input id='amount' type='number' placeholder='e.g.100' />
                </div>
                </div>
                <button onClick={this.addCharge}>{this.state.action}</button>
                {this.state.charges.map((charge)=>{
                    return(<Charge key={charge.id} charge={charge} onEditFunc={this.onEditFunc} onDeleteFunc={this.onDeleteFunc} />);
                })}    
                
                <button onClick={this.allClear}>clear expenses</button>
            </div>
            <p className='total'>Total Spending : ${this.state.total}</p>
            </div>
            
        );
    }
    addCharge = () => {
        let myCharges=this.state.charges;
        let t = this.state.total;
        let chargeNameField = document.getElementById('name');
        let chargeAmountField = document.getElementById('amount');
        console.log(chargeNameField.value);
        if(chargeAmountField.value===""||chargeNameField===""){
            this.setState({
                message:"Charge can't Be Empty value and amount value has to be bigger than zero",
                class:"fail"
            });
            setInterval(()=>{
                this.setState({
                    class:"hide",
                });
            },3000);
            return ;
        }
        else if(this.state.index!==-1){
            let ancien = myCharges[this.state.index].amount;
            myCharges[this.state.index].name = chargeNameField.value;
            myCharges[this.state.index].amount = chargeAmountField.value;
            this.setState({
                charges:myCharges,
                message:"item edited",
                class:"succes",
                action:"submit",
                index:-1,
                total:t-(+ancien) + (+chargeAmountField.value)
            });
            setInterval(()=>{
                this.setState({
                    class:"hide"
                });
            },3000);
            return ;
        }
        myCharges.push({
            id:myCharges.length,
            name:chargeNameField.value,
            amount:chargeAmountField.value
        });
        this.setState({
            charges:myCharges,
            message:"item added",
            class:"succes",
            action:"submit",
            total:t+(+chargeAmountField.value)
        });
        setInterval(()=>{
            this.setState({
                class:"hide"
            });
        },3000);
    }
    allClear = ()=>{
        this.setState({
            charges:[],
            total:0
        });
    }
    onEditFunc = (Charge)=>{
        let myCharges = this.state.charges;
        let ind = myCharges.indexOf(Charge);
        document.getElementById('name').value=Charge.name;
        document.getElementById('amount').value=Charge.amount;
        this.setState({
            action:"edit",
            index:ind
        });

    }
    onDeleteFunc = (Charge)=>{
        let t = this.state.total;
        let myCharges = this.state.charges;
        let ind = myCharges.indexOf(Charge);
        let toDelete = this.state.charges[ind].amount;
        myCharges.splice(ind,1);
        this.setState({
            charges:myCharges,
            total:t-(+toDelete)
        });
    }
}