import './Spinner.scss';

interface SpinnerProps {
    text?: string;
    size?: number;
}

export default function Spinner({ text = "Please wait...", size = 32 }: SpinnerProps) {
    return (
        <div className="spinner-container">
            <div 
                className="spinner" 
                style={{ 
                    width: size, 
                    height: size,
                    borderWidth: Math.max(2, size / 16)
                }}
            ></div>
            {text && <div className="spinner-text">{text}</div>}
        </div>
    );
}