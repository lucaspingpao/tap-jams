import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
// import VolumeDown from '@material-ui/icons/VolumeDown';
// import VolumeUp from '@material-ui/icons/VolumeUp';

const useStyles = makeStyles({
  root: {
    width: 500,
  },
  span: {
    fontSize: 50
  }
});

export default function ContinuousSlider(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(30);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Typography id="continuous-slider" gutterBottom>
        {props.effect}
      </Typography>
      <Grid container spacing={3}>
        <Grid item>
          <span className={classes.span} role='img' aria-label={props.leftLabel}>{props.leftEmoji}</span>
        </Grid>
        <Grid item xs>
          <Slider value={value} onChange={handleChange} aria-labelledby="continuous-slider" />
        </Grid>
        <Grid item>
          <span className={classes.span} role='img' aria-label={props.rightLabel}>{props.rightEmoji}</span>
        </Grid>
      </Grid>
    </div>
  );
}