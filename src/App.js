import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import GroupedButtons from "./counter";
//import TextField from '@material-ui/core/TextField';
import './App.css';

class App extends React.Component {
  state = { 
    counter: 0,
    selectedItem : '',
    disable: false, 
    transaction:[],
    totalTransaction:[],
    viewTransaction:[],
    total:0
  };
  
  createData(item, price, quantity, total, action) {
    return { item, price, quantity, total, action };
  }
  
  getTotal = (language,row) =>{
    
    this.rows = this.rows.map(p =>
      p.item === row.item
        ? { ...p, quantity: language,total: language * row.price }
        : p
    );
    this.setState({counter: language,selectedItem: row.item});
   
  }
  addToCart = (row) =>{
    if(row.quantity===0){return}
    var isInArray = this.state.transaction.find(function(el){ return el.item === row.item }) !== undefined;
    var newTransaction = this.state.transaction;
    if(isInArray){
      var objIndex = newTransaction.findIndex((obj => obj.item === row.item));
      newTransaction[objIndex].quantity = row.quantity + newTransaction[objIndex].quantity;
      newTransaction[objIndex].total = row.total + newTransaction[objIndex].total;
    }
    else{
    newTransaction.push(row);
    }
    const total = newTransaction.reduce((prev,next) => prev + next.total,0);
    this.setState({transaction:newTransaction});
    this.setState({total:total});
  }
  removeToCart = (row) =>{
    var newTransaction = this.state.transaction;
    var objIndex = newTransaction.findIndex((obj => obj.item === row.item));
    newTransaction.splice(objIndex, 1);
    const total = newTransaction.reduce((prev,next) => prev + next.total,0);
    this.setState({transaction:newTransaction,total:total});
  }
  submitOrder = () =>{
    if(this.state.transaction.length!==0){
    var newMyTransaction = this.state.totalTransaction;
    newMyTransaction.push(this.state.transaction);
    this.setState({totalTransaction:newMyTransaction, transaction:[],total:0});
   }
  }
  cancelTransaction = (row,index) =>{
    var newTransaction = this.state.totalTransaction;
    newTransaction.splice(index, 1);
    this.setState({totalTransaction:newTransaction});
   }
   viewTransaction = (row,index) =>{
    //var viewTrans = row[index];
    this.setState({viewTransaction:row});
   }
   handleFormChange(e) {
    /**
     * This let's us change arbitrarily nested objects with one pass
     */
    console.log(e.target)
    
  }
/*
  handleNoteSubmit(e) {
    e.preventDefault();

    const { 
      //defaultNote, 
      taskStore, 
      loggedInUser, 
      //dispatch, 
      match 
    } = this.props;

    var noteComment = {...this.state.note};

    const selectedTask = taskStore.selected.getItem();

    noteComment._flow = selectedTask._flow;
    noteComment._user = loggedInUser._id;
    noteComment._task = match.params.taskId;

  }
  */
  rows = [
    this.createData('Pancake', 159, 0, 0, 0),
    this.createData('Chocolate', 237, 0, 0, 0),
    this.createData('IceCream', 262, 0, 0, 0),
    this.createData('Cupcake', 305, 0, 0, 0),
    this.createData('Flan', 356, 0, 0, 0),
  ];
  render() {
    
  return (
    <div className="App">
      <header className="App-header">
        <p>
          React Market Order System
        </p>
      </header>
       
        
        <div className="main-panel">
          <div className="summary-details">
              <h3>My Transactions</h3>
              {this.state.totalTransaction.map((row,index) => (
                <>
                    <p>
                      Transaction {index + 1}
                    </p>
                    <Button
                      variant="contained" 
                      color="primary"
                      size="small"
                      onClick={ () => this.viewTransaction( row,index ) }
                    >View</Button>
                    <Button
                      variant="contained" 
                      color="secondary"
                      size="small"
                      onClick={ () => this.cancelTransaction( row,index ) }
                    >Cancel</Button>
                </>
              ))}
          </div>
          <div className="table-area">
            <TableContainer component={Paper}>
              <Table  aria-label="simple table">
                <TableHead key={'column'}>
                  <TableRow >
                    
                    <TableCell align="center">Name</TableCell>
                    <TableCell align="center" width="120px"> Amount($) </TableCell>
                    <TableCell align="center">Quantity</TableCell>
                    <TableCell align="center">Total</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.rows.map((row) => (
                    <TableRow key={row.item}>
                        <TableCell component="th" scope="row">
                          {row.item}
                        </TableCell>
                        <TableCell align="center">{row.price}</TableCell>
                        <TableCell align="center">{<GroupedButtons getCounter={ ( value ) => this.getTotal( value,row ) }/>}</TableCell>
                        <TableCell align="center">{row.total}</TableCell>
                        <TableCell align="center">
                          {
                            <Button
                              variant="contained" 
                              color="primary"
                              onClick={ () => this.addToCart( row ) }
                            >Add</Button>
                          }
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
            <div className="summary-details">
            <h3>My Cart</h3>                         
              {this.state.transaction.map((row) => (
                <>
                    <p>
                      {row.item} {row.quantity}
                    </p>
                    <Button
                      variant="contained" 
                      color="secondary"
                      size="small"
                      onClick={ () => this.removeToCart( row ) }
                    >Remove to Cart</Button>
                    </>
                    ))}
            </div>
            <div className="summary-details">
            <h3>Order Summary</h3>
              <p>Total: {this.state.total} $</p>
              {
              <Button
                      variant="contained" 
                      color="primary"
                      size="small"
                      onClick={ () => this.submitOrder() }
              >Submit Order</Button>
            }
            </div>
          </div>
          <div className="bottom-panel">
            <h1>View Transactions</h1>
            
            {this.state.viewTransaction.map((row) => (
                <>
                    <p>
                      {row.item} {row.quantity}
                    </p>
                    </>
            ))}
            <p>Total {this.state.viewTransaction.reduce((prev,next) => prev + next.total,0)} $</p>
          </div>
        </div>
     
    )
  }
}

export default App;
