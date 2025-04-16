import React from 'react';

interface ProgressBarProps {
    progress: number; // Progress percentage (0 to 100)
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
    return (
        <div style={{ width: '100%', backgroundColor: '#e0e0df', borderRadius: '5px' }}>
            <div
                style={{
                    width: `${progress}%`,
                    height: '20px',
                    backgroundColor: '#3b5998',
                    borderRadius: '5px',
                    textAlign: 'center',
                    lineHeight: '20px',
                    color: 'white'
                }}
            >
                {progress}%
            </div>
        </div>
    );
};

export default ProgressBar;