import Button from '@mui/material/Button';

interface BottomBarProps {
    onClick: () => void;
  }
export default function BottomBar({onClick}: BottomBarProps){
    
  return (
    <div>
        <Button 
        sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            textAlign: 'center',
            width: '100%',
            color: 'white',
            padding: '10px',
            cursor: 'pointer',
            height:'7.5vh'
        }}
            variant="contained"
            onClick={onClick}>
            Indicators
        </Button>
    </div>
  );
};
