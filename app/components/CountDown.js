import React, { Component } from 'react'

import {
    View,
    Text,
    StyleSheet
} from 'react-native'


class CountDown extends Component {

    constructor(props) {
        super(props)
        this.state = {
            liveTime: '',
            today_end: new Date(new Date().toLocaleDateString() + " 23:59:59").getTime(),

        }
        let timeFormater = this.timeFormater
        this.getTime =  setInterval(() => {
            let currentDate = new Date()
            let timeFormat = this.myCounter();
            //`${timeFormater(currentDate.getHours())}:${timeFormater(currentDate.getMinutes())}:${timeFormater(currentDate.getSeconds())}`
            this.setState({
                liveTime: timeFormat,
            })
        }, 1000);
    };

      myCounter() {

      // Get todays date and time
      var now = new Date().getTime();

      // Find the distance between now an the count down date
      var distance = this.state.today_end - now;
      //console.log(this.state.today_end);
      // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Display the result in the element with id="demo"
      // document.getElementById("count_down").innerHTML = days + "d " + hours + "h "
      // + minutes + "m " + seconds + "s ";
      //console.log('Time: ' + hours + ':' + minutes + ':' + seconds);
      let timeFormat = `${this.timeFormater(hours)}:${this.timeFormater(minutes)}:${this.timeFormater(seconds)}`
      return timeFormat;
    };



    timeFormater(time) {
        if (time < 10) {
            time = '0' + time
        }
        return time
    }

    componentWillUnmount() {
        clearInterval(this.getTime)
    }

    render() {
        return (
            <View style={this.props.clockWrapperStyles}>
                <Text style={this.props.clockStyles}>{this.state.liveTime}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    clockText: {
        color: '#000',
        fontSize: 18,
        fontWeight: '500'
    }
})

CountDown.propTypes = Object.assign({}, Component.propTypes, {
    //end_date: PropTypes.string.isRequired,
    clockWrapperStyles: View.propTypes.style,
    clockStyles: Text.propTypes.style,
})

export default CountDown
