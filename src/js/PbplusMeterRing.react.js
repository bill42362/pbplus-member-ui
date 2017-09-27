// PbplusMeterRing.react.js
'use strict';
import PropTypes from 'prop-types';
import React from 'react';
import '../css/pbplus-meter-ring.less';

const ANTIALIAS_FACTOR = 2;
const RING_PADDING = 7;
const PI_2 = 2*Math.PI;

class PbplusMeterRing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            context: undefined,
            center: {x: 150, y: 100},
            radius: 50 - RING_PADDING,
        };
    }
    clearCanvas(context) {
        const canvas = context.canvas;
        context.clearRect(0, 0, 0.5*canvas.width, 0.5*canvas.height);
    }
    drawMeter() {
        const { context, center, radius } = this.state;
        const { arcs = [] } = this.props;
        let drawnAngle = -0.5*Math.PI;
        this.clearCanvas(context);
        arcs.forEach(arc => {
            const endAngle = drawnAngle + arc.ratio*PI_2;
            let shadowColor = arc.color;
            const rgbMatch = arc.color.match(/^rgba?\((\d+), (\d+), (\d+)\)$/i);
            if(rgbMatch) {
                shadowColor = `rgba(${rgbMatch[1]}, ${rgbMatch[2]}, ${rgbMatch[3]}, 0.15)`;
            }
            var gradient = context.createRadialGradient(center.x, center.y, 0, center.x, center.y, radius);
            gradient.addColorStop(0, 'rgba(48, 67, 94, 0.15)');
            gradient.addColorStop(1, shadowColor);
            context.fillStyle = gradient;
            context.beginPath();
                context.moveTo(center.x, center.y);
                context.arc(center.x, center.y, radius, drawnAngle, endAngle , false);
                context.moveTo(center.x, center.y);
            context.fill();
            drawnAngle = endAngle;
        });
        drawnAngle = -0.5*Math.PI;
        arcs.forEach(arc => {
            const endAngle = drawnAngle + arc.ratio*PI_2;
            context.strokeStyle = arc.color;
            context.beginPath();
                context.arc(center.x, center.y, radius, drawnAngle, endAngle , false);
            context.stroke();
            drawnAngle = endAngle;
        });
    }
    setupCanvas() {
        const { center: currentCenter, radius: currentRadius } = this.state;
        const canvas = this.refs.canvas;
        const context = canvas.getContext('2d');
        const width = ANTIALIAS_FACTOR*canvas.clientWidth;
        const height = ANTIALIAS_FACTOR*canvas.clientHeight;
        const center = {x: 0.25*width, y: 0.25*height};
        const radius = Math.max(0, 0.25*Math.min(width, height) - RING_PADDING);
        context.canvas.width = width;
        context.canvas.height = height;
        context.transform(ANTIALIAS_FACTOR, 0, 0, ANTIALIAS_FACTOR, 0, 0);
        context.lineWidth = 4;
        if(currentRadius !== radius || currentCenter.x !== center.x || currentCenter.y !== center.y) {
            this.setState({ context, center, radius });
        }
    }
    componentDidUpdate() {
        this.setupCanvas();
        this.drawMeter();
    }
    componentDidMount() { this.setupCanvas(); }
    render() { return <canvas className='pbplus-meter-ring' ref='canvas' />; }
}

PbplusMeterRing.propTypes = {
    arcs: PropTypes.array,
};

export default PbplusMeterRing;
