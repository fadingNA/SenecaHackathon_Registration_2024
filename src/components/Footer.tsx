import React from 'react';
import SocialMediaIcons from './SocialMediaIcons';
import Box from '@mui/material/Box';
import { Typography, Link } from '@mui/material';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <Box sx={{ background: '#D92D27', padding: '1.6rem 3rem', color: 'white' }}>
      <Typography variant="h2">Need Help?</Typography>
      <div className="flex flex-wrap w-full justify-between mb-3" id="footerContentContainer">
        <div className="mt-3">
          <Typography variant="h3">Email us</Typography>
          <Link color="inherit" href="mailto:info@senecahackathon.com">
            info@senecahackathon.com
          </Link>
        </div>
        <div className="mt-3">
          <Typography variant="h3">Address</Typography>
          <p className="my-1">
            Seneca College Newnham Campus
            <br />
            1750 Finch Ave E.
            <br />
            North York, Toronto, ON M2J 2X5
          </p>
        </div>
        <div className="mt-3">
          <Typography variant="h3" sx={{ marginBottom: 1 }}>
            Social Media
          </Typography>
          <SocialMediaIcons />
        </div>
      </div>
      <Typography variant="subtitle2">
        Ⓒ Copyright. All rights reserved by Housing Hackathon.
      </Typography>
    </Box>
  );
};

export default Footer;
