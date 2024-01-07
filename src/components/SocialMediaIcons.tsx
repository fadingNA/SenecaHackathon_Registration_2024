import Box from '@mui/material/Box';
import Facebook from '../assets/icons/Facebook.png';
import Instagram from '../assets/icons/Instagram.png';
import LinkedIn from '../assets/icons/LinkedIn.png';
import TikTok from '../assets/icons/TikTok.png';
import XTwitter from '../assets/icons/XTwitter.png';
import './SocialMediaIcons.css';
function SocialMediaIcons() {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
      <a href="#" target="_blank" rel="noopener noreferrer" className="icon">
        <img src={Instagram} alt="Instagram" />
      </a>
      <a href="#" target="_blank" rel="noopener noreferrer" className="icon">
        <img src={Facebook} alt="Facebook" />
      </a>
      <a href="#" target="_blank" rel="noopener noreferrer" className="icon">
        <img src={LinkedIn} alt="LinkedIn" />
      </a>
      <a href="#" target="_blank" rel="noopener noreferrer" className="icon">
        <img src={TikTok} alt="TikTok" />
      </a>
      <a href="#" target="_blank" rel="noopener noreferrer" className="icon">
        <img src={XTwitter} alt="XTwitter" />
      </a>
    </Box>
  );
}

export default SocialMediaIcons;
