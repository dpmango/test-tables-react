import React, { Component } from 'react';
import moment from 'moment';
import { groupBy, map } from 'underscore';

import Api from '../services/Api';
import Thead from './Thead';
import Tbody from './Tbody';


class Table extends Component {
  constructor(props){
    super(props);
    this.state = {
      tableDataHead: null,
      tableDataBody: null
    }
  }

  componentDidMount(){

    const { groupByDay, forDay } = this.props;

    Api
      .get('/test.json')
      .then(res => {
        let respDataBody = res.data.data
        respDataBody.forEach(x => x[0] = moment(x[0]) ) // convert to moment

        if ( forDay ){
          respDataBody = this.filterForDay(respDataBody, forDay)
        }

        setTimeout( () => {
          this.setState({
            tableDataHead: res.data.columns,
            tableDataBody: this.props.groupByDay && !forDay ? this.groupByDate(respDataBody) : respDataBody
          })
        }, 500); // emulate delay
      })
  }

  groupByDate = (arr) => {
    const groupedByDate = groupBy(arr, row => row[0].format("DD.MM") );
    const combineDayValues = map( groupedByDate, (group, day) => {
      // group contians arr of grouped days
      // day is a string sating which day it is

      return group.reduce( (a,b) => {
        //reduce to a single array
        return a.map( (x,i) => {
          // where the values gets summed up
          if ( i === 0 ){
            return day // no need to sum up dates
          }
          return x + b[i]
        })
      })

    })
    // console.log( groupedByDate, combineDayValues );
    return combineDayValues
  }

  filterForDay = (arr, day) => {
    const groupedByDate = groupBy(arr, row => row[0].format("DD.MM") );
    const filteredDays = groupedByDate[day].map( arr => { // search by key
      // where the values gets summed up
      return arr.map( (x,i) => {
        // where the values gets summed up
        if ( x && x._isAMomentObject){
          return x.format("HH:mm")
        }
        return x
      })
    })

    return filteredDays
  }

  sortData = (index, sortDirDESC) => {
    let sortedData = this.state.tableDataBody;

    if ( sortDirDESC ){
      sortedData = sortedData.sort( (a,b) => parseInt(b[index]) - parseInt(a[index]) ) // desc
    } else {
      sortedData = sortedData.sort( (a,b) => parseInt(a[index]) - parseInt(b[index]) ) // asc
    }
    
    this.setState({
      tableData: sortedData
    })

  }

  render() {

    const { tableDataHead, tableDataBody } = this.state;

    if ( !tableDataBody ) {
      return (
        <p>Loading ... </p>
      )
    }

    return (
      <table className="table">
        <Thead rows={tableDataHead} sortData={this.sortData} />
        <Tbody rows={tableDataBody} />
      </table>
    );
  }
}

export default Table;
