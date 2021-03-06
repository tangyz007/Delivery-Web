import React, {Component} from 'react';
import Shipping from "./Shipping"

import {Steps, Button, message} from 'antd';
import Recommend from "./Recommend"
import {Link, Redirect, Route, Switch, withRouter} from "react-router-dom"
import Confirm from "./Confirm"
import Payment from "./Payment"
import SuccessPage from "./SuccessPage";

const {Step} = Steps;


class Processing extends Component {


    state = {
        current: 0,
        useraddress: '',
        step_one_fields: [],


    }
    prev = () => {
        const current = this.state.current - 1;
        this.setState({current});
    }

    next = () => {

        const current = this.state.current + 1;

        this.setState({current});
        // console.log(this.state.useraddress);
    }

    getStepOneValue = (values) => {
        // const { step_one_fields } = this.state;
        // step1data.step_one_fields.useraddress = values.useraddress;
        localStorage.setItem("user_name", values.username);
        localStorage.setItem("user_address", values.useraddress);
        localStorage.setItem("user_phone", values.userphone);
        localStorage.setItem("r_name", values.rname);
        localStorage.setItem("r_phone", values.rphone);
        localStorage.setItem("r_address", values.raddress);
        localStorage.setItem("size", values.size);
        localStorage.setItem("emergency", values.emergency);
        localStorage.setItem("weight", values.weight);


        this.setState({step_one_fields:{...values}});


    };

    getStepTwoValue = (values) => {
        console.log(values);
        // step1data.step_one_fields.useraddress = values.useraddress;
        // localStorage.setItem("useraddress",values.useraddress);
        // localStorage.setItem("raddress",values.raddress);
        this.setState({useraddress: values.useraddress});

        // this.setState({step_one_fields: {
        //         // ...step_one_fields,
        //         // ...values
        //     }}

        // localStorage.setItem("method",values.method);
        // localStorage.setItem("time",values.time);
        // localStorage.setItem("cost",values.cost);

    };

    steps = [
        {
            title: 'Step 1',
            content: <Shipping handleNextButton={this.next} submittedValues={this.getStepOneValue}/>,
            // content:<Shipping/>,
            description: "Please finish shipping information"
        },
        {
            title: 'Step 2',
            content: <Recommend address={this.state.step_one_fields} handlePrevButton={this.prev} handleNextButton={this.next}
                                submittedValues={this.getStepTwoValue}/>,
            description: 'Please choose one shipping method'
        },
        {
            title: 'Step 3',
            content: <Confirm  handlePrevButton={this.prev} handleNextButton={this.next}/>,
            description: 'Please confirm your order information'
        },
        {
            title: 'Step 4',
            content: <Payment handlePrevButton={this.prev} handleNextButton={this.next}/>,
            description: 'Please finish payment'
        },
        {
            title: 'Done',
            content: <SuccessPage />
            //     <div>
            //     <p>"Success! Your delivery robot is on the way!"</p>
            //     <>
            // </div>
        }
    ];


    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         current: 0,
    //         username: ''
    //     }
    // }


    render() {
        console.log("==> ", this.state.step_one_fields);
        const {current} = this.state;

        return (

            localStorage.getItem("userID") !== null ?
            <div>
                <Steps current={current} className="steps-bar">
                    {this.steps.map(item => (
                        <Step key={item.title} title={item.title} description={item.description}/>

                    ))}
                </Steps>
                <div className="steps-content">
                    {this.steps[current].content}
                    {/*<Switch>*/}
                    {/*    <Route path='/processing/shipping' component={Shipping}/>*/}
                    {/*    <Route path='/processing/recommend' component={Recommend}/>*/}
                    {/*    <Route path='/processing/confirm' component={Confirm}/>*/}
                    {/*    <Route path='/processing/pay' component={Payment}/>*/}
                    {/*    <Route path='/processing/details' component={OrderDetail}/>*/}
                    {/*</Switch>*/}
                </div>

            </div> : <Redirect to='/'/>
        );
    }
}

export default Processing;
export const step1data = {
    step_one_fields: {
        useraddress: '',
        raddress: ''
    }
};
export const globaldata = React.createContext(step1data.step_one_fields);

