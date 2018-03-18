import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import Icon from 'react-icons-kit';
import { ic_mode_edit } from 'react-icons-kit/md/ic_mode_edit';
import { ic_delete } from 'react-icons-kit/md/ic_delete';    
// import index from 'react-icons-kit';

var ReactBsTable  = require('react-bootstrap-table');
var index;
var cancelIndex;
var cancelData;

var oldProduct;

const nameArray = ['Nick', 'Kevin', 'Steve', 'Maria', 'Toni', 'Hanna', 'Pekka', 'Lisa', 'Eero', 'Timo']
const emailArray = ['A@gmail.com', 'B@gmail.com', 'B@gmail.com', 'C@gmail.com', 'D@gmail.com',
 'E@gmail.com', 'F@gmail.com', 'G@gmail.com', 'H@gmail.com', 'I@gmail.com']
const phoneArray = ['0903957574', '0836658183', '0987653674', '0934568745',
    '0453563556', '0983466213', '0451234535', '04356742130', '0467543120', '0461275465']


var products = [{
      Name: 'Pekka',
      Email: "G@gmail.com",
      Phone: '0451234535'
  }, {
      Name: 'Kevin',
      Email: 'B@gmail.com',
      Phone: '0903957574'
  }, {
    Name: 'Maria',
    Email: "F@gmail.com",
    Phone: '0467543120',
}, {
    Name: 'Eero',
    Email: 'I@gmail.com',
    Phone: '0836658183'
}
];

var emptyData = [{
  Name: '' ,
  Email: '',
  Phone: ''
}

];

const selectRowProps = {
    clickToSelect: true, 
    clickToSelectAndEditCell: true, 
    mode: "radio", 
    className: "row-selected", 
    hideSelectColumn: true
  };

function editObject(row) {
    console.log('edit');

    index = products.indexOf(row);
    
    cancelIndex = index;
    //console.log(products[index]);
    cancelData = JSON.parse(JSON.stringify(products[index]));
    // index++;
    // buttonEditFormatter(index);
    const cellEditProp = {                
        mode: 'click',
        nonEditableRows: function() {
            console.log("cellEditProp: nonEditableRows()");
            var array= [];            
            for(var i = 0; i < (products.length); i++){
                if(i == (index)){
                    i++;
                }
                //console.log(i, index, products.length);
                array.push(i);
            }
            console.log(array);
            return array;            
         },         
    };

    function editableRow(cell, row) {
        if (products.indexOf(row) == index) return true;
        else return false;
    };

    ReactDOM.render(
        <div>
            <div id="addTable">
                <BootstrapTable data={emptyData} cellEdit={cellEditAddProp} tableHeaderClass={"col-hidden"}>
                    <TableHeaderColumn dataField='Name'></TableHeaderColumn>     
                    <TableHeaderColumn dataField='Email'></TableHeaderColumn>
                    <TableHeaderColumn dataField='Phone'></TableHeaderColumn>
                    <TableHeaderColumn dataField='button' dataFormat={buttonAddFormatter} isKey></TableHeaderColumn>
                </BootstrapTable>
            </div>
            <div id="mainTable">
                <BootstrapTable data={products} bordered={ false } cellEdit={cellEditProp} >
                    <TableHeaderColumn dataField='Name' editable={editableRow}>Name</TableHeaderColumn>     
                    <TableHeaderColumn dataField='Email' editable={editableRow}>Email Address</TableHeaderColumn>
                    <TableHeaderColumn dataField='Phone' editable={editableRow}>Phone Number</TableHeaderColumn>
                    <TableHeaderColumn dataField='button' isKey dataFormat={buttonEditFormatter} editable={false}></TableHeaderColumn>
                </BootstrapTable>
            </div>
        </div>,
        document.getElementById('root')
      );

}

function deleteObject(row) {
    console.log('delete', row);
    var deleteIndex = products.indexOf(row);
    var array = products.splice(deleteIndex, 1);
    console.log(array, products);

    build();
}

function buttonFormatter(cell, row){
    return (
        <div id="mode" style={{ color: 'gray'}}>
            <Icon icon={ic_mode_edit} onClick={() => editObject(row)}/>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Icon icon={ic_delete} onClick={() => deleteObject(row)}/>                       
        </div>
    );    
}

function saveFunc(row) {
    build();
}

function cancelFunc(row) {
    products[cancelIndex] = cancelData;
    build();
}

function buttonEditFormatter(cell, row){
    //console.log(index, row);
    var rowIndex = products.indexOf(row);
    if(rowIndex == index){
        return (
            <div className="pull-right" id="saveCancel">
                <button  onClick={() => cancelFunc(row)}> Cancel </button>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <button  onClick={() => saveFunc(row)}> Save </button>
            </div>
        );
    }else{
        return (
            <div id="mode" style={{ color: 'gray' }}>
                <Icon  icon={ic_mode_edit} onClick={() => editObject(row)}/>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Icon  icon={ic_delete} onClick={() => deleteObject(row)}/>
            </div>
        );
    }
    
}

function buttonAddFormatter(row){    
    return (
        <div >
            <button className="pull-right" onClick={() => addNew()}>Add New</button>
        </div>
    );   
}

function addNew() {
    console.log(emptyData);
    products.unshift(emptyData[0]);
    console.log(products);
    emptyData = [{
        Name: '' ,
        Email: '',
        Phone: ''
      }];   
    build();
}

var cellEditAddProp = {
    mode: 'click',
    blurToSave: true,
  };

function createTable() {
    for(var i = 4; i < 20; i++) {
        var nameRand = Math.floor((Math.random() * 10));
        var emailRand = Math.floor((Math.random() * 10));
        var phoneRand = Math.floor((Math.random() * 10));

        products[i] = {Name : nameArray[nameRand]};
        products[i]['Email'] = emailArray[emailRand];
        products[i]['Phone'] = phoneArray[nameRand];
    }
    console.log(products);    
}

function build() {
    console.log("BUILD called!");
    ReactDOM.render(
        <div >
            <div id="addTable">
                <BootstrapTable data={emptyData} cellEdit={cellEditAddProp} tableHeaderClass={"col-hidden"}>
                    <TableHeaderColumn dataField='Name'></TableHeaderColumn>     
                    <TableHeaderColumn dataField='Email' dataSort={true}></TableHeaderColumn>
                    <TableHeaderColumn dataField='Phone' deleteRow={ true }></TableHeaderColumn>
                    <TableHeaderColumn dataField='button' dataFormat={buttonAddFormatter} isKey></TableHeaderColumn>
                </BootstrapTable>
            </div>          
            <div id="mainTable">
                <BootstrapTable data={products} bordered={ false } selectRow={selectRowProps}>
                    <TableHeaderColumn dataField='Name' dataSort={true}>Name</TableHeaderColumn>     
                    <TableHeaderColumn dataField='Email' dataSort={true}>Email Address</TableHeaderColumn>
                    <TableHeaderColumn dataField='Phone' dataSort={true}>Phone Number</TableHeaderColumn>
                    <TableHeaderColumn dataField='button' dataFormat={buttonFormatter} isKey></TableHeaderColumn>
                </BootstrapTable>                
            </div>
        </div>,
      document.getElementById('root')
    );

}

createTable();

build();
// var element = React.createElement('h1', {className: 'greeting'}, 'Hello, world!');
// ReactDOM.render(element, document.getElementById('root'));
// registerServiceWorker();
