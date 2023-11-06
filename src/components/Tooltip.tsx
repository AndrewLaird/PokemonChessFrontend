import React, { ReactNode, useState, useRef, useEffect } from 'react';
import './Tooltip.css';

type TooltipProps = {
  children: ReactNode;
  content: string;
  position?: string;
};


const Tooltip: React.FC<TooltipProps> = ({ children, content, position }) => {
    const [isVisible, setIsVisible] = useState(false);
    const tooltipRef = useRef(null);

    // Positioning the tooltip based on the specified position prop
    const getTooltipPosition = () => {
        switch(position) {
            case 'bottom':
                return 'tooltip-bottom';
            case 'left':
                return 'tooltip-left';
            case 'right':
                return 'tooltip-right';
            case 'top':
                return 'tooltip-right';
            default:
                return 'tooltip-right';
        }
    }

    return (
        <div className="tooltip-container" ref={tooltipRef}
             onMouseEnter={() => setIsVisible(true)}
             onMouseLeave={() => setIsVisible(false)}>
            {children}
            {isVisible && (
                <div className={`tooltip-box ${getTooltipPosition()}`}>
                    {content}
                </div>
            )}
        </div>
    );
}

export default Tooltip;

