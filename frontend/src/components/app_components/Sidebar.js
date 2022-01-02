import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import Rhythm from '../music_components/rhythm/Rhythm';
import Harmony from '../music_components/harmony/Harmony';
import Melody from '../music_components/melody/Melody';
import Effects from '../music_components/effects/Effects';
import Title from '../music_components/submit/Submit';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: '100%',
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

export default function Sidebar() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        <Tab label="1. Rhythm" {...a11yProps(0)} />
        <Tab label="2. Harmony" {...a11yProps(1)} />
        <Tab label="3. Melody" {...a11yProps(2)} />
        <Tab label="4. Effects" {...a11yProps(3)} />
        <Tab label="5. Submit!" {...a11yProps(4)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Rhythm/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Harmony/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Melody/>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Effects/>
      </TabPanel>
      <TabPanel value={value} index={4}>
        <Title/>
      </TabPanel>
    </div>
  );
}
