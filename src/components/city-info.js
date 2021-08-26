import React, { PureComponent } from "react";

export default class CityInfo extends PureComponent {
  render() {
    const { info } = this.props;
    const displayName = `${info.city}`;
    const count = `${info.counttext}`;


    return (
  
        <div >
               <b> {displayName}</b>
        </div>
   
     
    );
  }
}
