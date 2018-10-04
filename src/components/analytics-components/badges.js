import React, { Component } from 'react';
import Badge from './badge';
import { SyncLoader } from 'react-spinners';

const override = '';

class Badges extends Component {

  constructor() {
    super();
    this.state = {
      badges: [{
        text: '',
        icon: "fa-line-chart newClientsBadge",
        header: '',
        loading: true
      },
      {
        text: '',
        icon: "fa-envelope emailsSentBadge",
        header: '',
        loading: true
      },
      {
        text: '',
        icon: "fa-user-circle-o outstandingClientsBadge",
        header: '',
        loading: true
      },
      {
        text: '',
        icon: "fa-globe hottestCountryBadge",
        header: '',
        loading: true
      }],
    }
  }

  getSingleBadges = () => {
    return (this.state.badges).map((item, index) => {
      let loadingBoolean = item.loading;
      console.log(item.loading)
      return (
        loadingBoolean ? (
          <div className="myLoaderBadgeCSS" key={index}>
            <SyncLoader
              className={override}
              sizeUnit={"px"}
              size={50}
              color={'#36D7B7'}
              loading={this.state.loading}
            />
          </div>
        ) : (
            <Badge
              key={index}
              icon={item.icon}
              header={item.header}
              text={item.text}
            />)
      )
    })
  }

  createNewClientBadgeData = (data) => {
    let newState = { ...this.state };
    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    let text = `New ${monthNames[currentMonth]} Clients`;
    newState.badges[0].text = text;
    let thisMonthCounter = 0;
    for (let i = 0; i < data.length; i ++) {
      let clientTime = new Date(data[i].firstContact);
      if (clientTime.getMonth() === currentMonth && clientTime.getFullYear() === currentYear) {
        thisMonthCounter = thisMonthCounter + 1;
      }
    }
    newState.badges[0].header = thisMonthCounter;
    newState.badges[0].loading = false;
    this.setState(newState);
    // this.setState(newState,()=>{
    //   console.log(this.state)
    // });
  }

  createEmailsSentBadgeData = (data) => {
    let newState = {...this.state};
    newState.badges[1].text = "Emails Sent";
    let emailsSentCounter = 0;
    for (let i = 0; i < data.length; i ++) {
      if (data[i].emailType !== null) {
        emailsSentCounter = emailsSentCounter + 1;
      }
    }
    newState.badges[1].header = emailsSentCounter;
    newState.badges[1].loading = false;
    this.setState(newState);
  }

  createOutstandingClientsBadgeData = (data) => {
    let newState = {...this.state};
    newState.badges[2].text = "Outstanding Clients";
    let outstandingClientsCounter = 0;
    for (let i = 0; i < data.length; i++) {
      if (data[i].sold === false) {
        outstandingClientsCounter = outstandingClientsCounter + 1;
      }
    }
    newState.badges[2].header = outstandingClientsCounter;
    newState.badges[2].loading = false;
    this.setState(newState);
  }

  createHottestCountryBadgeData = (data) => {
    let newState = {...this.state};
    newState.badges[3].text = "Hottest Country";
    var itm, a= [], L= data.length, o= {};
    for(var i= 0; i<L; i++){
        itm= data[i].country;
        if(!itm) continue;
        if(o[itm]== undefined) o[itm]= 1;
        else ++o[itm];
    }
    for(var p in o) a[a.length]= {item: p, frequency: o[p]};
    a.sort(function(a, b){
        return o[b.item]-o[a.item];
    });
    newState.badges[3].header = a[0].item;
    newState.badges[3].loading = false;
    this.setState(newState);
  }

  populateState = () => {
    let data = this.props.clientList;
    this.createNewClientBadgeData(data);
    this.createEmailsSentBadgeData(data);
    this.createOutstandingClientsBadgeData(data);
    this.createHottestCountryBadgeData(data);
  }

  componentDidUpdate(prevProps) {
    if (this.props.clientList !== prevProps.clientList) {
      this.populateState();
    }
  }

  render() {
    return (
      <div className="badgesDiv">
        {this.getSingleBadges()}
      </div>
    )
  }

}


export default Badges;