import { useAppSelector } from '../store/hooks';
import { UpIcon, DownIcon, EqualIcon } from './icons';
import './SteeringIndices.scss';

export default function SteeringIndices() {
  const { selectedCompany, viewMode, companies } = useAppSelector(state => state.dashboard);
  
  const currentCompany = companies.find(c => c.name === selectedCompany);
  const currentData = currentCompany ? (viewMode === 'Actual' ? currentCompany.actual : currentCompany.previous) : null;

  if (!currentData) {
    return <div>No data available</div>;
  }

  const indices = [
    { key: 'Environment', label: 'Environment', position: 1 },
    { key: 'Social', label: 'Social', position: 2 },
    { key: 'Controversies', label: 'Controversies', position: 3 },
    { key: 'Leverage', label: 'Leverage', position: 4 },
    { key: 'Profitability', label: 'Profitability', position: 5 }
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'Up': return <UpIcon width={16} height={16} />;
      case 'Down': return <DownIcon width={16} height={16} />;
      case 'Equal': return <EqualIcon width={16} height={16} />;
      default: return <EqualIcon width={16} height={16} />;
    }
  };

  const getTrendClass = (trend: string) => {
    switch (trend) {
      case 'Up': return 'trend-up';
      case 'Down': return 'trend-down';
      case 'Equal': return 'trend-equal';
      default: return 'trend-equal';
    }
  };

  const generateRadarPoints = () => {
    const center = 50;
    const maxRadius = 40;
    const angles = [0, 72, 144, 216, 288];
    
    return indices.map((index, i) => {
      const score = currentData.SteeringIndices[index.key as keyof typeof currentData.SteeringIndices].Score;
      const radius = (score / 100) * maxRadius;
      const angle = (angles[i] - 90) * (Math.PI / 180);
      
      const x = center + radius * Math.cos(angle);
      const y = center + radius * Math.sin(angle);
      
      return `${x},${y}`;
    }).join(' ');
  };

  const generateSectorMeanPoints = () => {
    const center = 50;
    const maxRadius = 40;
    const angles = [0, 72, 144, 216, 288];
    const sectorMeanValues = [60, 50, 40, 70, 50]; // Approximated from the image
    
    return sectorMeanValues.map((score, i) => {
      const radius = (score / 100) * maxRadius;
      const angle = (angles[i] - 90) * (Math.PI / 180);
      
      const x = center + radius * Math.cos(angle);
      const y = center + radius * Math.sin(angle);
      
      return `${x},${y}`;
    }).join(' ');
  };

  return (
    <div className="steering-indices">
      <div className="steering-header">
        <h3>Steering Indices</h3>
        <div className="legend">
          <div className="legend-item">
            <span className="legend-color vallourec"></span>
            <span>Vallourec SA Current</span>
          </div>
          <div className="legend-item">
            <span className="legend-color sector"></span>
            <span>Sector Mean</span>
          </div>
        </div>
      </div>

      <div className="radar-container">
        <div className="radar-chart">
          <svg viewBox="0 0 100 100" className="radar-svg">
            {/* Grid circles */}
            <circle cx="50" cy="50" r="8" fill="none" stroke="#e0e0e0" strokeWidth="0.5" />
            <circle cx="50" cy="50" r="16" fill="none" stroke="#e0e0e0" strokeWidth="0.5" />
            <circle cx="50" cy="50" r="24" fill="none" stroke="#e0e0e0" strokeWidth="0.5" />
            <circle cx="50" cy="50" r="32" fill="none" stroke="#e0e0e0" strokeWidth="0.5" />
            <circle cx="50" cy="50" r="40" fill="none" stroke="#e0e0e0" strokeWidth="0.5" />
            
            {/* Grid lines */}
            <line x1="50" y1="10" x2="50" y2="90" stroke="#e0e0e0" strokeWidth="0.5" />
            <line x1="76.18" y1="25.82" x2="23.82" y2="74.18" stroke="#e0e0e0" strokeWidth="0.5" />
            <line x1="76.18" y1="74.18" x2="23.82" y2="25.82" stroke="#e0e0e0" strokeWidth="0.5" />
            <line x1="10" y1="50" x2="90" y2="50" stroke="#e0e0e0" strokeWidth="0.5" />
            <line x1="23.82" y1="25.82" x2="76.18" y2="74.18" stroke="#e0e0e0" strokeWidth="0.5" />
            
            {/* Sector Mean (blue) */}
            <polygon
              points={generateSectorMeanPoints()}
              fill="rgba(59, 130, 246, 0.1)"
              stroke="#3b82f6"
              strokeWidth="2"
            />
            
            {/* Vallourec SA Current (orange) */}
            <polygon
              points={generateRadarPoints()}
              fill="rgba(249, 115, 22, 0.1)"
              stroke="#f97316"
              strokeWidth="2"
            />

            {/* Labels */}
            <text x="50" y="6" textAnchor="middle" fontSize="6" fill="#666">1</text>
            <text x="82" y="35" textAnchor="middle" fontSize="6" fill="#666">2</text>
            <text x="82" y="75" textAnchor="middle" fontSize="6" fill="#666">3</text>
            <text x="18" y="75" textAnchor="middle" fontSize="6" fill="#666">4</text>
            <text x="18" y="35" textAnchor="middle" fontSize="6" fill="#666">5</text>
          </svg>
        </div>

        <div className="indices-list">
          {indices.map((index) => {
            const data = currentData.SteeringIndices[index.key as keyof typeof currentData.SteeringIndices];
            return (
              <div key={index.key} className="index-item">
                <div className="index-position">{index.position}</div>
                <div className="index-label">{index.label}</div>
                <div className="index-score">{data.Score}</div>
                <div className={`index-trend ${getTrendClass(data.Trends)}`}>
                  {getTrendIcon(data.Trends)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}