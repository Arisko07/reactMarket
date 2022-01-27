import React from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

class GroupedButtons extends React.Component {
  state = { counter: 0 };
  getCounter(){
    console.log("sampel");
    return this.state.counter;
  }
  handleIncrement = () => {
    this.setState(state => ({ counter: state.counter + 1 }));
    this.props.getCounter(this.state.counter+1);
  };

  handleDecrement = () => {
    this.setState(state => ({ counter: state.counter - 1 }));
    this.props.getCounter(this.state.counter-1);
  };
  
  render() {
    const displayCounter = this.state.counter > 0;

    return (
      <ButtonGroup size="small" aria-label="small outlined button group">
        {displayCounter && <Button onClick={this.handleDecrement}>-</Button>}
        {displayCounter && <Button disabled>{this.state.counter}</Button>}
        <Button onClick={this.handleIncrement}>+</Button>
      </ButtonGroup>
    );
  }
}

export default GroupedButtons;
