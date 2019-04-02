import React, { Component } from 'react';
import {
    HashRouter as Router,
    Route,
    Link,
} from 'react-router-dom'

const Topics = ( {match} ) => {
    return  <div>
              <h3>我是列表</h3>
              <h3>我是列表</h3>
              <h3>我是列表</h3>
              <h3>我是列表</h3>
              <h3>我是列表</h3>
              <h3>我是列表</h3>
              <h3>我是列表</h3>
              <ul>
                <li><Link to={`${match.url}/react`}>a</Link></li>
                <li><Link to={`${match.url}/router`}>b</Link></li>
                <li><Link to={`${match.url}/redux`}>c</Link></li>
              </ul>
              <hr/>
              <Route path={`${match.url}/react`} component={Topic1}/>
              <Route path={`${match.url}/redux`} component={Topic2}/>
              <Route path={`${match.url}/router`} component={Topic3}/>
              <h1>1215165321515654165</h1>
            </div>
};
const Topic1 = ({match}) => {
  return <div><h3>{'reactasdsdadsdsad'}</h3></div>
};
const Topic2 = ({match}) => {
  return <div><h3>{'reduxsadsdsadadaddadad'}</h3></div>
};
const Topic3 = ({match}) => {
  return <div><h3>{'routersadsdsadadaddadad'}</h3></div>
};
 
export default Topics;