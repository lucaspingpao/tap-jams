import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import StopIcon from '@material-ui/icons/Stop';

import Profile from '../../assets/images/DefaultProfile.jpg';
import '../../styles/Explore.css';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: 'auto',
    alignItems: 'center',
    justifyContent: 'center'
  },
  details: {
    flexDirection: 'column'
  },
  content: {
  },
  cover: {
    width: 151,
    height: 151
  },
  controls: {
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: theme.spacing(1)
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

export default function Explore(props) {
  const theme = useTheme();
  const classes = useStyles(theme);
  
  const [jams, setJams] = useState();

  useEffect(() => {
    try {
      fetch("http://localhost:8000/get-jams")
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setJams(data)
      })
    } catch (error) {
      console.error(error.message);
    }
  },[])

  const formatDate = (isoDate) => {
    const months = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];
    let dmy = isoDate.split('T')[0].split('-')
    return months[dmy[1] - 1] + " " + dmy[2] + ", " + dmy[0]
  };

/*
<CardMedia
  className={classes.cover}
  image={Profile}
  title={jam.title}
/>
*/

  const jamElements = jams && jams.map((jam, i) => (
    <Card key={i} className={classes.root}>
      <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography variant="h5">
                {jam.title}
            </Typography>
            <Typography variant="h6" color="textSecondary">
                By {jam.composer}
            </Typography>
            <Typography variant="body2" color="textSecondary">
                Created: {formatDate(jam.date_created)}
            </Typography>
          </CardContent>
          <div className={classes.controls}>
            <IconButton aria-label="play/pause">
                <PlayArrowIcon className={classes.playIcon} />
            </IconButton>
            <IconButton aria-label="play/pause">
                <PauseIcon className={classes.playIcon} />
            </IconButton>
            <IconButton aria-label="play/pause">
                <StopIcon className={classes.playIcon} />
            </IconButton>
          </div>
      </div>
    </Card>
  ));

  return (
    <div>
      <Typography variant='h2' className='title'>Explore</Typography>

      <Typography variant='h4' className='title'>Recent</Typography>
      <div className='cards'>
        {jams && jamElements.slice(0, 6)}
      </div>

      <Typography variant='h4' className='title'>Older</Typography>
      <div className='cards'>
        {jams && jamElements.slice(6)}
      </div>
    </div>
  );
}
