import { Container, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useParams } from 'react-router-dom';

function Confirmation() {
  const { id } = useParams<{ id: string }>();
  const getDate = () => {
    const date = new Date();
    const month = date.toLocaleString('default', { month: 'long' });
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  };
  return (
    <Container
      maxWidth="lg"
      className="my-10 flex items-center justify-center flex-col min-h-[50vh]"
    >
      <CheckCircleIcon color="primary" className="text-[6rem]" />
      <Typography variant="h1">Thank you for registering!</Typography>
      <div className="text-center mt-4">
        <p>
          Date completed: <span className="text-primary">{getDate()}</span>
        </p>
        <p>
          Registration number: <span className="text-primary">{id}</span>
        </p>
      </div>
    </Container>
  );
}

export default Confirmation;
