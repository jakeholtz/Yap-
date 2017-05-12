import React from 'react';
import { Card, CardActions, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Speaker from 'material-ui/svg-icons/hardware/keyboard-voice';

import ReviewStars from './ReviewStars';
import styles from '../css/styles';

const yelpIcon = require('../assets/yelpLogo/Yelp_icon.png');

class MainDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviewToggle: false,
    };
    this.onReviewToggle = this.onReviewToggle.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  onReviewToggle() {
    this.setState({
      reviewToggle: !this.state.reviewToggle,
    });
  }

  onSave() {
    this.props.onSave(this.props.data);
  }

  render() {
    return (
      <Card style={styles.cardStyle}>
        <FlatButton
          icon={<Speaker alt="Speaker" />}
          onTouchTap={this.props.startSpeech}
        />
        <CardMedia
      overlay={<CardTitle title={this.props.data.name} subtitle={this.props.data.phone + ' ~ ' + this.props.data.address} />}
    >
      <img src={this.props.data.photos} />
    </CardMedia>
        <CardText>  
          <div style={styles.reviewBlock}><ReviewStars
            rating={this.props.data.rating}
          />{this.props.data.reviewCount} Reviews</div>
          <div>
          {this.props.data.reviews.map(oneReview =>
              <div key={oneReview.reviewer_name}>
                <p>"{oneReview.text} <a href={oneReview.url}>" Read More</a> - {oneReview.user.name}</p>
              </div>,
            )}
            </div>
        </CardText>
        <CardActions>
        <div style={styles.reviewBlock}>
          <RaisedButton
            label="Save to Favorites"
            backgroundColor="#FFA726"
            onTouchTap={this.onSave}
          /><img
              src={yelpIcon}
              alt="logo" style={styles.logo}
            />
          </div>
        </CardActions>
      </Card>
    );
  }
}

MainDisplay.propTypes = {
  data: PropTypes.object,
  onSave: PropTypes.func,
  startSpeech: PropTypes.func,
};

MainDisplay.defaultProps = {
  data: null,
  onSave: PropTypes.func,
  startSpeech: PropTypes.func,
};

export default MainDisplay;